# 🚀 Quick Start Guide

## Current Status

### ✅ Running Services

- **Frontend (Vue 3)**: http://localhost:3000
  - Status: ✅ **RUNNING**
  - You can access the UI interface right now!

### ❌ Services Requiring Setup

- **Backend (Node.js)**: http://localhost:5000
  - Status: ❌ Waiting for MongoDB

- **MongoDB**: Port 27017
  - Status: ❌ Not running

- **Redis**: Port 6379
  - Status: ❌ Not running

---

## 📱 What You Can Access Now

### Frontend is Live!

Open your browser and navigate to:
```
http://localhost:3000
```

You'll see:
- ✅ Login page
- ✅ Registration page
- ✅ UI components and layouts
- ⚠️ Backend functionality disabled (no MongoDB/Redis)

---

## 🔧 Complete Setup (All Services)

### Option 1: Docker (Recommended - 2 minutes)

#### Step 1: Install Docker
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# macOS
brew install docker docker-compose

# Or download from: https://www.docker.com/products/docker-desktop
```

#### Step 2: Start Everything
```bash
cd /home/user/flutterdummy
docker-compose up -d
```

That's it! All services will start:
- ✅ MongoDB on port 27017
- ✅ Redis on port 6379
- ✅ Backend on port 5000
- ✅ Frontend on port 3000

#### Step 3: Access the App
```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
Health Check: http://localhost:5000/health
```

---

### Option 2: Manual Setup (5-10 minutes)

#### Prerequisites
- Node.js 20+ ✅ (already installed)
- MongoDB 7.0+
- Redis 7+

#### Install MongoDB

**Ubuntu/Debian:**
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Windows:**
Download from: https://www.mongodb.com/try/download/community

#### Install Redis

**Ubuntu/Debian:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Windows:**
Download from: https://redis.io/download

#### Verify Services
```bash
# Check MongoDB
mongosh --eval "db.version()"

# Check Redis
redis-cli ping
# Should return: PONG
```

#### Start Backend
```bash
cd /home/user/flutterdummy/backend
npm run dev
```

Backend will be available at: http://localhost:5000

---

## 🎯 Quick Commands

### View Running Services
```bash
# Frontend logs
cd /home/user/flutterdummy/frontend
npm run dev

# Backend logs
cd /home/user/flutterdummy/backend
npm run dev

# With Docker
docker-compose logs -f
```

### Stop Services
```bash
# Stop Docker services
docker-compose down

# Or manually stop (Ctrl+C in each terminal)
```

### Restart Services
```bash
# With Docker
docker-compose restart

# Manual
cd backend && npm run dev
cd frontend && npm run dev
```

---

## 📊 Project Structure

```
/home/user/flutterdummy/
├── backend/          # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── models/      # MongoDB models
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API endpoints
│   │   └── middleware/  # Auth, validation, errors
│   └── package.json
│
├── frontend/         # Vue 3 + TypeScript + Vite
│   ├── src/
│   │   ├── admin/       # Platform admin module
│   │   ├── dashboard/   # Restaurant dashboard
│   │   ├── guest/       # Public menu interface
│   │   ├── store/       # Pinia state management
│   │   └── router/      # Vue Router config
│   └── package.json
│
└── docker-compose.yml   # All services orchestration
```

---

## 🧪 Testing the API

Once backend is running, test endpoints:

### Health Check
```bash
curl http://localhost:5000/health
```

### Register New Restaurant
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@restaurant.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "My Restaurant",
    "subdomain": "my-restaurant",
    "phone": "+1234567890",
    "country": "USA",
    "city": "New York"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@restaurant.com",
    "password": "password123"
  }'
```

---

## 🎨 Frontend Features (Available Now)

Access at http://localhost:3000:

- 🔐 **Login Page** - `/login`
- 📝 **Registration** - `/register`
- 👨‍💼 **Admin Panel** - `/admin` (requires login)
- 🏪 **Restaurant Dashboard** - `/dashboard` (requires login)
- 🍽️ **Public Menu** - `/menu/:subdomain` (guest view)

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### MongoDB connection failed
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check connection
mongosh
```

### Port already in use
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

---

## 📚 Documentation

- **Full README**: `/home/user/flutterdummy/README.md`
- **Deployment Guide**: `/home/user/flutterdummy/DEPLOYMENT.md`
- **This Quickstart**: `/home/user/flutterdummy/QUICKSTART.md`

---

## 🎉 Next Steps

1. **Open Frontend**: http://localhost:3000
2. **Install Docker** (if you want full functionality)
3. **Start all services**: `docker-compose up -d`
4. **Register your restaurant** via the UI
5. **Build your menu**!

---

**Need help?** Check the documentation or create an issue on GitHub.
