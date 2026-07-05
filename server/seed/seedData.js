import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models//Product.js';

dotenv.config();

const demoUsers = [
  {
    fullName: 'Admin User',
    age: 30,
    email: 'admin@glowshop.com',
    password: 'admin1234',
    role: 'admin',
  },
  {
    fullName: 'Sarah Ahmed',
    age: 24,
    email: 'sarah@example.com',
    password: 'password123',
    role: 'customer',
  },
];

const demoProducts = [
  {
    name: 'Hydrating Rose Face Serum',
    brand: 'Bloom & Glow',
    description: 'A lightweight, fast-absorbing serum infused with rose extract and hyaluronic acid to deeply hydrate and restore skin\'s natural radiance. Suitable for all skin types.',
    price: 24.99,
    quantity: 35,
    images: [
      'https://i.ibb.co.com/k6XJZQrp/prottasha1.jpg',
      'https://i.ibb.co.com/SXq1TsvC/prottasha2.jpg',
      'https://i.ibb.co.com/wrLXHXLx/prottasha3.jpg',
      'https://i.ibb.co.com/pB2fvsWD/prottasha4.jpg',
    ],
    benefits: [
      'Deeply hydrates skin for up to 24 hours',
      'Reduces appearance of fine lines',
      'Brightens dull skin tone',
      'Non-greasy, fast-absorbing formula',
    ],
  },
  {
    name: 'Velvet Matte Lipstick - Ruby Red',
    brand: 'Luxe Cosmetics',
    description: 'Long-lasting matte lipstick with a creamy, comfortable finish that doesn\'t dry out lips. One swipe delivers full, bold color.',
    price: 15.5,
    quantity: 60,
    images: [
      'https://i.ibb.co.com/vxWwT9cp/prottasha5.jpg',
      'https://i.ibb.co.com/GvGrjB9F/prottasha6.jpg',
      'https://i.ibb.co.com/5X0Z2Tf9/prottasha7.jpg',
      'https://i.ibb.co.com/G4V5sWp0/prottasha9.jpg',
    ],
    benefits: [
      'Up to 8 hours of wear',
      'Enriched with vitamin E',
      'Transfer-proof matte finish',
      'Cruelty-free and vegan',
    ],
  },
  {
    name: 'Charcoal Detox Face Mask',
    brand: 'Pure Earth',
    description: 'Deep-cleansing clay mask formulated with activated charcoal to draw out impurities, unclog pores, and leave skin feeling refreshed.',
    price: 18.0,
    quantity: 0,
    images: [
      'https://i.ibb.co.com/JRnsFKjW/sustainable.jpg',
      'https://i.ibb.co.com/qLz25xy8/platenum.jpg',
      'https://i.ibb.co.com/b50x2zS1/esaab.jpg',
      'https://i.ibb.co.com/sd7hmWVc/1strunner.jpg',
    ],
    benefits: [
      'Draws out dirt and excess oil',
      'Minimizes appearance of pores',
      'Leaves skin feeling smooth and refreshed',
      'Suitable for oily and combination skin',
    ],
  },

];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await User.deleteMany();
    await Product.deleteMany();

    // insert one by one so the pre-save password hash hook runs
    for (const u of demoUsers) {
      await User.create(u);
    }

    await Product.insertMany(demoProducts);

    console.log('✅ Demo data imported successfully!');
    console.log('---------------------------------');
    console.log('Admin login   -> admin@glowshop.com / admin1234');
    console.log('Customer login -> sarah@example.com / password123');
    process.exit();
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Product.deleteMany();
    console.log('🗑️  All data destroyed');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}