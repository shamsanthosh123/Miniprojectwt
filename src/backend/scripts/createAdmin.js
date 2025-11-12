require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

const createAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('\n' + '='.repeat(50));
    console.log('🔐 Admin Account Creation');
    console.log('='.repeat(50) + '\n');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@donation.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin account already exists!');
      console.log('\n📧 Email: admin@donation.com');
      console.log('🔑 Password: Use your existing password');
      console.log('\n💡 Tip: If you forgot your password, delete the admin from MongoDB and run this script again.\n');
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      email: 'admin@donation.com',
      password: 'admin123',
      name: 'Platform Administrator',
      role: 'superadmin',
      isActive: true
    });

    console.log('✅ Admin account created successfully!\n');
    console.log('📋 Admin Details:');
    console.log('   📧 Email: admin@donation.com');
    console.log('   🔑 Password: admin123');
    console.log('   👤 Name: Platform Administrator');
    console.log('   🎭 Role: superadmin\n');
    console.log('⚠️  IMPORTANT: Change this password immediately after first login!\n');
    console.log('='.repeat(50) + '\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
