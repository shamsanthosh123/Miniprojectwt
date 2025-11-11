# GiveHope Platform Setup Guide

This guide will help you set up and run the GiveHope donation platform with full backend integration.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud - Recommended)
  - [MongoDB Community Edition](https://www.mongodb.com/try/download/community) (Local)
- **npm** or **yarn** package manager

## Quick Start

### 1. Clone and Setup

```bash
# Navigate to project directory
cd givehope-platform

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

#### Frontend Configuration

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and update:

```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

#### Backend Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and update with your MongoDB credentials:

```env
# For MongoDB Atlas (Cloud)
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/donation_platform?retryWrites=true&w=majority

# OR for Local MongoDB
MONGO_URI=mongodb://localhost:27017/donation_platform

JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Set Up MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<username>`, `<password>`, and update the database name to `donation_platform`
7. Paste into `backend/.env` as `MONGO_URI`

### 4. Initialize Database

Create the default admin account:

```bash
cd backend
node scripts/createAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@donation.com`
- Password: `admin123`

(Optional) Seed the database with sample campaigns:

```bash
node scripts/seedDatabase.js
```

### 5. Start the Application

Open **two terminal windows**:

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run server
```

You should see:
```
✅ MongoDB Connected: <your-cluster-url>
🚀 Server running on port 5000
```

#### Terminal 2 - Start Frontend

```bash
# From project root
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 6. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## Testing the Integration

### Test Donation Flow

1. Go to **Explore Campaigns** or **Start Donating**
2. Click "Donate Now" on any campaign
3. Fill in the donation form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: +91 1234567890
   - Amount: 500 (or any amount)
4. Click "Complete Donation"
5. You should see a success message
6. The campaign's raised amount will update automatically

### Test Campaign Creation

1. Go to **Create Campaign**
2. Fill in all required fields:
   - Campaign Title
   - Category
   - Description
   - Funding Goal
   - Duration (days)
   - Your Name
   - Your Email
3. Click "Create Campaign"
4. Campaign will be created and pending review

### Test Admin Dashboard

1. Click "Login" in the header
2. Use default admin credentials:
   - Email: `admin@donation.com`
   - Password: `admin123`
3. After login, you'll have access to:
   - View all donations
   - View all campaigns
   - View dashboard statistics
   - Manage campaigns

## Project Structure

```
givehope-platform/
├── backend/                    # Node.js + Express + MongoDB
│   ├── config/                # Database configuration
│   ├── controllers/           # Business logic
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Authentication
│   ├── scripts/              # Setup scripts
│   └── server.js             # Entry point
├── components/               # React components
├── pages/                    # Page components
├── utils/                    # API utilities
├── styles/                   # Global styles
└── .env                      # Frontend config
```

## API Endpoints

### Donor Endpoints
- `POST /api/donors` - Create donation
- `GET /api/donors` - Get all donations
- `GET /api/donors/stats` - Get donation statistics

### Campaign Endpoints
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get campaign by ID
- `PUT /api/campaigns/:id` - Update campaign (Admin)
- `GET /api/campaigns/stats/overview` - Get campaign stats

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/summary` - Dashboard summary
- `GET /api/admin/donors` - Get all donors (Admin view)
- `GET /api/admin/campaigns` - Get all campaigns (Admin view)

## Troubleshooting

### Backend not connecting to MongoDB

**Error:** `MongooseError: The 'uri' parameter to 'openUri()' must be a string`

**Solution:** 
- Check that `MONGO_URI` is set in `backend/.env`
- Ensure the connection string is valid
- For Atlas, whitelist your IP address in MongoDB Atlas Network Access

### CORS Errors

**Error:** `Access to fetch at 'http://localhost:5000/api/...' has been blocked by CORS policy`

**Solution:**
- Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Restart the backend server after changing environment variables

### API Connection Failed

**Error:** `Failed to fetch campaigns` or `API request failed`

**Solution:**
- Ensure backend server is running on port 5000
- Check `VITE_API_URL` in frontend `.env` is set to `http://localhost:5000/api`
- Restart the frontend after changing `.env` files

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

## Production Deployment

### Environment Variables for Production

#### Frontend (.env)
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_ENV=production
```

#### Backend (.env)
```env
MONGO_URI=mongodb+srv://...  # Your production MongoDB
JWT_SECRET=<strong-random-secret>
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS in production
- [ ] Set up proper CORS configuration
- [ ] Add rate limiting
- [ ] Enable MongoDB connection pooling
- [ ] Set up monitoring and logging

## Additional Features

### Add More Sample Data

```bash
cd backend
node scripts/seedDatabase.js
```

### Create Additional Admin Users

```bash
cd backend
node scripts/createAdmin.js
```

Then update the script with new admin credentials.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs in the terminal
3. Check browser console for frontend errors
4. Ensure all environment variables are set correctly

## Next Steps

- [ ] Customize the platform styling
- [ ] Add email notifications
- [ ] Integrate payment gateway (Razorpay, Stripe)
- [ ] Add campaign approval workflow
- [ ] Implement file upload for campaign images
- [ ] Add donation receipts/certificates
- [ ] Set up automated backups

---

**Happy Fundraising! 🎉**
