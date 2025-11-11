# 🚀 GiveHope - Quick Start Guide

Get your GiveHope donation platform running in 5 minutes!

## ⚡ Prerequisites

- Node.js (v14 or higher) installed
- MongoDB Atlas account (free tier) OR local MongoDB
- Code editor (VS Code recommended)
- Terminal/Command prompt

---

## 📋 Step-by-Step Setup

### Step 1: Install Backend Dependencies (1 minute)

```bash
cd backend
npm install
```

Wait for dependencies to install...

### Step 2: Configure MongoDB (2 minutes)

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster (select Free Tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Open `backend/.env` and paste:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/donation_platform?retryWrites=true&w=majority
```

Replace `username` and `password` with your database credentials.

#### Option B: Local MongoDB

```env
MONGO_URI=mongodb://localhost:27017/donation_platform
```

### Step 3: Start Backend Server (30 seconds)

```bash
cd backend
npm run server
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

Keep this terminal running!

### Step 4: Create Admin Account (30 seconds)

Open a new terminal:

```bash
cd backend
node scripts/createAdmin.js
```

Or use this API call:
```bash
curl -X POST http://localhost:5000/api/admin/create-default
```

**Admin Credentials Created:**
- Email: `admin@donation.com`
- Password: `admin123`

### Step 5: Seed Sample Data (Optional - 30 seconds)

Want sample campaigns and donations for testing?

```bash
cd backend
node scripts/seedDatabase.js
```

This creates 8 sample campaigns and multiple donations!

### Step 6: Start Frontend (30 seconds)

Open a new terminal:

```bash
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## ✅ Verification

### Test Backend Health

Open browser: http://localhost:5000/api/health

Should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test Frontend

Open browser: http://localhost:5173

You should see the GiveHope homepage!

### Test API Integration

1. Navigate to "Explore Campaigns"
2. If you seeded the database, you'll see sample campaigns
3. Click on a campaign to open donation modal

---

## 🎯 What's Working Now?

✅ **Backend Server** - Running on port 5000  
✅ **MongoDB Database** - Connected and ready  
✅ **Frontend App** - Running on port 5173  
✅ **Admin Account** - Created and ready to use  
✅ **Sample Data** - (If seeded) Campaigns and donations loaded  

---

## 🧪 Quick Tests

### Test 1: View Campaigns

**Browser**: http://localhost:5173/explore

Or API call:
```bash
curl http://localhost:5000/api/campaigns
```

### Test 2: Admin Login

Use the Sign In modal or API:
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@donation.com","password":"admin123"}'
```

Copy the token from response!

### Test 3: Create Campaign

Frontend: Navigate to "Create Campaign" page

Or API:
```bash
curl -X POST http://localhost:5000/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Campaign",
    "description": "This is a test",
    "category": "Education",
    "goal": 50000,
    "duration": 30
  }'
```

### Test 4: Make Donation

Select a campaign and click "Donate Now"

Or API:
```bash
curl -X POST http://localhost:5000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "amount": 5000,
    "campaignId": "PASTE_CAMPAIGN_ID_HERE"
  }'
```

---

## 🎨 Using the Platform

### For Donors:
1. Browse campaigns on "Explore Campaigns" page
2. Filter by category
3. Click "Donate Now" on any campaign
4. Fill donation form
5. Submit donation

### For Campaign Creators:
1. Go to "Create Campaign" page
2. Fill campaign details
3. Set funding goal and duration
4. Upload image (optional)
5. Submit campaign

### For Admins:
1. Click "Login" in header
2. Enter admin credentials
3. Access admin dashboard (needs to be created)
4. View statistics and manage campaigns

---

## 🔧 Troubleshooting

### Problem: Backend won't start

**Check:**
- Is MongoDB running/connected?
- Is `.env` configured correctly?
- Is port 5000 already in use?

**Solution:**
```bash
# Check if .env exists
cat backend/.env

# Try different port
# Edit backend/.env and change PORT=5000 to PORT=5001
```

### Problem: Frontend shows no campaigns

**Check:**
- Is backend running?
- Is `.env` configured in root folder?
- Did you seed the database?

**Solution:**
```bash
# Seed database
cd backend
node scripts/seedDatabase.js

# Check API manually
curl http://localhost:5000/api/campaigns
```

### Problem: Can't connect to MongoDB

**Check:**
- Is connection string correct?
- Is IP whitelisted in MongoDB Atlas?
- Are credentials correct?

**Solution:**
- MongoDB Atlas → Network Access → Add IP (0.0.0.0/0 for testing)
- Verify username/password
- Check connection string format

### Problem: CORS errors

**Solution:**
Backend already configured with CORS. Ensure:
1. Backend is running
2. Frontend `.env` has: `VITE_API_URL=http://localhost:5000/api`

---

## 📁 Important Files

```
📄 BACKEND_SETUP.md        - Detailed backend guide
📄 PROJECT_STRUCTURE.md    - Complete project overview
📄 backend/README.md        - API documentation
📄 backend/.env             - Backend configuration
📄 .env                     - Frontend configuration
```

---

## 🎉 Next Steps

Now that everything is running:

1. ✅ **Explore the platform** - Browse all pages
2. ✅ **Test features** - Create campaigns, make donations
3. ✅ **Customize** - Update designs (without breaking backend!)
4. ✅ **Integrate components** - Connect your React components to API
5. ✅ **Build admin dashboard** - Create admin management interface
6. ✅ **Deploy** - Follow deployment guides

---

## 📚 Documentation

- **Full Backend Setup**: Read `BACKEND_SETUP.md`
- **API Reference**: Read `backend/README.md`
- **Project Structure**: Read `PROJECT_STRUCTURE.md`
- **Wireframes**: Read `WIREFRAMES.md`

---

## 💡 Tips

- Keep both terminals running (backend and frontend)
- Use the Visual Documentation page to see all designs
- Check browser console for any errors
- Check backend terminal for API logs
- Use MongoDB Compass to view database visually

---

## 🆘 Need Help?

1. Check error messages in terminal
2. Look at browser console (F12)
3. Review documentation files
4. Verify all steps were completed
5. Check MongoDB connection

---

## ⚙️ Environment Variables Reference

### Backend (`backend/.env`)
```env
MONGO_URI=mongodb+srv://...          # Your MongoDB connection
JWT_SECRET=random_secret_key_here     # For authentication
PORT=5000                             # Backend port
NODE_ENV=development                  # Environment
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api   # Backend API URL
```

---

## 🎊 Success!

If you can see:
- ✅ Frontend running at http://localhost:5173
- ✅ Backend running at http://localhost:5000
- ✅ Campaigns displayed on Explore page
- ✅ Donation modal working

**Congratulations! Your GiveHope platform is ready! 🎉**

---

**Remember**: The design stays exactly the same - you've just added powerful backend functionality!

Start building amazing features! 🚀
