import mongoose, { Schema } from 'mongoose';
import { ITenant, TenantStatus, SubscriptionPlan } from '../types';
import { SUBSCRIPTION_LIMITS, TRIAL_PERIOD_DAYS } from '../config/constants';

const tenantSchema = new Schema<ITenant>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
      index: true
    },
    customDomain: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true
    },
    ownerId: {
      type: String,
      required: true,
      ref: 'User'
    },
    status: {
      type: String,
      enum: Object.values(TenantStatus),
      default: TenantStatus.TRIAL
    },
    plan: {
      type: String,
      enum: Object.values(SubscriptionPlan),
      default: SubscriptionPlan.FREE
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    trialEndsAt: {
      type: Date
    },
    subscriptionEndsAt: {
      type: Date
    },
    settings: {
      maxLocations: { type: Number, default: 1 },
      maxMenuItems: { type: Number, default: 50 },
      maxUsers: { type: Number, default: 2 },
      storageGB: { type: Number, default: 1 },
      qrScansPerMonth: { type: Number, default: 1000 },
      apiCallsPerMonth: { type: Number, default: 5000 }
    },
    usage: {
      locations: { type: Number, default: 0 },
      menuItems: { type: Number, default: 0 },
      users: { type: Number, default: 0 },
      storageUsedGB: { type: Number, default: 0 },
      qrScansThisMonth: { type: Number, default: 0 },
      apiCallsThisMonth: { type: Number, default: 0 }
    },
    features: {
      customDomain: { type: Boolean, default: false },
      advancedAnalytics: { type: Boolean, default: false },
      apiAccess: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false },
      whiteLabelBranding: { type: Boolean, default: false },
      multiLanguage: { type: Boolean, default: false },
      integrations: { type: Boolean, default: false },
      customCSS: { type: Boolean, default: false }
    },
    branding: {
      logo: { type: String },
      primaryColor: { type: String, default: '#1976d2' },
      secondaryColor: { type: String, default: '#424242' },
      fontFamily: { type: String, default: 'Roboto' }
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to set trial end date and limits based on plan
tenantSchema.pre('save', function (next) {
  if (this.isNew) {
    // Set trial end date
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + TRIAL_PERIOD_DAYS);
    this.trialEndsAt = trialEnd;

    // Set limits based on plan
    const limits = SUBSCRIPTION_LIMITS[this.plan];
    this.settings = {
      maxLocations: limits.maxLocations,
      maxMenuItems: limits.maxMenuItems,
      maxUsers: limits.maxUsers,
      storageGB: limits.storageGB,
      qrScansPerMonth: limits.qrScansPerMonth,
      apiCallsPerMonth: limits.apiCallsPerMonth
    };
  }
  next();
});

// Indexes
tenantSchema.index({ status: 1, plan: 1 });
tenantSchema.index({ ownerId: 1 });

export const Tenant = mongoose.model<ITenant>('Tenant', tenantSchema);
