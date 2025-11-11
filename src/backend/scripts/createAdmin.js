/**
 * Script to create default admin user
 * Run this after setting up MongoDB connection
 * 
 * Usage: node scripts/createAdmin.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

// Load environment variables
dotenv.config();

const createDefaultAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@donation.com' });

    if (existingAdmin) {
      console.log('⚠️  Default admin already exists');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create({
      email: 'admin@donation.com',
      password: 'admin123', // Will be hashed automatically
      name: 'Super Administrator',
      role: 'superadmin',
      isActive: true
    });

    console.log('\n✅ Default admin created successfully!\n');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Name:', admin.name);
    console.log('🎭 Role:', admin.role);
    console.log('\n⚠️  IMPORTANT: Please change the default password immediately!\n');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Run the script
createDefaultAdmin();
