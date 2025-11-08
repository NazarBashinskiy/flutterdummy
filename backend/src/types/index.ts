import { Request } from 'express';
import { Document } from 'mongoose';

// ==================== USER ROLES ====================
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  OWNER = 'owner',
  ADMIN = 'admin',
  MANAGER = 'manager',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  WAITER = 'waiter'
}

export enum TenantStatus {
  ACTIVE = 'active',
  TRIAL = 'trial',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled'
}

export enum SubscriptionPlan {
  FREE = 'free',
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise'
}

// ==================== MENU TYPES ====================
export enum DishStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  HIDDEN = 'hidden',
  COMING_SOON = 'coming_soon',
  PRE_ORDER = 'pre_order'
}

export enum AllergenType {
  GLUTEN = 'gluten',
  DAIRY = 'dairy',
  EGGS = 'eggs',
  NUTS = 'nuts',
  PEANUTS = 'peanuts',
  SOY = 'soy',
  FISH = 'fish',
  SHELLFISH = 'shellfish',
  CELERY = 'celery',
  MUSTARD = 'mustard',
  SESAME = 'sesame',
  SULPHITES = 'sulphites',
  LUPIN = 'lupin',
  MOLLUSCS = 'molluscs'
}

export enum DietaryType {
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  GLUTEN_FREE = 'gluten_free',
  LACTOSE_FREE = 'lactose_free',
  HALAL = 'halal',
  KOSHER = 'kosher',
  LENT = 'lent',
  KETO = 'keto',
  PALEO = 'paleo',
  RAW_FOOD = 'raw_food'
}

// ==================== INTERFACES ====================
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ITenant extends Document {
  companyName: string;
  subdomain: string;
  customDomain?: string;
  ownerId: string;
  status: TenantStatus;
  plan: SubscriptionPlan;
  email: string;
  phone: string;
  country: string;
  city: string;
  trialEndsAt?: Date;
  subscriptionEndsAt?: Date;
  settings: {
    maxLocations: number;
    maxMenuItems: number;
    maxUsers: number;
    storageGB: number;
    qrScansPerMonth: number;
    apiCallsPerMonth: number;
  };
  usage: {
    locations: number;
    menuItems: number;
    users: number;
    storageUsedGB: number;
    qrScansThisMonth: number;
    apiCallsThisMonth: number;
  };
  features: {
    customDomain: boolean;
    advancedAnalytics: boolean;
    apiAccess: boolean;
    prioritySupport: boolean;
    whiteLabelBranding: boolean;
    multiLanguage: boolean;
    integrations: boolean;
    customCSS: boolean;
  };
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IRestaurant extends Document {
  tenantId: string;
  name: string;
  slug: string;
  type: string;
  cuisine: string[];
  description: string;
  logo?: string;
  coverImage?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    socialMedia: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      tiktok?: string;
    };
  };
  workingHours: Array<{
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }>;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontFamily: string;
    logoPosition: 'left' | 'center' | 'right';
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Document {
  tenantId: string;
  restaurantId: string;
  name: {
    [key: string]: string; // Multi-language support
  };
  description?: {
    [key: string]: string;
  };
  icon?: string;
  order: number;
  parentId?: string;
  isVisible: boolean;
  availability?: {
    type: 'always' | 'schedule';
    schedule?: {
      days: number[];
      startTime: string;
      endTime: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IDish extends Document {
  tenantId: string;
  restaurantId: string;
  categoryId: string;
  additionalCategories?: string[];
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  shortDescription?: {
    [key: string]: string;
  };
  ingredients?: {
    [key: string]: string[];
  };
  price: number;
  oldPrice?: number;
  currency: string;
  unit: string;
  variations?: Array<{
    name: string;
    price: number;
    isDefault: boolean;
  }>;
  modifierGroups?: Array<{
    id: string;
    name: string;
    type: 'single' | 'multiple';
    required: boolean;
    min?: number;
    max?: number;
    modifiers: Array<{
      id: string;
      name: string;
      price: number;
      isDefault?: boolean;
    }>;
  }>;
  images: Array<{
    url: string;
    isMain: boolean;
    order: number;
  }>;
  video?: string;
  allergens: AllergenType[];
  dietary: DietaryType[];
  nutrition?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber?: number;
    sugar?: number;
    salt?: number;
  };
  weight?: number;
  volume?: number;
  status: DishStatus;
  preparationTime?: {
    min: number;
    max: number;
  };
  tags: string[];
  spicyLevel?: number;
  position: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQRCode extends Document {
  tenantId: string;
  restaurantId: string;
  type: 'general' | 'table' | 'zone' | 'temporary';
  tableNumber?: number;
  zone?: string;
  code: string;
  url: string;
  design: {
    color: string;
    backgroundColor: string;
    logo?: string;
    style: string;
  };
  isActive: boolean;
  scanCount: number;
  lastScannedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnalyticsEvent extends Document {
  tenantId: string;
  restaurantId: string;
  eventType: 'qr_scan' | 'menu_view' | 'dish_view' | 'search' | 'filter_applied';
  metadata: {
    qrCodeId?: string;
    tableNumber?: number;
    dishId?: string;
    categoryId?: string;
    searchQuery?: string;
    filters?: any;
    userAgent?: string;
    ipAddress?: string;
    sessionId?: string;
  };
  timestamp: Date;
}

// ==================== REQUEST EXTENSIONS ====================
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    tenantId?: string;
  };
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterQuery {
  search?: string;
  status?: string;
  category?: string;
  [key: string]: any;
}
