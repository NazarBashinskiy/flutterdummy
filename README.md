# Restaurant Menu Platform - Multi-tenant SaaS

A comprehensive multi-tenant SaaS platform for restaurant digital menu management with QR code integration, built with Node.js, Vue 3, and MongoDB.

## 🚀 Features

### Platform Admin (Super Admin)
- **Tenant Management**: Create, manage, and monitor multiple restaurant tenants
- **Subscription Management**: Handle billing, plans, and subscription lifecycle
- **Analytics Dashboard**: Platform-wide metrics and KPIs
- **Support System**: Built-in ticketing and customer support

### Restaurant Dashboard (Restaurant Owners/Managers)
- **Restaurant Management**: Multi-location support with individual branding
- **Menu Builder**:
  - Categories and subcategories
  - Dishes with multi-language support
  - Price variations and modifiers
  - Allergens and dietary information
  - Nutritional data
- **QR Code Generator**:
  - Generate QR codes for tables, zones, or general use
  - Customizable design (colors, logo, style)
  - Bulk generation for multiple tables
  - Analytics tracking
- **White-label Branding**:
  - Custom domains
  - Brand colors and fonts
  - Logo and cover images
- **Team Management**: Role-based access control (Owner, Admin, Manager, Editor, Viewer)
- **Analytics**: Menu views, dish popularity, QR scans, user behavior

### Guest Interface (Public Menu)
- **Mobile-First Design**: Optimized for smartphone viewing
- **QR Code Access**: Instant menu access via QR scan
- **Multi-language Support**: Switch between available languages
- **Search & Filters**: Find dishes by name, dietary preferences, allergens, price
- **Dish Details**: Full information including photos, ingredients, nutrition
- **PWA Support**: Install as app, offline mode

## 🛠 Tech Stack

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Web framework
- **MongoDB** + **Mongoose** - Database and ODM
- **Redis** - Caching and sessions
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Cloudinary** - Image storage
- **QRCode** - QR code generation
- **Nodemailer** - Email notifications

### Frontend
- **Vue 3** + **TypeScript** + **Composition API**
- **Vite** - Build tool
- **Vue Router** - Routing
- **Pinia** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Chart.js** - Analytics charts
- **VueUse** - Composition utilities

### DevOps
- **Docker** + **Docker Compose**
- **Nginx** - Reverse proxy
- **GitHub Actions** - CI/CD (configured separately)

## 📦 Project Structure

```
/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Vue 3 frontend
│   ├── src/
│   │   ├── admin/         # Platform admin module
│   │   ├── dashboard/     # Restaurant dashboard
│   │   ├── guest/         # Public menu interface
│   │   ├── shared/        # Shared components
│   │   ├── router/        # Vue Router config
│   │   ├── store/         # Pinia stores
│   │   ├── api/           # API client
│   │   └── utils/         # Utilities
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml      # Docker orchestration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ and npm
- MongoDB 7.0+
- Redis 7+
- Docker and Docker Compose (optional but recommended)

### Option 1: Docker (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd flutterdummy
```

2. **Start services with Docker Compose**
```bash
docker-compose up -d
```

This will start:
- MongoDB (port 27017)
- Redis (port 6379)
- Backend API (port 5000)
- Frontend (port 3000)

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

### Option 2: Manual Setup

1. **Install dependencies**

Backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

Frontend:
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
```

2. **Start MongoDB and Redis**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0
docker run -d -p 6379:6379 --name redis redis:7-alpine

# Or install locally
```

3. **Run backend**
```bash
cd backend
npm run dev
```

4. **Run frontend** (in another terminal)
```bash
cd frontend
npm run dev
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant-menu-platform
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
# ... see .env.example for full list
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_FRONTEND_URL=http://localhost:3000
```

## 🧪 API Documentation

### Authentication
```
POST   /api/v1/auth/register    - Register new tenant
POST   /api/v1/auth/login       - Login
GET    /api/v1/auth/me          - Get current user
PUT    /api/v1/auth/profile     - Update profile
```

### Tenants (Super Admin)
```
GET    /api/v1/tenants          - List all tenants
GET    /api/v1/tenants/:id      - Get tenant details
PUT    /api/v1/tenants/:id      - Update tenant
POST   /api/v1/tenants/:id/suspend - Suspend tenant
DELETE /api/v1/tenants/:id      - Delete tenant
GET    /api/v1/tenants/stats    - Platform stats
```

### Restaurants
```
POST   /api/v1/restaurants      - Create restaurant
GET    /api/v1/restaurants      - List restaurants
GET    /api/v1/restaurants/:id  - Get restaurant
PUT    /api/v1/restaurants/:id  - Update restaurant
DELETE /api/v1/restaurants/:id  - Delete restaurant
```

### Menu (Categories & Dishes)
```
POST   /api/v1/menu/categories  - Create category
GET    /api/v1/menu/restaurants/:restaurantId/categories
PUT    /api/v1/menu/categories/:id
DELETE /api/v1/menu/categories/:id

POST   /api/v1/menu/dishes      - Create dish
GET    /api/v1/menu/restaurants/:restaurantId/dishes
GET    /api/v1/menu/dishes/:id
PUT    /api/v1/menu/dishes/:id
DELETE /api/v1/menu/dishes/:id
POST   /api/v1/menu/dishes/bulk-update
```

### QR Codes
```
POST   /api/v1/qr               - Create QR code
POST   /api/v1/qr/bulk          - Bulk create QR codes
GET    /api/v1/qr/restaurants/:restaurantId
GET    /api/v1/qr/:id/image     - Generate QR image
GET    /api/v1/qr/restaurants/:restaurantId/analytics
```

### Public API (No Auth Required)
```
GET    /api/v1/public/:subdomain/menu
GET    /api/v1/public/:subdomain/dishes/:dishId
GET    /api/v1/public/:subdomain/search
POST   /api/v1/public/qr/:code/scan
```

## 👥 User Roles & Permissions

| Role | Description | Permissions |
|------|-------------|-------------|
| **super_admin** | Platform administrator | Full access to all tenants and platform settings |
| **owner** | Restaurant owner | Full access to tenant resources, billing |
| **admin** | Restaurant admin | Manage restaurant, menu, users (no billing) |
| **manager** | Restaurant manager | Manage menu, availability, QR codes |
| **editor** | Content editor | Create/edit dishes (approval required) |
| **viewer** | Read-only | View menu and analytics |
| **waiter** | Staff member | View menu, handle orders (future) |

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Tenant data isolation
- Rate limiting
- Helmet.js security headers
- CORS protection
- Input validation with Joi
- XSS and SQL injection prevention

## 📈 Scaling & Performance

- MongoDB indexes for optimized queries
- Redis caching for frequently accessed data
- Image optimization and CDN (Cloudinary)
- Lazy loading and code splitting (frontend)
- Gzip compression
- Service Worker for offline support (PWA)

## 🎨 Customization

### White-label Branding
Each tenant can customize:
- Logo and cover images
- Primary and secondary colors
- Font families
- Custom domain
- Menu layout and styles

### Multi-language Support
- Dish names and descriptions in multiple languages
- Category translations
- UI language switching
- Fallback to default language

## 📊 Analytics Tracked

- QR code scans (by table, time, location)
- Menu views
- Dish views and popularity
- Search queries
- User engagement metrics
- Session duration
- Device types

## 🚧 Roadmap (Future Features)

- [ ] Online ordering integration
- [ ] Payment processing for orders
- [ ] Table reservation system
- [ ] Customer reviews and ratings
- [ ] Email marketing campaigns
- [ ] Advanced analytics with AI insights
- [ ] Mobile apps (iOS/Android)
- [ ] Kitchen Display System (KDS)
- [ ] Integration with POS systems (iiko, Poster, etc.)
- [ ] Multi-currency support
- [ ] Inventory management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support, email support@menuplatform.com or open an issue in the repository.

---

**Built with ❤️ for the restaurant industry**
