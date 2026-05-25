# MLM Investment Platform

A complete **Multi-Level Marketing (MLM) Investment Management System** built with Node.js/Express backend and React.js frontend, featuring advanced ROI tracking, referral management, and real-time commission distribution.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Backend Documentation](#backend-documentation)
- [Frontend Documentation](#frontend-documentation)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

---

## 🎯 Project Overview

The MLM Investment Platform is a sophisticated web application designed to manage multi-level marketing investments with automated ROI calculation, commission distribution across referral levels, and comprehensive dashboard analytics. The system tracks investments, generates daily ROI, distributes level income to referrers, and provides real-time insights through premium UI components.

---

## ✨ Features

### Backend Features
- ✅ **JWT Authentication** — Secure user registration, login, and token-based authorization
- ✅ **Investment Management** — Create, track, and manage investment plans (Basic, Silver, Gold, Platinum)
- ✅ **Automated ROI Calculation** — Daily ROI generation with scheduled cron jobs (runs at midnight UTC)
- ✅ **Multi-Level Commission** — Automatic distribution to Level 1 (10%), Level 2 (5%), and Level 3 (2%)
- ✅ **Referral System** — Unique referral codes with tracking and tree structure
- ✅ **Password Security** — bcryptjs hashing with salt rounds
- ✅ **Input Validation** — Comprehensive server-side validation for all requests
- ✅ **Error Handling** — Centralized error handling middleware with detailed error messages

### Frontend Features
- ✅ **Responsive Design** — Mobile-first approach with breakpoints at 1200px, 992px, 768px, 576px
- ✅ **Modern UI Components** — Reusable Button component with 6 variants and multiple sizes
- ✅ **Premium Dashboard** — Summary cards with gradient backgrounds, charts, and analytics
- ✅ **Charts & Visualizations** — ROI growth line chart, investment distribution pie chart, monthly income bar chart
- ✅ **Advanced Filtering** — Plan, status, and search filters on investments page
- ✅ **Auth Context** — Global authentication state management with localStorage persistence
- ✅ **Protected Routes** — Role-based access control for authenticated users
- ✅ **Nested CSS** — Modern nested CSS with SCSS-like selectors and responsive media queries
- ✅ **Brand Theming** — Consistent maroon color scheme (#7b1e2d) with natural accent colors

---

## 🛠️ Tech Stack

### Backend
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Runtime environment |
| Express.js | 4.x | Web framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | 9.x | ODM for MongoDB |
| JWT | 9.x | Authentication tokens |
| bcryptjs | 2.x | Password hashing |
| node-cron | Latest | Scheduled tasks |
| CORS | 2.x | Cross-origin requests |
| dotenv | 16.x | Environment variables |

### Frontend
| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.x | UI library |
| Vite | 8.x | Build tool |
| React Router | 6.x | Client-side routing |
| Axios | 1.x | HTTP client |
| Bootstrap | 5.x | CSS framework |
| Recharts | 2.x | Data visualization |
| React Icons | 5.x | Icon library |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)
- Git

### Clone Repository
```bash
git clone <repository-url>
cd mlm-task
```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend directory:**
   ```bash
   touch .env
   ```

4. **Add environment variables to `.env`:**
   ```env
   MONGO_URI=mongodb://localhost:27017/mlm-task
   JWT_SECRET=your-secure-secret-key-here
   PORT=5000
   NODE_ENV=development
   ```

5. **Create Admin User (optional):**
   ```bash
   node createAdmin.js
   ```
   This creates a default admin account for testing.

6. **Start backend server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5174` (or next available port)

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📚 Backend Documentation

### Directory Structure
```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic (register, login)
│   ├── investmentController.js  # Investment CRUD operations
│   ├── dashboardController.js   # Dashboard data aggregation
│   └── referralController.js    # Referral tree and info
├── cron/
│   └── roiCron.js            # Scheduled ROI calculation (0 0 * * *)
├── middlewares/
│   ├── authMiddleware.js     # JWT verification and user protection
│   └── errorHandler.js       # Centralized error handling
├── models/
│   ├── User.js               # User schema with referral codes
│   ├── Investment.js         # Investment tracking schema
│   ├── ROIHistory.js         # Daily ROI records
│   └── LevelIncome.js        # Referral commissions
├── routes/
│   ├── authRoutes.js         # /api/auth/* endpoints
│   ├── investmentRoutes.js   # /api/investments/* endpoints
│   ├── dashboardRoutes.js    # /api/dashboard/* endpoints
│   └── referralRoutes.js     # /api/referrals/* endpoints
├── services/
│   └── roiService.js         # ROI calculation and distribution logic
├── utils/
│   └── validators.js         # Input validation helpers
├── .env                      # Environment variables
├── server.js                 # Express app setup & route wiring
└── package.json
```

### Core Models

#### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  referralCode: String (unique),
  referredBy: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

#### Investment Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  amount: Number,
  plan: String (Basic|Silver|Gold|Platinum),
  dailyROI: Number (percentage),
  duration: Number (days),
  status: String (active|completed|cancelled),
  startDate: Date,
  endDate: Date,
  createdAt: Date
}
```

#### ROIHistory Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  investmentId: ObjectId,
  roiAmount: Number,
  date: Date (unique per investment per day),
  createdAt: Date
}
```

#### LevelIncome Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  referrerId: ObjectId,
  amount: Number,
  level: Number (1|2|3),
  date: Date,
  investmentId: ObjectId,
  createdAt: Date
}
```

### Key API Endpoints

#### Authentication
- `POST /api/auth/register` — Create new account
- `POST /api/auth/login` — Login with email/password
- `GET /api/auth/me` — Get current user profile (protected)

#### Investments
- `POST /api/investments` — Create new investment
- `GET /api/investments` — Fetch all user investments (protected)
- `GET /api/investments/:id` — Get single investment (protected)

#### Dashboard
- `GET /api/dashboard` — Aggregate dashboard data (protected)

#### Referrals
- `GET /api/referrals/tree` — Get referral network tree (protected)
- `GET /api/referrals/info` — Get referral stats (protected)

### Business Logic

#### Investment Plans
| Plan | Daily ROI | Level 1 | Level 2 | Level 3 |
|------|-----------|---------|---------|---------|
| Basic | 1.5% | 10% | 5% | 2% |
| Silver | 2.0% | 10% | 5% | 2% |
| Gold | 2.5% | 10% | 5% | 2% |
| Platinum | 3.0% | 10% | 5% | 2% |

#### ROI Calculation
- Scheduled daily at **00:00 UTC** via node-cron
- Only applies to **active** investments
- Idempotent: checks if ROI already generated for the day
- Formula: `roiAmount = investmentAmount * (dailyROI / 100)`

#### Level Income Distribution
- **Level 1** (Direct referrer): 10% of ROI generated
- **Level 2** (Referrer's referrer): 5% of ROI generated
- **Level 3** (Referrer's referrer's referrer): 2% of ROI generated
- Distribution happens automatically during ROI calculation

### Middleware & Security

#### Auth Middleware (`protect`)
```javascript
// Checks JWT token in Authorization header
// Validates token and adds user to request object
// Required for all protected routes
```

#### Error Handler
```javascript
// Catches all errors and returns structured responses
// Includes error status, message, and timestamp
// Development mode returns full stack trace
```

### Running Backend Tests
```bash
cd backend
node --check server.js  # Syntax validation
npm run dev             # Development mode with hot reload
npm start               # Production mode
```

---

## 🎨 Frontend Documentation

### Directory Structure
```
frontend/
├── src/
│   ├── api/
│   │   └── axiosInstance.js      # Configured Axios with auth interceptor
│   ├── components/
│   │   ├── Button/               # Reusable button component
│   │   ├── Sidebar/              # Left navigation menu
│   │   ├── Topbar/               # Top header with page title
│   │   ├── Loader/               # Loading spinner
│   │   ├── SummaryCard/          # Stats card component
│   │   └── ReferralNode/         # Referral tree node
│   ├── context/
│   │   └── AuthContext.jsx       # Global auth state management
│   ├── layouts/
│   │   └── DashboardLayout/      # Main app layout
│   ├── pages/
│   │   ├── Login/                # Login page
│   │   ├── Register/             # Registration page
│   │   ├── Dashboard/            # Main dashboard with charts
│   │   ├── Investments/          # Investment management
│   │   ├── ROIHistory/           # ROI tracking
│   │   ├── LevelIncome/          # Commission tracking
│   │   └── Referrals/            # Referral network
│   ├── routes/
│   │   └── ProtectedRoute.jsx    # Route guard component
│   ├── services/
│   │   ├── authService.js        # Auth API calls
│   │   ├── dashboardService.js   # Dashboard data fetching
│   │   ├── investmentService.js  # Investment API calls
│   │   ├── referralService.js    # Referral API calls
│   │   └── roiService.js         # ROI API calls
│   ├── utils/
│   │   └── format.js             # Currency and date formatting
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles with brand theme
├── .env.example                  # Example environment variables
├── package.json
└── vite.config.js               # Vite configuration
```

### Component Overview

#### Button Component
**Variants:** `primary` | `secondary` | `outline` | `danger` | `success` | `ghost`  
**Sizes:** `sm` | `md` | `lg`  
**Props:** `variant`, `size`, `fullWidth`, `disabled`, `loading`, `icon`, `onClick`

```jsx
<Button 
  variant="primary" 
  size="md" 
  icon={FaPlus}
  onClick={handleClick}
>
  Create Investment
</Button>
```

#### SummaryCard Component
Displays metric with icon, title, and value. Used for dashboard stats.

```jsx
<SummaryCard 
  title="Total Investments"
  value={formatCurrency(5000)}
  icon={<FaChartLine />}
  modifier="investment"
/>
```

#### Protected Routes
Automatically redirects unauthenticated users to login page.

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### Pages Documentation

#### Dashboard Page
- **Route:** `/`
- **Features:** 
  - 4 summary cards (Total Investments, Wallet Balance, Total ROI, Level Income)
  - ROI Growth line chart (last 8 days)
  - Investment Distribution pie chart
  - Monthly Referral Income bar chart
- **Charts:** Uses Recharts with brand color palette

#### Investments Page
- **Route:** `/investments`
- **Features:**
  - Create investment modal with form validation
  - Filter by plan, status, and search
  - Responsive table with investment details
  - Status badges (active/completed/cancelled)
- **Filters:** Plan dropdown, Status dropdown, Search input

#### ROI History Page
- **Route:** `/roi-history`
- **Features:** Daily ROI records with cumulative calculations

#### Level Income Page
- **Route:** `/level-income`
- **Features:** Referral commission tracking by level

#### Referrals Page
- **Route:** `/referrals`
- **Features:** 
  - Referral code display and copy functionality
  - Referral network tree visualization
  - Referral statistics

### Authentication Flow

1. **Register:** User creates account → password hashed → JWT token generated
2. **Login:** Email/password validated → JWT token returned → stored in localStorage
3. **Protected Requests:** Token included in Authorization header via Axios interceptor
4. **Token Expiry:** User redirected to login on auth error
5. **Logout:** Token removed from localStorage

### Styling System

#### CSS Nesting & Variables
```css
:root {
  --brand-maroon: #7b1e2d;
  --brand-maroon-dark: #5b1520;
  --brand-accent: #b23a48;
  --bg: #fbfaf8;
  --surface: #ffffff;
  --muted: #6b7280;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}
```

#### Responsive Breakpoints
- **1200px** — Large tablets/small desktops
- **992px** — Tablets
- **768px** — Tablets (portrait) / Small devices
- **576px** — Mobile phones

#### Typography Scale
- **H1:** 2rem (32px)
- **H2:** 1.5rem (24px)
- **H3:** 1.125rem (18px)
- **Base:** 1rem (16px)
- **Lead:** 1.0625rem (17px)

### Building & Deployment

#### Development
```bash
cd frontend
npm run dev
# Starts at http://localhost:5174
```

#### Production Build
```bash
npm run build
# Creates optimized dist/ folder
npm run preview  # Preview production build locally
```

#### Build Output
- CSS: ~248 kB (gzip: ~35 kB)
- JS: ~701 kB (gzip: ~200 kB)
- HTML: ~0.45 kB

---

## 🔌 API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "mongo-id",
    "email": "user@example.com",
    "referralCode": "UNIQUE123"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "mongo-id",
    "email": "user@example.com",
    "referralCode": "UNIQUE123"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}

Response:
{
  "_id": "mongo-id",
  "email": "user@example.com",
  "referralCode": "UNIQUE123",
  "referredBy": null,
  "createdAt": "2026-05-25T10:00:00Z"
}
```

### Investment Endpoints

#### Create Investment
```http
POST /investments
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 5000,
  "plan": "Gold",
  "duration": 30
}

Response:
{
  "_id": "investment-id",
  "userId": "user-id",
  "amount": 5000,
  "plan": "Gold",
  "dailyROI": 2.5,
  "duration": 30,
  "status": "active",
  "startDate": "2026-05-25T10:00:00Z",
  "endDate": "2026-06-24T10:00:00Z"
}
```

#### Get All Investments
```http
GET /investments
Authorization: Bearer {token}

Response:
{
  "investments": [
    {
      "_id": "id-1",
      "amount": 5000,
      "plan": "Gold",
      "status": "active",
      ...
    }
  ]
}
```

### Dashboard Endpoint

#### Get Dashboard Data
```http
GET /dashboard
Authorization: Bearer {token}

Response:
{
  "totalInvestment": 15000,
  "walletBalance": 3500.75,
  "totalROI": 1250.50,
  "totalLevelIncome": 500.25,
  "investments": [...],
  "roiHistory": [...],
  "levelIncome": [...]
}
```

### Referral Endpoints

#### Get Referral Tree
```http
GET /referrals/tree
Authorization: Bearer {token}

Response:
{
  "user": {
    "_id": "user-id",
    "email": "user@example.com",
    "referrals": [
      {
        "_id": "referral-id-1",
        "email": "referral1@example.com",
        "referrals": [...]
      }
    ]
  }
}
```

#### Get Referral Stats
```http
GET /referrals/info
Authorization: Bearer {token}

Response:
{
  "referralCode": "UNIQUE123",
  "totalReferrals": 5,
  "levelIncomeTotal": 1500.75,
  "level1Count": 2,
  "level2Count": 2,
  "level3Count": 1
}
```

---

## 📁 Project Structure

```
mlm-task/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── cron/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   ├── createAdmin.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

---

## ⚙️ Environment Configuration

### Backend `.env`
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/mlm-task

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server
PORT=5000
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### Terminal 1: Start Backend
```bash
cd backend
npm install
npm run dev
# Output: Server running on http://localhost:5000
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm install
npm run dev
# Output: Local: http://localhost:5174
```

### Access Application
- **Frontend:** http://localhost:5174
- **Backend API:** http://localhost:5000/api
- **Default Admin Email:** admin@mlm.com
- **Default Admin Password:** admin123

### Test Account Creation
1. Register new account at `/register`
2. Login with credentials
3. Create investments and track ROI
4. Invite others using referral code

---

## 🗄️ Database Schema

### MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,        // unique, indexed
  password: String,     // bcryptjs hashed
  referralCode: String, // unique, indexed
  referredBy: ObjectId, // foreign key to User
  createdAt: Date,
  updatedAt: Date
}
```

#### Investments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,     // foreign key to User
  amount: Number,
  plan: String,
  dailyROI: Number,
  duration: Number,
  status: String,       // indexed
  startDate: Date,
  endDate: Date,
  createdAt: Date
}
```

#### ROI Histories Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  investmentId: ObjectId,
  roiAmount: Number,
  date: Date,           // unique: [investmentId, date]
  createdAt: Date
}
```

#### Level Incomes Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  referrerId: ObjectId,
  amount: Number,
  level: Number,
  date: Date,
  investmentId: ObjectId,
  createdAt: Date
}
```

---

## 🛡️ Security Best Practices

✅ JWT tokens for stateless authentication  
✅ bcryptjs password hashing (10 salt rounds)  
✅ CORS configuration for cross-origin requests  
✅ Input validation on server & client  
✅ Protected routes require authentication  
✅ Error messages don't expose sensitive data  
✅ Environment variables for sensitive config  
✅ Idempotent operations (ROI calculation)  

---

## 🤝 Contributing

### Setup Development Environment
1. Clone repository
2. Install dependencies (backend & frontend)
3. Create `.env` files with config
4. Start both servers in separate terminals
5. Make changes and test

### Code Standards
- Use ES6+ JavaScript
- Follow React best practices
- Nested CSS with modern syntax
- Comments for complex logic
- Responsive design for all screen sizes

### Commit Messages
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Restructure code
test: Add tests
```

---

## 📄 License

This project is proprietary and confidential.

---

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review API reference
3. Check browser console for errors
4. Review server logs

---

**Last Updated:** May 25, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
