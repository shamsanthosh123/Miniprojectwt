# GiveHope Backend API

Complete Node.js + Express + MongoDB backend for the GiveHope donation platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGO_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure random string

4. Start the server:
```bash
# Development mode with auto-reload
npm run server

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📊 Database Setup

### MongoDB Collections

The application uses three main collections:

1. **donors** - Stores donation records
2. **campaigns** - Stores fundraising campaigns
3. **admins** - Stores admin user accounts

### Create Default Admin

After starting the server, create the default admin account:

**POST** `http://localhost:5000/api/admin/create-default`

Default credentials:
- **Email**: admin@donation.com
- **Password**: admin123

⚠️ **IMPORTANT**: Change the default password immediately after first login!

## 📡 API Endpoints

### Donor Module

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/donors` | Create new donation | Public |
| GET | `/api/donors` | Get all donations | Public |
| GET | `/api/donors/:id` | Get donation by ID | Public |
| GET | `/api/donors/stats` | Get donation statistics | Public |

### Campaign Module

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/campaigns` | Create new campaign | Public |
| GET | `/api/campaigns` | Get all campaigns | Public |
| GET | `/api/campaigns/:id` | Get campaign by ID | Public |
| GET | `/api/campaigns/stats/overview` | Get campaign statistics | Public |
| PUT | `/api/campaigns/:id` | Update campaign | Admin |
| DELETE | `/api/campaigns/:id` | Delete campaign | Admin |

### Admin Module

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/admin/login` | Admin login | Public |
| GET | `/api/admin/summary` | Get dashboard summary | Admin |
| GET | `/api/admin/donors` | Get all donors (admin view) | Admin |
| GET | `/api/admin/campaigns` | Get all campaigns (admin view) | Admin |

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is obtained from the login endpoint and is valid for 30 days.

## 📝 API Request Examples

### Create Donation

```javascript
POST /api/donors
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "amount": 5000,
  "campaignId": "60d5ec49f1b2c8b1f8c4e1a1",
  "message": "Happy to help!",
  "displayPublicly": true
}
```

### Create Campaign

```javascript
POST /api/campaigns
Content-Type: application/json

{
  "title": "Help Build School in Rural Area",
  "description": "We are raising funds to build a school...",
  "category": "Education",
  "goal": 100000,
  "duration": 30,
  "creatorName": "Jane Smith",
  "creatorEmail": "jane@example.com",
  "isUrgent": false
}
```

### Admin Login

```javascript
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@donation.com",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "60d5ec49f1b2c8b1f8c4e1a1",
    "email": "admin@donation.com",
    "name": "Super Administrator",
    "role": "superadmin"
  }
}
```

## 🔍 Query Parameters

### Get Campaigns

```
GET /api/campaigns?category=Health&status=active&limit=10&page=1&sortBy=popular
```

Parameters:
- `category` - Filter by category (Health, Education, etc.)
- `status` - Filter by status (active, completed, expired)
- `search` - Search in title and description
- `limit` - Number of results per page (default: 20)
- `page` - Page number (default: 1)
- `sortBy` - Sort order (urgent, popular, goal)

### Get Donations

```
GET /api/donors?campaignId=60d5ec49f1b2c8b1f8c4e1a1&limit=50&page=1
```

Parameters:
- `campaignId` - Filter by campaign ID
- `limit` - Number of results per page (default: 50)
- `page` - Page number (default: 1)

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected admin routes
- Input validation
- CORS enabled for frontend integration
- Environment variable configuration

## 📦 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── adminController.js    # Admin logic
│   ├── campaignController.js # Campaign logic
│   └── donorController.js    # Donor logic
├── middleware/
│   └── auth.js               # JWT authentication
├── models/
│   ├── Admin.js              # Admin schema
│   ├── Campaign.js           # Campaign schema
│   └── Donor.js              # Donor schema
├── routes/
│   ├── adminRoutes.js        # Admin routes
│   ├── campaignRoutes.js     # Campaign routes
│   └── donorRoutes.js        # Donor routes
├── .env                      # Environment variables
├── .env.example              # Environment template
├── package.json              # Dependencies
├── README.md                 # Documentation
└── server.js                 # Express server
```

## 🧪 Testing

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- cURL
- Browser (for GET requests)

Example cURL:
```bash
# Health check
curl http://localhost:5000/api/health

# Get campaigns
curl http://localhost:5000/api/campaigns

# Create donation
curl -X POST http://localhost:5000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "amount": 1000,
    "campaignId": "CAMPAIGN_ID_HERE"
  }'
```

## 🚀 Deployment

### MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string
6. Update `.env` with connection string

### Deploy to Production

1. Set `NODE_ENV=production` in environment
2. Update `MONGO_URI` with production database
3. Change `JWT_SECRET` to secure random string
4. Disable the `/api/admin/create-default` route
5. Enable rate limiting and additional security measures

## 📞 Support

For issues or questions, refer to the main project documentation.

## ⚠️ Important Notes

1. **Change default admin password immediately**
2. **Disable create-default admin route in production**
3. **Keep JWT_SECRET secure and never commit to version control**
4. **Use environment variables for sensitive data**
5. **Enable MongoDB authentication in production**
6. **Set up proper CORS configuration for production**

## 📄 License

This backend is part of the GiveHope donation platform project.
