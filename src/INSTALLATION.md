# 🚀 GiveHope Platform - Complete Installation Guide

This guide will walk you through setting up the complete GiveHope donation platform from scratch.

## 📋 Prerequisites

Before starting, ensure you have:

✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)  
✅ **npm** (comes with Node.js)  
✅ **MongoDB** - Choose one:
   - **MongoDB Atlas** (Cloud - Recommended) - [Sign up](https://www.mongodb.com/cloud/atlas)
   - **MongoDB Local** - [Download](https://www.mongodb.com/try/download/community)

## 🎯 Step-by-Step Installation

### Step 1: Verify Prerequisites

Open your terminal and verify installations:

```bash
node --version
# Should show v16.0.0 or higher

npm --version
# Should show 8.0.0 or higher
```

### Step 2: Install Frontend Dependencies

```bash
# From project root directory
npm install
```

This will install all React and frontend dependencies.

### Step 3: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Return to project root
cd ..
```

### Step 4: Set Up MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier
   - Select your preferred region
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `givehope_admin`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<username>` with `givehope_admin`
   - Replace `<password>` with your actual password
   - Add database name: `donation_platform`
   - Final string: `mongodb+srv://givehope_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/donation_platform?retryWrites=true&w=majority`

#### Option B: Local MongoDB

1. **Install MongoDB Community Edition**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # macOS/Linux
   mongod --dbpath /usr/local/var/mongodb

   # Windows
   "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
   ```

3. **Connection String**
   ```
   mongodb://localhost:27017/donation_platform
   ```

### Step 5: Configure Environment Variables

#### Frontend Configuration

Create `.env` in project root:

```bash
# Copy example file
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

#### Backend Configuration

Create `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
# For MongoDB Atlas
MONGO_URI=mongodb+srv://givehope_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/donation_platform?retryWrites=true&w=majority

# OR for Local MongoDB
# MONGO_URI=mongodb://localhost:27017/donation_platform

JWT_SECRET=givehope_jwt_secret_key_2024_change_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

⚠️ **Important**: 
- Replace `YOUR_PASSWORD` with your actual MongoDB password
- Change `JWT_SECRET` to a random secure string in production
- Never commit `.env` files to version control

### Step 6: Initialize Database

```bash
# Make sure you're in the backend directory
cd backend

# Create default admin account
npm run create-admin
```

You should see:

```
✅ Admin account created successfully!

📋 Admin Details:
   📧 Email: admin@donation.com
   🔑 Password: admin123
   👤 Name: Platform Administrator
   🎭 Role: superadmin
```

**Optional**: Seed database with sample data:

```bash
npm run seed
```

This creates 8 sample campaigns and multiple donations for testing.

### Step 7: Start the Application

You need TWO terminal windows:

#### Terminal 1: Start Backend Server

```bash
cd backend
npm start
```

Expected output:

```
==================================================
🚀 GiveHope Backend Server Started
==================================================
📍 Server running on port 5000
🌍 Environment: development
🔗 API URL: http://localhost:5000/api
💚 Health check: http://localhost:5000/health
==================================================

✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: donation_platform
```

#### Terminal 2: Start Frontend

```bash
# From project root (open new terminal)
npm run dev
```

Expected output:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Step 8: Verify Installation

1. **Check Frontend**
   - Open browser: http://localhost:5173
   - You should see the GiveHope homepage

2. **Check Backend**
   - Open browser: http://localhost:5000
   - You should see API information

3. **Check Database Connection**
   - Open browser: http://localhost:5000/health
   - Should show: `{"success":true,"message":"Server is running"}`

### Step 9: Test the Platform

#### Test 1: Browse Campaigns

1. Go to http://localhost:5173
2. Click "Explore Campaigns"
3. You should see campaigns (if you ran the seed script)

#### Test 2: Make a Donation

1. Click "Donate Now" on any campaign
2. Fill in:
   - Name: John Doe
   - Email: john@example.com
   - Phone: +91 1234567890
   - Amount: 1000
3. Click "Complete Donation"
4. Success message should appear
5. Campaign's raised amount should update

#### Test 3: Create a Campaign

1. Click "Create Campaign"
2. Fill in all required fields
3. Click "Create Campaign"
4. Success message should appear

#### Test 4: Admin Login

1. Click "Login" in header
2. Enter credentials:
   - Email: admin@donation.com
   - Password: admin123
3. Click "Sign In"
4. You should be logged in (admin features unlocked)

## ✅ Installation Complete!

Your GiveHope platform is now fully set up and running!

## 🎓 Next Steps

1. **Change Admin Password**
   ```
   Login → Profile → Change Password
   ```

2. **Explore Admin Dashboard**
   - View donation statistics
   - Manage campaigns
   - View donor information

3. **Customize the Platform**
   - Update branding colors in `styles/globals.css`
   - Modify campaign categories
   - Add your own content

4. **Set Up Production Deployment**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

## 🐛 Troubleshooting

### Issue: Backend won't connect to MongoDB

**Error**: `MongooseError: The 'uri' parameter to 'openUri()' must be a string`

**Solution**:
1. Check that `MONGO_URI` is set in `backend/.env`
2. Verify the connection string is correct
3. For Atlas: Check IP whitelist and user credentials

### Issue: Frontend can't connect to backend

**Error**: `Failed to fetch` or `Network error`

**Solution**:
1. Ensure backend is running on port 5000
2. Check `VITE_API_URL` in frontend `.env`
3. Restart both frontend and backend

### Issue: CORS errors

**Error**: `Access to fetch has been blocked by CORS policy`

**Solution**:
1. Check `FRONTEND_URL` in `backend/.env`
2. Restart backend server
3. Clear browser cache

### Issue: Port already in use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find and kill process using port 5000
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 📚 Additional Resources

- [Project README](./README.md) - Project overview
- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [Backend API Docs](./backend/README.md) - API documentation
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/) - MongoDB Atlas docs

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Ensure MongoDB is running and accessible

## 🎉 Success!

You're all set! Start building amazing donation campaigns and making a difference! 🚀

---

**Installation Guide Version**: 1.0.0  
**Last Updated**: 2024
