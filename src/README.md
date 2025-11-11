# 🎯 GiveHope - Modern Donation Platform

A full-stack donation platform built with React, Node.js, Express, and MongoDB. GiveHope enables users to create fundraising campaigns and make secure donations to causes they care about.

![GiveHope Platform](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen)

## ✨ Features

### For Donors
- 🔍 **Browse Campaigns** - Explore active fundraising campaigns by category
- 💳 **Easy Donations** - Simple, secure donation process
- 📊 **Real-time Updates** - See live progress of campaign goals
- 📝 **Public Recognition** - Optional public donor recognition
- 📧 **Email Confirmations** - Receive donation confirmations

### For Campaign Creators
- 🚀 **Create Campaigns** - Launch fundraising campaigns for free
- 📈 **Track Progress** - Monitor donations in real-time
- 🎯 **Set Goals** - Define funding targets and timelines
- ✅ **Quick Review** - Campaigns reviewed within 24-48 hours
- 📤 **Updates** - Keep donors informed with campaign updates

### For Administrators
- 📊 **Dashboard Analytics** - Comprehensive platform statistics
- 👥 **Donor Management** - View and manage all donations
- 🎯 **Campaign Management** - Review and approve campaigns
- 🔐 **Secure Authentication** - JWT-based admin authentication
- 📈 **Financial Reports** - Track total funds raised

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **Recharts** - Data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **JWT** - Authentication tokens
- **dotenv** - Environment configuration

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **MongoDB** - Either:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud - Recommended)
  - [MongoDB Community](https://www.mongodb.com/try/download/community) (Local)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd givehope-platform

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Setup

#### Frontend Configuration

Create `.env` in project root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

#### Backend Configuration

Create `backend/.env`:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/donation_platform

# Or local MongoDB
# MONGO_URI=mongodb://localhost:27017/donation_platform

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup

```bash
# Create default admin account
cd backend
node scripts/createAdmin.js

# (Optional) Seed with sample data
node scripts/seedDatabase.js
```

**Default Admin Credentials:**
- Email: `admin@donation.com`
- Password: `admin123`

⚠️ **Change these credentials in production!**

### 4. Run the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run server
```

**Terminal 2 - Frontend:**
```bash
# From project root
npm run dev
```

### 5. Access the Platform

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

## 📁 Project Structure

```
givehope-platform/
├── 📂 backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── scripts/         # Setup scripts
│   └── server.js        # Entry point
├── 📂 components/       # React components
│   ├── CampaignCard.tsx
│   ├── DonationModal.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── ui/             # Shadcn/UI components
├── 📂 pages/           # Page components
│   ├── Home.tsx
│   ├── ExploreCampaigns.tsx
│   ├── CreateCampaign.tsx
│   └── StartDonating.tsx
├── 📂 utils/           # Utilities
│   └── api.ts          # API client
├── 📂 styles/          # Global styles
│   └── globals.css
├── App.tsx             # Root component
└── README.md           # This file
```

## 🔌 API Endpoints

### Donor Endpoints
```
POST   /api/donors              Create new donation
GET    /api/donors              Get all donations
GET    /api/donors/:id          Get donation by ID
GET    /api/donors/stats        Get donation statistics
```

### Campaign Endpoints
```
POST   /api/campaigns           Create new campaign
GET    /api/campaigns           Get all campaigns
GET    /api/campaigns/:id       Get campaign by ID
PUT    /api/campaigns/:id       Update campaign (Admin)
DELETE /api/campaigns/:id       Delete campaign (Admin)
GET    /api/campaigns/stats/overview  Get statistics
```

### Admin Endpoints
```
POST   /api/admin/login         Admin login
GET    /api/admin/summary       Dashboard summary
GET    /api/admin/donors        Get all donors (Admin)
GET    /api/admin/campaigns     Get all campaigns (Admin)
```

## 🎨 Design System

### Colors
- **Primary:** Teal (#00BCD4)
- **Secondary:** Light Cyan (#4DD0E1)
- **Background:** White to Light Blue Gradient
- **Text:** Gray Scale

### Typography
- **Headings:** Serif fonts
- **Body:** Sans-serif fonts
- **Spacing:** Generous, modern spacing

### Components
- Rounded gradient buttons
- Soft shadows
- Clean card designs
- Smooth animations
- Responsive layouts

## 🧪 Testing Features

### Test Donation
1. Navigate to **Explore Campaigns**
2. Click "Donate Now" on any campaign
3. Fill in donor information
4. Complete donation
5. Verify campaign updates

### Test Campaign Creation
1. Navigate to **Create Campaign**
2. Fill in all required fields
3. Submit campaign
4. Check admin dashboard for pending review

### Test Admin Dashboard
1. Click "Login"
2. Use credentials: `admin@donation.com` / `admin123`
3. View statistics and manage campaigns

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ CORS protection
- ✅ Environment variable management
- ✅ Input validation
- ✅ MongoDB injection prevention

## 📊 Database Schema

### Donor Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  amount: Number,
  campaignId: ObjectId,
  message: String,
  displayPublicly: Boolean,
  date: Date
}
```

### Campaign Model
```javascript
{
  title: String,
  description: String,
  category: String,
  goal: Number,
  collected: Number,
  startDate: Date,
  endDate: Date,
  status: String,
  creatorName: String,
  creatorEmail: String
}
```

### Admin Model
```javascript
{
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Set environment variables:
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_ENV=production
```

### Backend (Render/Heroku)

1. Set environment variables in hosting platform
2. Deploy from `backend` directory
3. Ensure MongoDB connection is configured

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

**Backend:**
```bash
npm run server       # Start backend server
npm run dev          # Start with nodemon (auto-reload)
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Verify `MONGO_URI` in `backend/.env`
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

**CORS Errors**
- Verify `FRONTEND_URL` in `backend/.env`
- Restart backend server after env changes

**API Not Found**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed troubleshooting.

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [Backend Setup](./BACKEND_SETUP.md) - Backend-specific documentation
- [Project Structure](./PROJECT_STRUCTURE.md) - Architecture overview
- [Wireframes](./WIREFRAMES.md) - Design wireframes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

GiveHope Development Team

## 🙏 Acknowledgments

- Shadcn/UI for component library
- Unsplash for campaign images
- MongoDB for database solution
- Vercel for frontend hosting

## 📞 Support

For support, email support@givehope.com or open an issue in the repository.

---

**Made with ❤️ for making the world a better place**
