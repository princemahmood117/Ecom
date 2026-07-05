import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendEmail } from '../utils/sendEmail.js';

// Add item to cart (creates a Pending order or appends to existing pending one for user)
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, fullName, phoneNumber, email, fullLocation } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cartOrder = await Order.findOne({ user: req.user._id, isConfirmed: false });

    const item = {
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: quantity || 1,
    };

    if (cartOrder) {
      cartOrder.items.push(item);
      cartOrder.totalPrice += item.price * item.quantity;
      cartOrder.fullName = fullName;
      cartOrder.phoneNumber = phoneNumber;
      cartOrder.email = email;
      cartOrder.fullLocation = fullLocation;
      await cartOrder.save();
    } else {
      cartOrder = await Order.create({
        user: req.user._id,
        items: [item],
        fullName, phoneNumber, email, fullLocation,
        totalPrice: item.price * item.quantity,
      });
    }

    res.status(201).json(cartOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Order.findOne({ user: req.user._id, isConfirmed: false });
    res.json(cart || { items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const cart = await Order.findOne({ user: req.user._id, isConfirmed: false });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    cart.isConfirmed = true;
    cart.status = 'New Order';
    await cart.save();

    const itemsList = cart.items.map((i) => `${i.name} (x${i.quantity})`).join(', ');
    await sendEmail(
      cart.email,{
      subject :'Order Confirmed - Thank You!',
      message : `<h2>Thank you, ${cart.fullName}!</h2><p>Your order for <b>${itemsList}</b> has been placed successfully.</p><p>We'll notify you as it progresses.</p> <br/> <img src="https://i.ibb.co.com/R4j0TrYZ/order-Confirmed.png" alt="order-confirmed" />`,
      
      }
      
    );

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id, isConfirmed: true }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not your order' });
    }
    await order.deleteOne();
    res.json({ message: 'Order cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isConfirmed: true }).populate('user', 'fullName email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const orders = await Order.find({ isConfirmed: true });
    const totalUsers = await (await import('../models/User.js')).default.countDocuments({ role: 'customer' });

    const dailyEarnings = {};
    const monthlyEarnings = {};

    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      const month = date.slice(0, 7);
      dailyEarnings[date] = (dailyEarnings[date] || 0) + order.totalPrice;
      monthlyEarnings[month] = (monthlyEarnings[month] || 0) + order.totalPrice;
    });

    res.json({
      totalUsers,
      totalOrders: orders.length,
      totalEarnings: orders.reduce((sum, o) => sum + o.totalPrice, 0),
      dailyEarnings,
      monthlyEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};