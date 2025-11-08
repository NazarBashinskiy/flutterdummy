import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth.routes';
import tenantRoutes from './routes/tenant.routes';
import restaurantRoutes from './routes/restaurant.routes';
import menuRoutes from './routes/menu.routes';
import qrRoutes from './routes/qr.routes';
import publicRoutes from './routes/public.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const API_VERSION = process.env.API_VERSION || 'v1';

// ==================== MIDDLEWARE ====================
// Security
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

app.use(`/api/${API_VERSION}/`, limiter);

// ==================== ROUTES ====================
// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/tenants`, tenantRoutes);
app.use(`/api/${API_VERSION}/restaurants`, restaurantRoutes);
app.use(`/api/${API_VERSION}/menu`, menuRoutes);
app.use(`/api/${API_VERSION}/qr`, qrRoutes);
app.use(`/api/${API_VERSION}/public`, publicRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// ==================== START SERVER ====================
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Restaurant Menu Platform API Server                  ║
║                                                            ║
║   📍 Environment: ${process.env.NODE_ENV || 'development'}                              ║
║   🌐 Server running on: http://localhost:${PORT}           ║
║   📡 API Version: ${API_VERSION}                                      ║
║   💾 Database: Connected                                   ║
║                                                            ║
║   📖 API Documentation:                                    ║
║      http://localhost:${PORT}/api/${API_VERSION}                       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('❌ UNCAUGHT EXCEPTION! Shutting down...');
      console.error(error.name, error.message);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (error: Error) => {
      console.error('❌ UNHANDLED REJECTION! Shutting down...');
      console.error(error.name, error.message);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
