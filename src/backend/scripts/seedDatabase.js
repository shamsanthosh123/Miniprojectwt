/**
 * Script to seed the database with sample data
 * Run this to populate database with test campaigns and donations
 * 
 * Usage: node scripts/seedDatabase.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Campaign = require('../models/Campaign');
const Donor = require('../models/Donor');
const Admin = require('../models/Admin');

// Load environment variables
dotenv.config();

const sampleCampaigns = [
  {
    title: "Help Build School for Underprivileged Children",
    description: "We are raising funds to build a school in a rural area where children have to walk 10km daily for education. Your contribution will help provide quality education to 500+ children.",
    category: "Education",
    goal: 500000,
    collected: 350000,
    duration: 45,
    status: "active",
    creatorName: "Education Foundation",
    creatorEmail: "contact@edufoundation.org",
    donorCount: 245,
    isUrgent: false,
    isVerified: true
  },
  {
    title: "Emergency Medical Fund for Cancer Patients",
    description: "Support cancer patients who cannot afford treatment. Every contribution helps save lives and provides hope to families in need.",
    category: "Health",
    goal: 1000000,
    collected: 650000,
    duration: 60,
    status: "active",
    creatorName: "Healthcare Trust",
    creatorEmail: "help@healthtrust.org",
    donorCount: 423,
    isUrgent: true,
    isVerified: true
  },
  {
    title: "Clean Water Initiative for Remote Villages",
    description: "Bringing clean drinking water to 15 villages that currently lack access to safe water. Help us install water purification systems.",
    category: "Environment",
    goal: 750000,
    collected: 580000,
    duration: 30,
    status: "active",
    creatorName: "Clean Water Foundation",
    creatorEmail: "info@cleanwater.org",
    donorCount: 312,
    isUrgent: false,
    isVerified: true
  },
  {
    title: "Food Distribution for Homeless Families",
    description: "Daily meal program for 200 homeless families. Your donation provides nutritious meals and brings smiles to hungry children.",
    category: "Food & Nutrition",
    goal: 300000,
    collected: 275000,
    duration: 40,
    status: "active",
    creatorName: "Food Bank Initiative",
    creatorEmail: "support@foodbank.org",
    donorCount: 189,
    isUrgent: true,
    isVerified: true
  },
  {
    title: "Animal Shelter and Rescue Center",
    description: "Building a shelter for abandoned and injured animals. We rescue, treat, and find loving homes for stray animals.",
    category: "Animals",
    goal: 400000,
    collected: 125000,
    duration: 50,
    status: "active",
    creatorName: "Animal Welfare Society",
    creatorEmail: "rescue@animalwelfare.org",
    donorCount: 87,
    isUrgent: false,
    isVerified: true
  },
  {
    title: "Community Center for Senior Citizens",
    description: "Creating a safe space for elderly people to socialize, get healthcare, and participate in activities. Help us care for our seniors.",
    category: "Community",
    goal: 600000,
    collected: 425000,
    duration: 35,
    status: "active",
    creatorName: "Senior Care Foundation",
    creatorEmail: "hello@seniorcare.org",
    donorCount: 201,
    isUrgent: false,
    isVerified: true
  },
  {
    title: "Disaster Relief Fund - Flood Victims",
    description: "Immediate relief for families affected by recent floods. Providing food, shelter, and essential supplies to 1000+ families.",
    category: "Other",
    goal: 800000,
    collected: 720000,
    duration: 20,
    status: "active",
    creatorName: "Disaster Relief Team",
    creatorEmail: "emergency@relief.org",
    donorCount: 567,
    isUrgent: true,
    isVerified: true
  },
  {
    title: "Women Empowerment Through Skill Training",
    description: "Vocational training for underprivileged women to become financially independent. Courses in tailoring, handicrafts, and digital skills.",
    category: "Education",
    goal: 450000,
    collected: 225000,
    duration: 60,
    status: "active",
    creatorName: "Women Empowerment NGO",
    creatorEmail: "contact@womenpower.org",
    donorCount: 156,
    isUrgent: false,
    isVerified: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Campaign.deleteMany({});
    await Donor.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert sample campaigns
    console.log('📝 Inserting sample campaigns...');
    const campaigns = await Campaign.insertMany(sampleCampaigns);
    console.log(`✅ ${campaigns.length} campaigns created\n`);

    // Create sample donations for each campaign
    console.log('💰 Creating sample donations...');
    let totalDonations = 0;

    for (const campaign of campaigns) {
      const donationCount = Math.floor(Math.random() * 10) + 5; // 5-15 donations per campaign
      
      for (let i = 0; i < donationCount; i++) {
        await Donor.create({
          name: `Donor ${Math.floor(Math.random() * 1000)}`,
          email: `donor${Math.floor(Math.random() * 10000)}@example.com`,
          phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          amount: [500, 1000, 2000, 5000, 10000][Math.floor(Math.random() * 5)],
          campaignId: campaign._id,
          campaignTitle: campaign.title,
          message: 'Happy to contribute to this cause!',
          displayPublicly: Math.random() > 0.3,
          paymentStatus: 'completed',
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
        });
        totalDonations++;
      }
    }

    console.log(`✅ ${totalDonations} donations created\n`);

    // Create admin if doesn't exist
    const existingAdmin = await Admin.findOne({ email: 'admin@donation.com' });
    if (!existingAdmin) {
      console.log('👤 Creating default admin...');
      await Admin.create({
        email: 'admin@donation.com',
        password: 'admin123',
        name: 'Super Administrator',
        role: 'superadmin',
        isActive: true
      });
      console.log('✅ Admin created\n');
    } else {
      console.log('ℹ️  Admin already exists\n');
    }

    // Display summary
    console.log('📊 Database Seeding Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Campaigns: ${campaigns.length}`);
    console.log(`✅ Donations: ${totalDonations}`);
    console.log(`✅ Admin: 1`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🎉 Database seeded successfully!\n');
    console.log('Admin Credentials:');
    console.log('📧 Email: admin@donation.com');
    console.log('🔑 Password: admin123\n');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the script
seedDatabase();
