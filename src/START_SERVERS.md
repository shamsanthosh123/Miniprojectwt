# 🚀 Starting the GiveHope Application

This guide will help you start both the backend and frontend servers properly.

## ⚠️ Fix "Failed to Fetch" Errors

If you're seeing **"Failed to fetch"** errors, it means the backend server is not running. Follow the steps below to start both servers.

---

## 📋 Prerequisites

Before starting, ensure you have:

1. ✅ Node.js (v16 or higher) installed
2. ✅ MongoDB installed and running
3. ✅ Dependencies installed for both frontend and backend

---

## 🔧 Step 1: Start MongoDB

### On macOS/Linux:
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or if using Homebrew:
brew services start mongodb-community
```

### On Windows:
```bash
# MongoDB usually starts automatically, or run:
net start MongoDB
```

### Verify MongoDB is Running:
```bash
# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"
```

You should see: `{ ok: 1 }`

---

## 🟢 Step 2: Start Backend Server

Open a **NEW terminal window** and run:

```bash
# Navigate to backend directory
cd backend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

### ✅ Success Indicators:

You should see:
```
==================================================
🚀 GiveHope Backend Server Started
==================================================
📍 Server running on port 5000
🌍 Environment: development
🔗 API URL: http://localhost:5000/api
💚 Health check: http://localhost:5000/health
==================================================

✅ MongoDB connected successfully
```

### ❌ If You See Errors:

**Error: Cannot connect to MongoDB**
```
Solution:
1. Make sure MongoDB is running (see Step 1)
2. Check MONGODB_URI in /backend/.env file
3. Default: mongodb://localhost:27017/givehope
```

**Error: Port 5000 already in use**
```
Solution:
1. Kill process on port 5000:
   # macOS/Linux:
   lsof -ti:5000 | xargs kill -9
   
   # Windows:
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

2. Or change PORT in .env file
```

**Error: Missing .env file**
```
Solution:
Create /backend/.env file with:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/givehope
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🔵 Step 3: Start Frontend Server

Open a **SECOND terminal window** (keep backend running) and run:

```bash
# Navigate to project root (not backend folder)
cd ..

# Or if already in root:
# (you should see App.tsx, package.json, etc.)

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

### ✅ Success Indicators:

You should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Open Browser:

Navigate to: **http://localhost:5173**

---

## 🎯 Step 4: Verify Everything Works

### Test 1: Check Backend Health

Open: http://localhost:5000/health

Should show:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-11T..."
}
```

### Test 2: Check Frontend

Open: http://localhost:5173

Should display the GiveHope homepage.

### Test 3: Check Admin Login

1. Click **"Login"** in header
2. Enter credentials:
   - Email: `admin@donation.com`
   - Password: `admin123`
3. Click **"Sign In"**
4. Should see success message
5. Click **"Admin Dashboard"** in header

### Test 4: Check Donor Data

If Admin Dashboard shows **"No donors found"**:

```bash
# In backend terminal, run seed script:
cd backend
npm run seed
```

This creates sample campaigns and donors.

---

## 🖥️ Running Both Servers Side-by-Side

### Option 1: Two Terminal Windows

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
# From project root
npm run dev
```

### Option 2: Using tmux (macOS/Linux)

```bash
# Start tmux
tmux

# Split window horizontally
Ctrl+b then "

# Top pane - Backend
cd backend && npm run dev

# Switch to bottom pane
Ctrl+b then ↓

# Bottom pane - Frontend
npm run dev

# Navigate between panes: Ctrl+b then arrow keys
```

### Option 3: Using VS Code

1. Open VS Code
2. Terminal → New Terminal
3. Click **"+"** to open second terminal
4. Run backend in first terminal
5. Run frontend in second terminal

---

## 🛑 Stopping the Servers

### Stop Backend:
```bash
# In backend terminal:
Ctrl + C
```

### Stop Frontend:
```bash
# In frontend terminal:
Ctrl + C
```

### Stop MongoDB:
```bash
# macOS/Linux:
sudo systemctl stop mongod

# Homebrew:
brew services stop mongodb-community

# Windows:
net stop MongoDB
```

---

## 🔄 Restarting After Errors

If you encounter errors:

1. **Stop both servers** (Ctrl+C in both terminals)
2. **Check MongoDB is running**
3. **Restart backend first**
4. **Then restart frontend**
5. **Refresh browser** (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📊 Quick Reference Commands

### Backend Commands:
```bash
cd backend
npm run dev           # Start dev server
npm run start         # Start production server
npm run seed          # Seed sample data
npm run create-admin  # Create admin user
```

### Frontend Commands:
```bash
# From project root
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## 🐛 Troubleshooting Common Issues

### Issue: "Failed to fetch" errors

**Cause:** Backend server is not running

**Solution:**
1. Check backend terminal - is it running?
2. Visit http://localhost:5000/health
3. If nothing loads, backend is down
4. Restart backend server

---

### Issue: Port already in use

**Solution:**
```bash
# Kill process on port 5000 (backend):
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend):
lsof -ti:5173 | xargs kill -9
```

---

### Issue: MongoDB connection error

**Solution:**
```bash
# Check MongoDB status:
mongosh --eval "db.adminCommand('ping')"

# If error, start MongoDB:
sudo systemctl start mongod
# or
brew services start mongodb-community
```

---

### Issue: Admin login not working

**Solution:**
```bash
# Create admin user:
cd backend
npm run create-admin

# Use credentials:
# Email: admin@donation.com
# Password: admin123
```

---

### Issue: No campaigns/donors showing

**Solution:**
```bash
# Seed database with sample data:
cd backend
npm run seed

# Refresh frontend page
```

---

### Issue: CORS errors in browser console

**Solution:**
1. Check backend is running on port 5000
2. Check frontend is running on port 5173
3. Verify CORS settings in backend/server.js
4. Restart both servers

---

### Issue: Changes not reflecting

**Solution:**
```bash
# Backend changes:
# Nodemon auto-restarts, but if not, Ctrl+C and restart

# Frontend changes:
# Vite auto-refreshes, but if not:
# 1. Stop server (Ctrl+C)
# 2. Clear cache: rm -rf node_modules/.vite
# 3. Restart: npm run dev
```

---

## ✅ Checklist for Successful Startup

- [ ] MongoDB is running
- [ ] Backend dependencies installed (`npm install` in /backend)
- [ ] Backend .env file exists with correct values
- [ ] Backend server running on port 5000
- [ ] Backend health check works (http://localhost:5000/health)
- [ ] Frontend dependencies installed (`npm install` in root)
- [ ] Frontend server running on port 5173
- [ ] Browser opened to http://localhost:5173
- [ ] No errors in browser console
- [ ] Admin login works
- [ ] Admin dashboard loads

---

## 🎉 You're All Set!

Once both servers are running:

1. **Frontend**: http://localhost:5173
2. **Backend API**: http://localhost:5000/api
3. **Health Check**: http://localhost:5000/health

### Test the Admin Dashboard:

1. Login with admin credentials
2. Click "Admin Dashboard"
3. View donor statistics
4. Search and filter donors
5. Export data to CSV

---

## 💡 Pro Tips

1. **Always start backend before frontend**
2. **Keep both terminal windows visible** to monitor for errors
3. **Check both terminals** if something isn't working
4. **MongoDB must be running** before starting backend
5. **Use Ctrl+C** to gracefully stop servers (not closing terminal)
6. **Clear browser cache** if seeing stale data (Ctrl+Shift+R)

---

## 📞 Still Having Issues?

If problems persist:

1. Check MongoDB is actually running: `mongosh`
2. Check backend logs in terminal
3. Check browser console for errors (F12)
4. Verify all dependencies installed
5. Try deleting node_modules and reinstalling:
   ```bash
   rm -rf node_modules
   npm install
   ```

---

**Happy Developing! 🚀**
