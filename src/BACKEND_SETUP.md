# GiveHope Backend Integration Guide

Complete setup guide for integrating the Node.js + MongoDB backend with your React frontend.

## 📋 Table of Contents

1. [Backend Setup](#backend-setup)
2. [Frontend Integration](#frontend-integration)
3. [API Usage Examples](#api-usage-examples)
4. [Testing the Integration](#testing-the-integration)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express (API server)
- mongoose (MongoDB ODM)
- dotenv (environment variables)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- cors (cross-origin requests)
- express-validator (input validation)
- nodemon (dev auto-reload)

### Step 2: Configure MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (Free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Update `/backend/.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/donation_platform?retryWrites=true&w=majority
```

#### Option B: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Update `/backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/donation_platform
```

### Step 3: Configure Environment Variables

Edit `/backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

⚠️ **Important**: Generate a secure JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Start Backend Server

```bash
cd backend
npm run server
```

You should see:
```
✅ MongoDB Connected: cluster0.mongodb.net
📊 Database: donation_platform
🚀 Server running on port 5000
📡 API endpoint: http://localhost:5000/api
```

### Step 5: Create Default Admin Account

Open Postman or your browser and make this request:

**POST** `http://localhost:5000/api/admin/create-default`

Response:
```json
{
  "success": true,
  "message": "Default admin created successfully",
  "data": {
    "email": "admin@donation.com",
    "name": "Super Administrator",
    "note": "Please change the default password immediately"
  }
}
```

Default admin credentials:
- **Email**: admin@donation.com
- **Password**: admin123

---

## 🔗 Frontend Integration

### Step 1: Install Frontend Dependencies

The API utility is already created in `/utils/api.ts`. No additional installation needed.

### Step 2: Configure Frontend API URL

The `.env` file in the root directory is already configured:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update this to your deployed backend URL.

### Step 3: Import API Functions

In your React components, import the API functions:

```typescript
import { campaignAPI, donorAPI, adminAPI } from '../utils/api';
```

---

## 💻 API Usage Examples

### Example 1: Fetch and Display Campaigns

Update your `ExploreCampaigns.tsx` page:

```typescript
import { useEffect, useState } from 'react';
import { campaignAPI } from '../utils/api';

export function ExploreCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Campaigns');

  useEffect(() => {
    fetchCampaigns();
  }, [selectedCategory]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignAPI.getAllCampaigns({
        category: selectedCategory !== 'All Campaigns' ? selectedCategory : undefined,
        status: 'active'
      });

      if (response.success) {
        setCampaigns(response.data);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component...
}
```

### Example 2: Submit Donation Form

Update your `DonationModal.tsx`:

```typescript
import { useState } from 'react';
import { donorAPI } from '../utils/api';
import { toast } from 'sonner';

export function DonationModal({ campaign, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
    displayPublicly: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await donorAPI.createDonation({
        ...formData,
        amount: Number(formData.amount),
        campaignId: campaign._id
      });

      if (response.success) {
        toast.success('Donation successful! Thank you for your contribution.');
        onClose();
        // Optionally refresh campaigns to show updated progress
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to process donation');
    }
  };

  // Rest of your component...
}
```

### Example 3: Create New Campaign

Update your `CreateCampaign.tsx` page:

```typescript
import { useState } from 'react';
import { campaignAPI } from '../utils/api';
import { toast } from 'sonner';

export function CreateCampaign() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    goal: '',
    duration: '30',
    creatorName: '',
    creatorEmail: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await campaignAPI.createCampaign({
        ...formData,
        goal: Number(formData.goal),
        duration: Number(formData.duration)
      });

      if (response.success) {
        toast.success('Campaign created successfully!');
        // Reset form or redirect
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create campaign');
    }
  };

  // Rest of your component...
}
```

### Example 4: Admin Login

Create an admin login page:

```typescript
import { useState } from 'react';
import { adminAPI } from '../utils/api';
import { toast } from 'sonner';

export function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await adminAPI.login(credentials);

      if (response.success) {
        toast.success('Login successful!');
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        placeholder="Email"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Example 5: Admin Dashboard

Create an admin dashboard to view statistics:

```typescript
import { useEffect, useState } from 'react';
import { adminAPI } from '../utils/api';

export function AdminDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await adminAPI.getSummary();
      if (response.success) {
        setSummary(response.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      // If unauthorized, redirect to login
      if (error.message?.includes('authorized')) {
        window.location.href = '/admin/login';
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard 
          title="Total Campaigns" 
          value={summary.overview.totalCampaigns} 
        />
        <StatCard 
          title="Active Campaigns" 
          value={summary.overview.activeCampaigns} 
        />
        <StatCard 
          title="Total Donations" 
          value={summary.overview.totalDonations} 
        />
        <StatCard 
          title="Total Amount" 
          value={`₹${summary.overview.totalAmount.toLocaleString()}`} 
        />
      </div>

      {/* Recent Donations */}
      <div>
        <h2>Recent Donations</h2>
        {summary.recentDonations.map((donation) => (
          <div key={donation._id}>
            {donation.name} donated ₹{donation.amount} to {donation.campaignId.title}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🧪 Testing the Integration

### Test 1: Check Backend Health

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-11T..."
}
```

### Test 2: Create a Campaign

```bash
curl -X POST http://localhost:5000/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Campaign",
    "description": "This is a test campaign",
    "category": "Education",
    "goal": 50000,
    "duration": 30,
    "creatorName": "Test User",
    "creatorEmail": "test@example.com"
  }'
```

### Test 3: Fetch Campaigns

```bash
curl http://localhost:5000/api/campaigns
```

### Test 4: Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@donation.com",
    "password": "admin123"
  }'
```

Copy the token from the response and use it for authenticated requests:

```bash
curl http://localhost:5000/api/admin/summary \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔍 Available API Functions

### Campaign API

```typescript
// Get all campaigns
const campaigns = await campaignAPI.getAllCampaigns({
  category: 'Health',
  status: 'active',
  limit: 10,
  page: 1
});

// Get single campaign
const campaign = await campaignAPI.getCampaignById('campaign_id');

// Create campaign
const newCampaign = await campaignAPI.createCampaign({...});

// Update campaign (admin only)
await campaignAPI.updateCampaign('campaign_id', {...});

// Delete campaign (admin only)
await campaignAPI.deleteCampaign('campaign_id');

// Get statistics
const stats = await campaignAPI.getCampaignStats();
```

### Donor API

```typescript
// Create donation
const donation = await donorAPI.createDonation({...});

// Get all donations
const donations = await donorAPI.getAllDonations({
  campaignId: 'campaign_id',
  limit: 50,
  page: 1
});

// Get single donation
const donation = await donorAPI.getDonationById('donation_id');

// Get statistics
const stats = await donorAPI.getDonationStats();
```

### Admin API

```typescript
// Login
const response = await adminAPI.login({
  email: 'admin@donation.com',
  password: 'admin123'
});

// Logout
adminAPI.logout();

// Get dashboard summary
const summary = await adminAPI.getSummary();

// Get all donors (admin view)
const donors = await adminAPI.getAllDonors({
  page: 1,
  limit: 20,
  search: 'john'
});

// Get all campaigns (admin view)
const campaigns = await adminAPI.getAllCampaigns({
  status: 'active',
  category: 'Health'
});

// Check authentication
const isAuth = adminAPI.isAuthenticated();
```

---

## 🐛 Troubleshooting

### Problem: Cannot connect to MongoDB

**Solution**:
1. Check your `MONGO_URI` in `.env`
2. Ensure MongoDB Atlas IP whitelist includes your IP
3. Verify database user credentials
4. Check if MongoDB service is running (local setup)

### Problem: CORS errors in browser

**Solution**:
The backend is already configured with CORS. Ensure:
1. Backend is running on port 5000
2. Frontend `.env` has correct `VITE_API_URL`
3. No browser extensions blocking requests

### Problem: API returns 401 Unauthorized

**Solution**:
1. Check if you're logged in (admin routes)
2. Verify token is being sent in Authorization header
3. Token might be expired (login again)

### Problem: Campaigns not showing in frontend

**Solution**:
1. Check if campaigns exist in database
2. Verify API call is successful (check browser console)
3. Ensure campaigns have `status: 'active'`
4. Check loading states in your component

### Problem: Donation not updating campaign

**Solution**:
1. Verify `campaignId` is correct
2. Check backend logs for errors
3. Ensure campaign status is 'active'
4. Verify MongoDB connection

---

## 📊 Database Seeding (Optional)

Want to add sample data for testing? Create a seed script:

```bash
cd backend
node seed.js
```

Create `/backend/seed.js`:

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Campaign = require('./models/Campaign');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const sampleCampaigns = [
  {
    title: "Build School in Rural Area",
    description: "Help us build a school...",
    category: "Education",
    goal: 100000,
    collected: 75000,
    duration: 30,
    status: "active",
    donorCount: 150
  },
  // Add more samples...
];

async function seed() {
  await Campaign.deleteMany({});
  await Campaign.insertMany(sampleCampaigns);
  console.log('Database seeded!');
  process.exit();
}

seed();
```

---

## 🎯 Next Steps

1. ✅ Backend setup complete
2. ✅ Frontend API integration ready
3. 🔄 Update your components to use the API
4. 🔄 Test all features end-to-end
5. 🔄 Add error handling and loading states
6. 🔄 Implement admin dashboard
7. 🔄 Deploy to production

---

## 📝 Component Integration Checklist

- [ ] Update `ExploreCampaigns.tsx` to fetch campaigns from API
- [ ] Update `StartDonating.tsx` to fetch campaigns from API
- [ ] Update `DonationModal.tsx` to submit donations to API
- [ ] Update `CreateCampaign.tsx` to create campaigns via API
- [ ] Update `Home.tsx` to fetch and display statistics
- [ ] Create admin login page
- [ ] Create admin dashboard page
- [ ] Add loading states to all API calls
- [ ] Add error handling with toast notifications
- [ ] Test all features thoroughly

---

## 🚀 Production Deployment

### Backend Deployment (Heroku, Railway, Render, etc.)

1. Set environment variables in hosting platform
2. Update `MONGO_URI` to production database
3. Set `NODE_ENV=production`
4. Deploy backend code

### Frontend Deployment

1. Update `.env` with production API URL:
   ```env
   VITE_API_URL=https://your-backend.herokuapp.com/api
   ```
2. Build frontend: `npm run build`
3. Deploy to Vercel, Netlify, or similar

---

## ✅ Summary

Your GiveHope platform now has:

✅ Complete Node.js + Express backend
✅ MongoDB database with 3 collections
✅ RESTful API with authentication
✅ Frontend API integration utilities
✅ Admin dashboard capabilities
✅ Secure donation processing
✅ Campaign management system

**The design remains completely unchanged** - only backend functionality has been added!

For support or questions, refer to the backend README at `/backend/README.md`.
