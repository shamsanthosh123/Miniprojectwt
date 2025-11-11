# GiveHope - Complete Project Structure

## 📁 Project Overview

```
givehope/
├── backend/                      # Node.js + Express + MongoDB Backend
│   ├── config/
│   │   └── db.js                # MongoDB connection configuration
│   ├── controllers/
│   │   ├── adminController.js   # Admin business logic
│   │   ├── campaignController.js # Campaign business logic
│   │   └── donorController.js   # Donor business logic
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── Admin.js             # Admin MongoDB schema
│   │   ├── Campaign.js          # Campaign MongoDB schema
│   │   └── Donor.js             # Donor MongoDB schema
│   ├── routes/
│   │   ├── adminRoutes.js       # Admin API routes
│   │   ├── campaignRoutes.js    # Campaign API routes
│   │   └── donorRoutes.js       # Donor API routes
│   ├── scripts/
│   │   ├── createAdmin.js       # Script to create default admin
│   │   └── seedDatabase.js      # Script to seed sample data
│   ├── .env                     # Backend environment variables
│   ├── .env.example             # Environment template
│   ├── package.json             # Backend dependencies
│   ├── README.md                # Backend documentation
│   └── server.js                # Express server entry point
│
├── components/                   # React Components (Frontend)
│   ├── figma/
│   │   └── ImageWithFallback.tsx # Image component with fallback
│   ├── ui/                      # Shadcn UI components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ... (35+ UI components)
│   ├── CampaignCard.tsx         # Campaign card component
│   ├── Counter.tsx              # Animated counter component
│   ├── DonationModal.tsx        # Donation form modal
│   ├── FAQSection.tsx           # FAQ accordion section
│   ├── Footer.tsx               # Footer component
│   ├── Header.tsx               # Header/Navigation component
│   ├── Hero.tsx                 # Hero section component
│   ├── SignInModal.tsx          # Sign in modal
│   └── SignUpModal.tsx          # Sign up modal
│
├── pages/                        # Page Components
│   ├── CreateCampaign.tsx       # Campaign creation page
│   ├── ExploreCampaigns.tsx     # Campaign listing page
│   ├── FAQPage.tsx              # FAQ page
│   ├── Home.tsx                 # Home/Landing page
│   ├── HowItWorks.tsx           # How it works page
│   ├── PrivacyPolicy.tsx        # Privacy policy page
│   ├── StartDonating.tsx        # Start donating page
│   └── VisualDocumentation.tsx  # Visual documentation page
│
├── utils/                        # Utility Functions
│   └── api.ts                   # API integration utilities
│
├── styles/
│   └── globals.css              # Global styles and Tailwind config
│
├── guidelines/
│   └── Guidelines.md            # Design guidelines
│
├── .env                          # Frontend environment variables
├── App.tsx                       # Main React app component
├── Attributions.md              # Project attributions
├── BACKEND_SETUP.md             # Complete backend setup guide
├── PROJECT_STRUCTURE.md         # This file
├── WIREFRAMES.md                # Page wireframes
├── package.json                 # Frontend dependencies
└── README.md                     # Main project README
```

## 🎯 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn UI (Radix UI)
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Custom page navigation
- **Notifications**: Sonner (Toast)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js
- **Environment Variables**: dotenv
- **Security**: CORS enabled
- **Validation**: Express Validator

## 📊 Database Schema

### Collections

1. **donors** - Donation records
   - name, email, phone
   - amount, campaignId
   - message, displayPublicly
   - paymentStatus, date
   - Timestamps

2. **campaigns** - Fundraising campaigns
   - title, description, category
   - goal, collected, donorCount
   - duration, startDate, endDate
   - status, image, documents
   - creatorName, creatorEmail
   - isUrgent, isVerified
   - Timestamps

3. **admins** - Admin users
   - email, password (hashed)
   - name, role
   - lastLogin, isActive
   - Timestamps

## 🔌 API Endpoints

### Donor Routes (`/api/donors`)
- `POST /` - Create donation
- `GET /` - Get all donations
- `GET /:id` - Get donation by ID
- `GET /stats` - Get donation statistics

### Campaign Routes (`/api/campaigns`)
- `POST /` - Create campaign
- `GET /` - Get all campaigns (with filters)
- `GET /:id` - Get campaign by ID
- `GET /stats/overview` - Get campaign statistics
- `PUT /:id` - Update campaign (Admin)
- `DELETE /:id` - Delete campaign (Admin)

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /create-default` - Create default admin
- `GET /summary` - Dashboard summary (Protected)
- `GET /donors` - Get all donors (Protected)
- `GET /campaigns` - Get all campaigns (Protected)

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#00BCD4)
- **Secondary**: Soft Blue (#4DD0E1)
- **Background**: White to Light Blue Gradient
- **Text**: Gray-900 (headings), Gray-600 (body)
- **Footer**: Teal Gradient (#B2EBF2 to #80DEEA)

### Typography
- **Headings**: Nunito/Poppins
- **Body**: Poppins/Inter
- **Sizes**: 
  - Large Headings: 4xl - 8xl
  - Body Text: base - xl

### Spacing
- Section Padding: py-24
- Card Padding: p-7 to p-10
- Grid Gap: gap-8
- Element Spacing: space-y-8

### Components
- Buttons: Gradient with soft shadows
- Cards: White with soft shadows, rounded-2xl
- Inputs: h-12 to h-14, border-gray-200
- Icons: Gradient backgrounds, rounded

## 📄 Page Structure

### 1. Home (`/pages/Home.tsx`)
- Hero section with call-to-action
- Stats counters (donors, funds, campaigns)
- Impact section
- Footer

### 2. Explore Campaigns (`/pages/ExploreCampaigns.tsx`)
- Category filters
- Campaign grid (3 columns)
- Search and filter functionality
- Campaign cards with progress bars

### 3. How It Works (`/pages/HowItWorks.tsx`)
- Process steps (Browse, Donate, Track)
- Information for donors
- Information for campaign creators
- FAQ section

### 4. Start Donating (`/pages/StartDonating.tsx`)
- Urgent campaigns section
- Category browsing
- Active campaigns grid
- Donation modal integration

### 5. Create Campaign (`/pages/CreateCampaign.tsx`)
- Campaign creation form
- File upload (image, documents)
- Category selection
- Goal and duration settings
- Success stories section

### 6. FAQ Page (`/pages/FAQPage.tsx`)
- Accordion-style questions
- Category sections
- Contact support section

### 7. Privacy Policy (`/pages/PrivacyPolicy.tsx`)
- Policy content
- Table of contents
- Legal information

## 🔐 Authentication Flow

1. User navigates to admin section
2. Admin enters credentials (email + password)
3. Backend validates credentials
4. JWT token generated and returned
5. Token stored in localStorage
6. Token sent in Authorization header for protected routes
7. Middleware validates token for each request
8. Admin accesses protected resources

## 🔄 Data Flow

### Campaign Creation
1. User fills campaign form
2. Frontend validates input
3. API call to `POST /api/campaigns`
4. Backend validates and saves to MongoDB
5. Campaign appears in listings

### Donation Process
1. User selects campaign
2. Opens donation modal
3. Fills donor details and amount
4. API call to `POST /api/donors`
5. Backend creates donation record
6. Campaign `collected` amount updated
7. Campaign `donorCount` incremented
8. Success notification shown

### Admin Dashboard
1. Admin logs in
2. Token stored
3. Dashboard requests summary data
4. Backend aggregates statistics
5. Data displayed in dashboard
6. Real-time updates on refresh

## 🛠️ Development Workflow

### Starting Backend
```bash
cd backend
npm install
npm run server
```
Server runs on `http://localhost:5000`

### Starting Frontend
```bash
npm install
npm run dev
```
App runs on `http://localhost:5173`

### Database Setup
1. Create MongoDB Atlas account
2. Create cluster and database user
3. Whitelist IP address
4. Get connection string
5. Update `.env` in backend folder
6. Run seed script (optional):
   ```bash
   cd backend
   node scripts/seedDatabase.js
   ```

## 📦 Dependencies

### Frontend (`package.json`)
- react, react-dom
- @radix-ui/* (UI components)
- lucide-react (icons)
- tailwindcss
- typescript
- vite

### Backend (`backend/package.json`)
- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- cors
- express-validator
- nodemon (dev)

## 🚀 Deployment Checklist

### Backend Deployment
- [ ] Set up MongoDB production database
- [ ] Configure environment variables
- [ ] Set NODE_ENV=production
- [ ] Secure JWT_SECRET
- [ ] Disable create-default admin route
- [ ] Set up CORS for production domain
- [ ] Deploy to hosting (Heroku, Railway, Render)

### Frontend Deployment
- [ ] Update VITE_API_URL to production backend
- [ ] Build production bundle: `npm run build`
- [ ] Deploy to hosting (Vercel, Netlify)
- [ ] Configure custom domain
- [ ] Test all features in production

## 📚 Documentation Files

- **BACKEND_SETUP.md** - Complete backend integration guide
- **WIREFRAMES.md** - Visual wireframes for all pages
- **PROJECT_STRUCTURE.md** - This file
- **backend/README.md** - Backend API documentation
- **Attributions.md** - Project credits
- **guidelines/Guidelines.md** - Design guidelines

## 🎯 Features Implemented

### User Features
✅ Browse campaigns by category
✅ Search and filter campaigns
✅ View campaign details
✅ Make donations
✅ Create new campaigns
✅ View donation history
✅ Responsive design

### Admin Features
✅ Admin authentication
✅ Dashboard with statistics
✅ View all donations
✅ View all campaigns
✅ Manage campaigns
✅ Generate reports

### Technical Features
✅ RESTful API
✅ JWT authentication
✅ MongoDB integration
✅ Error handling
✅ Input validation
✅ CORS support
✅ TypeScript support
✅ Environment configuration

## 🔧 Maintenance

### Adding New Features
1. Backend: Create route → controller → model
2. Frontend: Create component → integrate API
3. Test thoroughly
4. Update documentation

### Database Backup
Recommended: Set up automated backups in MongoDB Atlas

### Monitoring
- Use MongoDB Atlas monitoring
- Set up error logging
- Monitor API performance
- Track user analytics

## 📞 Support

For issues or questions:
- Check documentation files
- Review API endpoints
- Check backend logs
- Verify database connection
- Test with sample data

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: Production Ready
