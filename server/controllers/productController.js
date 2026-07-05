import Product from '../models/Product.js';

// GET /api/products?search=&sort=&filter=&page=&limit=
export const getProducts = async (req, res) => {
  try {
    const { search, sort, filter, page = 1, limit = 12 } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { createdAt: -1 }; // default = newest
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (filter === 'new') sortOption = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query).sort(sortOption).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, brand, description, price, quantity, benefits } = req.body;
    // const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];   // this is used by multer

    const images = req.files?.map((file) => file.path) || [];   // this is used by cloudinary

    if (images.length === 0) return res.status(400).json({ message: 'At least one image required' });


    const product = await Product.create({
      name,
      brand,
      description,
      price,
      quantity,
      images,
      benefits: Array.isArray(benefits) ? benefits : [benefits].filter(Boolean),
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, brand, description, price, quantity, benefits, existingImages } = req.body;

    let images = existingImages
      ? (Array.isArray(existingImages) ? existingImages : [existingImages])
      : product.images;

    // if (req.files?.length) {
    //   const newImages = req.files.map((file) => `/uploads/${file.filename}`);
    //   images = [...images, ...newImages];
    // }

      if (req.files?.length) {
      const newImages = req.files.map((file) => file.path); // <-- changed from `/uploads/${file.filename}` for cloudinary
      images = [...images, ...newImages];
    }

    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity ?? product.quantity;
    product.images = images;
    product.benefits = benefits
      ? (Array.isArray(benefits) ? benefits : [benefits].filter(Boolean))
      : product.benefits;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};