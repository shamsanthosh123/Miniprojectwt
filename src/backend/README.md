# GiveHope Backend API

Node.js + Express + MongoDB backend for the GiveHope donation platform.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/donation_platform
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Initialize Database

Create the default admin account:

```bash
npm run create-admin
```

**Default Credentials:**
- Email: `admin@donation.com`
- Password: `admin123`

(Optional) Seed with sample data:

```bash
npm run seed
```

### 4. Start Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will start on http://localhost:5000

## 📋 API Endpoints

### Donor Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/donors` | Create donation | Public |
| GET | `/api/donors` | Get all donations | Public |
| GET | `/api/donors/:id` | Get donation by ID | Public |
| GET | `/api/donors/stats` | Get donation statistics | Public |
| GET | `/api/donors/recent` | Get recent donations | Public |
| GET | `/api/donors/campaign/:campaignId` | Get donations by campaign | Public |

### Campaign Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/campaigns` | Create campaign | Public |
| GET | `/api/campaigns` | Get all campaigns | Public |
| GET | `/api/campaigns/:id` | Get campaign by ID | Public |
| PUT | `/api/campaigns/:id` | Update campaign | Admin |
| DELETE | `/api/campaigns/:id` | Delete campaign | Admin |
| GET | `/api/campaigns/stats/overview` | Get campaign statistics | Public |
| GET | `/api/campaigns/featured` | Get featured campaigns | Public |
| GET | `/api/campaigns/urgent` | Get urgent campaigns | Public |

### Admin Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/admin/login` | Admin login | Public |
| GET | `/api/admin/summary` | Dashboard summary | Admin |
| GET | `/api/admin/donors` | Get all donors | Admin |
| GET | `/api/admin/campaigns` | Get all campaigns | Admin |
| GET | `/api/admin/profile` | Get admin profile | Admin |
| PUT | `/api/admin/campaigns/:id/approve` | Approve campaign | Admin |
| PUT | `/api/admin/campaigns/:id/reject` | Reject campaign | Admin |
| POST | `/api/admin/create-default` | Create default admin | Public |

## 🔐 Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Get a token by logging in:

```bash
POST /api/admin/login
{
  "email": "admin@donation.com",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "...",
    "email": "admin@donation.com",
    "name": "Platform Administrator",
    "role": "superadmin"
  }
}
```

## 📊 Database Models

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
  paymentStatus: String,
  date: Date
}
```

### Campaign Model
```javascript
{
  title: String,
  description: String,
  category: String, // schools, children, health, other
  goal: Number,
  collected: Number,
  startDate: Date,
  endDate: Date,
  duration: Number,
  status: String, // pending, active, completed, cancelled
  creatorName: String,
  creatorEmail: String,
  donorCount: Number
}
```

### Admin Model
```javascript
{
  email: String,
  password: String (hashed),
  name: String,
  role: String, // admin, superadmin
  isActive: Boolean,
  lastLogin: Date
}
```

## 🛠️ Available Scripts

```bash
npm start          # Start production server
npm run server     # Start server (alias)
npm run dev        # Start with nodemon (auto-reload)
npm run seed       # Seed database with sample data
npm run create-admin  # Create default admin account
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | Required |
| JWT_SECRET | Secret key for JWT tokens | Required |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## 📝 Request Examples

### Create Donation

```bash
POST /api/donors
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "amount": 5000,
  "campaignId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "message": "Happy to support!",
  "displayPublicly": true
}
```

### Create Campaign

```bash
POST /api/campaigns
Content-Type: application/json

{
  "title": "Help Build a School",
  "description": "We need funds to build a school in rural area...",
  "category": "schools",
  "goal": 500000,
  "duration": 60,
  "creatorName": "Education Trust",
  "creatorEmail": "contact@educationtrust.org"
}
```

### Get All Campaigns

```bash
GET /api/campaigns?category=schools&status=active&limit=10&page=1
```

### Admin Login

```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@donation.com",
  "password": "admin123"
}
```

## 🚨 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## 🔍 Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

### Filtering
- `category`: Filter by category
- `status`: Filter by status
- `search`: Search in title/description

### Sorting
- `sortBy`: Sort field (createdAt, goal, collected, ending)

Example:
```
GET /api/campaigns?category=schools&status=active&page=1&limit=10&sortBy=recent
```

## 🧪 Testing

Test the API using:

1. **Browser**: http://localhost:5000
2. **Postman**: Import API collection
3. **cURL**: Command line testing
4. **Frontend**: http://localhost:5173

Health check:
```bash
curl http://localhost:5000/health
```

## 📚 Database Indexing

The models include indexes for optimized queries:

- Campaigns: `status`, `category`, `createdAt`, `endDate`
- Donors: `campaignId`, `date`, `email`, `paymentStatus`
- Admins: `email`

## 🔄 Webhooks (Future)

Future version will support webhooks for:
- Payment gateway integration
- Email notifications
- Real-time updates

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include validation for all inputs
4. Document new endpoints in this README

## 📄 License

MIT License

---

**Backend Version**: 1.0.0  
**Last Updated**: 2024
