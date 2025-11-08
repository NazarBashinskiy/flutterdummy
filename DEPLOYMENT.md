# Deployment Guide

## Development Environment

### Quick Start with Docker

1. **Prerequisites**
   - Docker and Docker Compose installed
   - 8GB RAM minimum
   - 10GB free disk space

2. **Start all services**
```bash
docker-compose up -d
```

3. **Check service health**
```bash
docker-compose ps
docker-compose logs -f backend
docker-compose logs -f frontend
```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://admin:password123@localhost:27017
   - Redis: redis://localhost:6379

5. **Stop services**
```bash
docker-compose down
```

### Manual Development Setup

#### Backend

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env file with your settings
```

3. **Start MongoDB and Redis**
```bash
# MongoDB
docker run -d -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  --name mongodb mongo:7.0

# Redis
docker run -d -p 6379:6379 --name redis redis:7-alpine
```

4. **Run backend in development mode**
```bash
npm run dev
```

#### Frontend

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Ensure VITE_API_URL points to your backend
```

3. **Run frontend in development mode**
```bash
npm run dev
```

## Production Deployment

### Option 1: Docker Compose (Simple)

1. **Update docker-compose.yml for production**
```yaml
services:
  backend:
    environment:
      NODE_ENV: production
      MONGODB_URI: <production-mongodb-uri>
      JWT_SECRET: <strong-secret-key>
      # ... other production env vars

  frontend:
    environment:
      VITE_API_URL: https://api.yourdomain.com/api/v1
```

2. **Build and start**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Separate Deployments

#### Backend Deployment (Node.js)

**Platforms:** Heroku, Railway, Render, AWS EC2, DigitalOcean

1. **Build the backend**
```bash
cd backend
npm run build
```

2. **Set environment variables** (on your platform)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
REDIS_HOST=your-redis-host
JWT_SECRET=your-production-secret
CORS_ORIGIN=https://yourdomain.com
# ... all other env vars from .env.example
```

3. **Start the server**
```bash
npm start
```

#### Frontend Deployment (Vue 3)

**Platforms:** Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront

1. **Build the frontend**
```bash
cd frontend
npm run build
```

2. **Configure environment** (on your platform)
```
VITE_API_URL=https://api.yourdomain.com/api/v1
VITE_FRONTEND_URL=https://yourdomain.com
```

3. **Deploy dist folder**
   - Vercel: `vercel --prod`
   - Netlify: `netlify deploy --prod --dir=dist`
   - Other: Upload `dist/` contents to your hosting

#### Database Setup (MongoDB)

**Options:**
- MongoDB Atlas (Recommended for easy setup)
- Self-hosted MongoDB on VPS
- AWS DocumentDB
- DigitalOcean Managed MongoDB

**MongoDB Atlas Setup:**
1. Create account at https://www.mongodb.com/atlas
2. Create a cluster (free tier available)
3. Configure network access (whitelist IPs)
4. Create database user
5. Get connection string
6. Update `MONGODB_URI` in backend environment

#### Redis Setup

**Options:**
- Redis Cloud (https://redis.com/try-free/)
- Upstash (https://upstash.com/)
- Self-hosted Redis
- AWS ElastiCache

### Option 3: Kubernetes

1. **Create Kubernetes manifests**
```bash
# See k8s/ directory (to be created)
kubectl apply -f k8s/
```

2. **Configure ingress**
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: restaurant-menu-platform
spec:
  rules:
  - host: yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend
            port:
              number: 5000
```

## Environment-Specific Configuration

### Development
- Debug mode enabled
- Detailed error messages
- CORS allows localhost
- Rate limiting disabled/relaxed

### Staging
- Similar to production
- Test payment gateway (Stripe test mode)
- Separate database
- Lower rate limits

### Production
- Strict error handling
- Production database
- Real payment gateway
- Full security measures
- Rate limiting enabled
- Logging to external service

## Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secrets (64+ characters)
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database authentication
- [ ] Use environment variables (never hardcode secrets)
- [ ] Regular security updates
- [ ] Backup strategy implemented
- [ ] Monitoring and alerting configured

## Performance Optimization

### Backend
- [ ] Enable Redis caching
- [ ] Add database indexes
- [ ] Use compression middleware
- [ ] Configure connection pooling
- [ ] Implement CDN for static assets

### Frontend
- [ ] Enable gzip compression
- [ ] Use CDN for assets
- [ ] Lazy load routes
- [ ] Optimize images (WebP)
- [ ] Enable service worker (PWA)

## Monitoring & Logging

### Recommended Tools
- **Application Monitoring**: New Relic, DataDog, Sentry
- **Logging**: Loggly, Papertrail, CloudWatch
- **Uptime Monitoring**: Pingdom, UptimeRobot
- **Error Tracking**: Sentry, Rollbar

### Setup Example (Sentry)
```javascript
// backend/src/index.ts
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
})
```

## Backup Strategy

### Database Backups
```bash
# MongoDB backup
mongodump --uri="<mongodb-uri>" --out=/backups/$(date +%Y%m%d)

# Restore
mongorestore --uri="<mongodb-uri>" /backups/20240101
```

### Automated Backups
- MongoDB Atlas: Automated daily backups
- Self-hosted: Cron job + S3/cloud storage
```bash
# Crontab example (daily at 2 AM)
0 2 * * * /scripts/backup-mongodb.sh
```

## Scaling

### Horizontal Scaling
- Use load balancer (nginx, AWS ALB)
- Deploy multiple backend instances
- Use Redis for session storage
- Implement queue system (Bull, RabbitMQ)

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Add database read replicas

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Common issues:
# 1. MongoDB not connected - check MONGODB_URI
# 2. Port already in use - change PORT in .env
# 3. Missing dependencies - run npm install
```

### Frontend build fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Database connection issues
```bash
# Test MongoDB connection
mongosh "<mongodb-uri>"

# Check Redis
redis-cli -h <redis-host> -p <redis-port> ping
```

## CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build and deploy backend
        run: |
          cd backend
          npm install
          npm run build
          # Deploy to your platform

      - name: Build and deploy frontend
        run: |
          cd frontend
          npm install
          npm run build
          # Deploy to your platform
```

## Post-Deployment Checklist

- [ ] All services running
- [ ] Database connected
- [ ] Redis connected
- [ ] Frontend loads correctly
- [ ] API endpoints responding
- [ ] Authentication working
- [ ] Email sending working
- [ ] Payment gateway tested
- [ ] QR codes generating
- [ ] Image uploads working
- [ ] SSL certificate valid
- [ ] Monitoring configured
- [ ] Backups scheduled
- [ ] Error tracking active

## Support

For deployment assistance:
- Documentation: See README.md
- Issues: GitHub Issues
- Email: support@menuplatform.com
