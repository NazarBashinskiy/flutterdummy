export const SUBSCRIPTION_LIMITS = {
  free: {
    maxLocations: 1,
    maxMenuItems: 50,
    maxUsers: 2,
    storageGB: 1,
    qrScansPerMonth: 1000,
    apiCallsPerMonth: 5000
  },
  starter: {
    maxLocations: 3,
    maxMenuItems: 200,
    maxUsers: 5,
    storageGB: 5,
    qrScansPerMonth: 10000,
    apiCallsPerMonth: 50000
  },
  professional: {
    maxLocations: 10,
    maxMenuItems: 1000,
    maxUsers: 20,
    storageGB: 20,
    qrScansPerMonth: 50000,
    apiCallsPerMonth: 200000
  },
  enterprise: {
    maxLocations: -1, // unlimited
    maxMenuItems: -1,
    maxUsers: -1,
    storageGB: 100,
    qrScansPerMonth: -1,
    apiCallsPerMonth: -1
  }
};

export const SUBSCRIPTION_PRICES = {
  free: { monthly: 0, yearly: 0 },
  starter: { monthly: 29, yearly: 290 },
  professional: { monthly: 99, yearly: 990 },
  enterprise: { monthly: 299, yearly: 2990 }
};

export const TRIAL_PERIOD_DAYS = 14;

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const QR_CODE_EXPIRY_DAYS = 365; // 1 year for temporary QR codes

export const SUPPORTED_LANGUAGES = [
  'en', 'ru', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar'
];

export const DEFAULT_CURRENCY = 'USD';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
];

export const WORKING_DAYS = [
  { id: 0, name: 'Sunday' },
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' }
];
