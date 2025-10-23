const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const products = [
  {
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5,
    numReviews: 120
  },
  {
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and water resistance.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 30,
    rating: 4.3,
    numReviews: 85
  },
  {
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
    price: 29.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 100,
    rating: 4.2,
    numReviews: 45
  },
  {
    title: 'Leather Crossbody Bag',
    description: 'Premium genuine leather crossbody bag with multiple compartments.',
    price: 89.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 25,
    rating: 4.7,
    numReviews: 32
  },
  {
    title: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    stock: 75,
    rating: 4.1,
    numReviews: 68
  },
  {
    title: 'Denim Jeans',
    description: 'Classic fit denim jeans made from sustainable materials.',
    price: 79.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    stock: 60,
    rating: 4.4,
    numReviews: 92
  },
  {
    title: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
    price: 24.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    stock: 80,
    rating: 4.6,
    numReviews: 156
  },
  {
    title: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys and switches.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    stock: 40,
    rating: 4.8,
    numReviews: 78
  },
  {
    title: 'Yoga Mat',
    description: 'Non-slip yoga mat with excellent grip and cushioning for all yoga practices.',
    price: 39.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    stock: 65,
    rating: 4.3,
    numReviews: 43
  },
  {
    title: 'Coffee Maker',
    description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
    price: 129.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    stock: 20,
    rating: 4.5,
    numReviews: 67
  }
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('Created admin user');

    // Create products
    await Product.insertMany(products);
    console.log('Created products');

    console.log('Seed data created successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
