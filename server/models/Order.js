import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    image: String,
    price: Number,
    quantity: { type: Number, default: 1 },
  }],
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  fullLocation: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'New Order', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending', // cart state before confirm
  },
  isConfirmed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);