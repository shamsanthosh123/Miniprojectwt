# ⚡ Quick Fix for "Failed to Fetch" Error

## 🎯 The Problem

You're seeing this error because the **backend server is not running**. The frontend can't connect to the API.

## ✅ The Solution (3 Steps)

### Step 1: Check if MongoDB is Running

```bash
# Test MongoDB connection
mongosh --eval "db.adminCommand('ping')"
```

**If it fails**, start MongoDB:

**macOS/Linux:**
```bash
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

---

### Step 2: Start the Backend Server

Open a **new terminal** and run:

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Create .env file if it doesn't exist
# Copy from .env.example:
cp .env.example .env

# Start the server
npm run dev
```

**Wait for this message:**
```
✅ MongoDB connected successfully
🚀 GiveHope Backend Server Started
📍 Server running on port 5000
```

---

### Step 3: Refresh Your Browser

1. Go back to your browser
2. Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) to hard refresh
3. The error should be gone! ✨

---

## 🧪 Test Backend is Working

Open this URL in your browser:
```
http://localhost:5000/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 🚀 Full Startup Sequence

**Always start servers in this order:**

1. **MongoDB** (must be running first)
2. **Backend** (port 5000)
3. **Frontend** (port 5173) - this is already running

---

## 📋 Backend .env File

If `/backend/.env` doesn't exist, create it with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/givehope
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
FRONTEND_URL=http://localhost:5173
```

---

## 🐛 Still Not Working?

### Check Backend Terminal for Errors

Look for these common issues:

**"Cannot connect to MongoDB"**
- MongoDB is not running
- Solution: Start MongoDB (see Step 1)

**"Port 5000 already in use"**
```bash
# Kill the process:
lsof -ti:5000 | xargs kill -9
# Then restart backend
```

**"Missing .env file"**
- Create it from .env.example (see above)

---

## 🎯 Quick Commands Reference

```bash
# Backend Terminal
cd backend
npm install          # First time only
npm run dev          # Start backend server

# Check if backend is running
curl http://localhost:5000/health

# See backend logs
# Just look at the terminal where backend is running
```

---

## ✅ Success Checklist

- [ ] MongoDB is running
- [ ] Backend terminal shows "Server running on port 5000"
- [ ] Backend terminal shows "MongoDB connected successfully"
- [ ] http://localhost:5000/health works in browser
- [ ] Frontend shows no "Failed to fetch" errors
- [ ] Backend status indicator in frontend is green (if visible)

---

## 🎉 You're Done!

Once backend is running, try:

1. **Login as Admin:**
   - Email: `admin@donation.com`
   - Password: `admin123`

2. **Click "Admin Dashboard"** to view donor information

3. **If no data shows**, seed the database:
   ```bash
   cd backend
   npm run seed
   ```

---

## 💡 Pro Tip

**Keep two terminals open:**
- Terminal 1: Backend (running `npm run dev` in `/backend`)
- Terminal 2: Frontend (already running)

This way you can see logs from both servers!

---

## 📞 Need More Help?

Check these files:
- `/START_SERVERS.md` - Complete startup guide
- `/ADMIN_DASHBOARD.md` - Admin dashboard usage guide
- `/BACKEND_SETUP.md` - Backend setup details

---

**Good luck! 🚀**
