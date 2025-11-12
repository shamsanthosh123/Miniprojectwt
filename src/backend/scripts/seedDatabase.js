require('dotenv').config();
const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');
const Donor = require('../models/Donor');
const connectDB = require('../config/db');

const sampleCampaigns = [
  {
    title: 'Education for Underprivileged Children',
    description: 'Help provide quality education, books, and supplies to children in rural communities who lack access to proper schooling. Your contribution will help build libraries, provide textbooks, and support teacher training programs.',
    category: 'schools',
    goal: 6250000,
    duration: 60,
    creatorName: 'Education Foundation India',
    creatorEmail: 'contact@educationfoundation.org',
    status: 'active',
    isUrgent: false,
    isFeatured: true
  },
  {
    title: 'Clean Water Initiative',
    description: 'Build wells and water purification systems in communities without access to safe drinking water. Every donation helps bring clean water to families in need.',
    category: 'health',
    goal: 8330000,
    duration: 90,
    creatorName: 'Water for All NGO',
    creatorEmail: 'info@waterforall.org',
    status: 'active',
    isUrgent: true,
    isFeatured: true
  },
  {
    title: 'Medical Equipment for Rural Clinics',
    description: 'Provide essential medical equipment and supplies to healthcare facilities serving remote communities. Help save lives by ensuring clinics have the tools they need.',
    category: 'health',
    goal: 4165000,
    duration: 45,
    creatorName: 'Rural Health Initiative',
    creatorEmail: 'support@ruralhealthindia.org',
    status: 'active',
    isUrgent: true,
    isFeatured: false
  },
  {
    title: 'School Infrastructure Development',
    description: 'Build new classrooms and improve school facilities for children in underserved areas. Help create a better learning environment for the next generation.',
    category: 'schools',
    goal: 5000000,
    duration: 120,
    creatorName: 'Build Schools Foundation',
    creatorEmail: 'hello@buildschools.org',
    status: 'active',
    isUrgent: false,
    isFeatured: false
  },
  {
    title: 'Children\'s Nutrition Program',
    description: 'Provide nutritious meals to malnourished children in urban slums and rural areas. Your support ensures children get the nutrition they need to grow and thrive.',
    category: 'children',
    goal: 7083000,
    duration: 75,
    creatorName: 'Nutrition First',
    creatorEmail: 'care@nutritionfirst.org',
    status: 'active',
    isUrgent: false,
    isFeatured: true
  },
  {
    title: 'Children\'s Hospital Emergency Fund',
    description: 'Support critical medical care for children with life-threatening conditions. Every contribution helps save a child\'s life.',
    category: 'children',
    goal: 10000000,
    duration: 30,
    creatorName: 'Children\'s Medical Trust',
    creatorEmail: 'emergencies@childmedicaltrust.org',
    status: 'active',
    isUrgent: true,
    isFeatured: true
  },
  {
    title: 'Disaster Relief Fund',
    description: 'Provide immediate relief to families affected by natural disasters. Your donation helps with food, shelter, and medical assistance.',
    category: 'other',
    goal: 5000000,
    duration: 60,
    creatorName: 'Disaster Response Team',
    creatorEmail: 'help@disasterresponse.org',
    status: 'active',
    isUrgent: true,
    isFeatured: false
  },
  {
    title: 'Digital Literacy for Rural Students',
    description: 'Bring technology and digital education to rural schools. Help bridge the digital divide and prepare students for the future.',
    category: 'schools',
    goal: 3500000,
    duration: 90,
    creatorName: 'Digital Education Initiative',
    creatorEmail: 'info@digitaleducation.org',
    status: 'active',
    isUrgent: false,
    isFeatured: false
  }
];

const sampleDonors = [
  { name: 'Rajesh Kumar', email: 'rajesh.k@email.com', phone: '+91 9876543210', amount: 5000 },
  { name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+91 9876543211', amount: 2500 },
  { name: 'Amit Patel', email: 'amit.p@email.com', phone: '+91 9876543212', amount: 10000 },
  { name: 'Sneha Reddy', email: 'sneha.r@email.com', phone: '+91 9876543213', amount: 1000 },
  { name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '+91 9876543214', amount: 7500 },
  { name: 'Ananya Desai', email: 'ananya.d@email.com', phone: '+91 9876543215', amount: 3000 },
  { name: 'Karthik Menon', email: 'karthik.m@email.com', phone: '+91 9876543216', amount: 15000 },
  { name: 'Divya Iyer', email: 'divya.i@email.com', phone: '+91 9876543217', amount: 5000 },
  { name: 'Rahul Verma', email: 'rahul.v@email.com', phone: '+91 9876543218', amount: 2000 },
  { name: 'Pooja Gupta', email: 'pooja.g@email.com', phone: '+91 9876543219', amount: 8000 }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('\n' + '='.repeat(50));
    console.log('🌱 Database Seeding Started');
    console.log('='.repeat(50) + '\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing campaigns and donations...');
    await Campaign.deleteMany({});
    await Donor.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert campaigns
    console.log('📝 Creating sample campaigns...');
    const campaigns = await Campaign.insertMany(sampleCampaigns);
    console.log(`✅ Created ${campaigns.length} campaigns\n`);

    // Insert donors for each campaign
    console.log('💰 Creating sample donations...');
    let totalDonations = 0;

    for (const campaign of campaigns) {
      // Add 3-8 random donations per campaign
      const donationCount = Math.floor(Math.random() * 6) + 3;
      
      for (let i = 0; i < donationCount; i++) {
        const randomDonor = sampleDonors[Math.floor(Math.random() * sampleDonors.length)];
        const randomAmount = [500, 1000, 2000, 2500, 5000, 10000][Math.floor(Math.random() * 6)];
        
        await Donor.create({
          ...randomDonor,
          amount: randomAmount,
          campaignId: campaign._id,
          message: 'Great initiative! Happy to contribute.',
          displayPublicly: Math.random() > 0.3, // 70% display publicly
          paymentStatus: 'completed'
        });
        
        totalDonations++;
      }
    }

    console.log(`✅ Created ${totalDonations} donations\n`);

    // Display summary
    const stats = await Campaign.getStatistics();
    const donorStats = await Donor.getStatistics();

    console.log('📊 Database Summary:');
    console.log('   📋 Total Campaigns:', stats.totalCampaigns);
    console.log('   ✅ Active Campaigns:', stats.activeCampaigns);
    console.log('   💰 Total Donations:', donorStats.totalDonations);
    console.log('   👥 Unique Donors:', donorStats.totalDonors);
    console.log('   💵 Total Raised: ₹' + donorStats.totalAmount.toLocaleString('en-IN'));
    console.log('\n' + '='.repeat(50));
    console.log('✨ Database seeding completed successfully!');
    console.log('='.repeat(50) + '\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
