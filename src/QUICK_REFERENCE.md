# ⚡ GiveHope - Quick Reference Card

## 🚀 Quick Start Commands

### Initial Setup
```bash
# Install all dependencies
npm install
cd backend && npm install && cd ..

# Configure environment
cp .env.example .env
cp backend/.env.example backend/.env
# Edit both .env files with your MongoDB credentials

# Create admin account
cd backend && npm run create-admin && cd ..

# (Optional) Seed sample data
cd backend && npm run seed && cd ..
```

### Run the Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
npm run dev
```

## 🔗 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Main application |
| Backend API | http://localhost:5000/api | API server |
| Health Check | http://localhost:5000/health | Server status |

## 🔐 Default Credentials

**Admin Login:**
- Email: `admin@donation.com`
- Password: `admin123`

⚠️ **Change immediately after first login!**

## 📁 Project Structure

```
givehope-platform/
├── backend/              # Node.js + Express + MongoDB
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication
│   └── scripts/         # Setup scripts
├── components/          # React components
├── pages/              # Page components
├── utils/              # API utilities
└── styles/             # Global styles
```

## 🔌 Key API Endpoints

### Public Endpoints
```bash
# Create donation
POST /api/donors

# Get campaigns
GET /api/campaigns?status=active&category=schools

# Get stats
GET /api/campaigns/stats/overview
GET /api/donors/stats
```

### Admin Endpoints (Require Auth Token)
```bash
# Login
POST /api/admin/login

# Dashboard
GET /api/admin/summary

# Manage campaigns
PUT /api/admin/campaigns/:id/approve
```

## 🛠️ Common Commands

### Backend
```bash
cd backend

npm start              # Start server
npm run dev           # Dev mode with auto-reload
npm run create-admin  # Create admin account
npm run seed          # Seed sample data
```

### Frontend
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

## 📊 Database Collections

| Collection | Purpose |
|------------|---------|
| admins | Admin accounts |
| campaigns | Fundraising campaigns |
| donors | Donation records |

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

### Backend (backend/.env)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/donation_platform
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check MONGO_URI in backend/.env |
| CORS errors | Verify FRONTEND_URL in backend/.env |
| Port 5000 in use | `lsof -ti:5000 \| xargs kill -9` (Mac/Linux) |
| MongoDB connection failed | Check IP whitelist in MongoDB Atlas |
| Frontend API errors | Ensure backend is running on port 5000 |

## 📝 Testing Checklist

- [ ] Frontend loads at http://localhost:5173
- [ ] Backend responds at http://localhost:5000
- [ ] Can view campaigns on Explore page
- [ ] Can create a donation
- [ ] Can create a campaign
- [ ] Can login as admin
- [ ] Admin dashboard shows statistics

## 🎯 Feature Testing

### Test Donation Flow
1. Go to Explore Campaigns
2. Click "Donate Now"
3. Fill form and submit
4. Verify success message
5. Check campaign updates

### Test Campaign Creation
1. Go to Create Campaign
2. Fill all required fields
3. Submit campaign
4. Check for pending status in admin panel

### Test Admin Functions
1. Login with admin credentials
2. View dashboard statistics
3. Approve/reject campaigns
4. View all donations

## 📚 Quick Links

- [Full Installation Guide](./INSTALLATION.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [README](./README.md)
- [Backend API Docs](./backend/README.md)

## 🆘 Support Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check running processes
lsof -i :5000  # Check port 5000
lsof -i :5173  # Check port 5173
```

## 📞 Need Help?

1. Check backend terminal for error logs
2. Check browser console for frontend errors
3. Verify all .env variables are set
4. Ensure MongoDB is accessible
5. Review troubleshooting section in docs

---

**Keep this reference handy for quick access to common tasks!** 🚀
