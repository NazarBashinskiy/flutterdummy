import mongoose, { Schema } from 'mongoose';
import { IRestaurant } from '../types';

const restaurantSchema = new Schema<IRestaurant>(
  {
    tenantId: {
      type: String,
      required: true,
      ref: 'Tenant',
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    type: {
      type: String,
      required: true
    },
    cuisine: [{
      type: String
    }],
    description: {
      type: String,
      required: true
    },
    logo: {
      type: String
    },
    coverImage: {
      type: String
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      postalCode: { type: String },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String },
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        tiktok: { type: String }
      }
    },
    workingHours: [{
      dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
      openTime: { type: String, required: true },
      closeTime: { type: String, required: true },
      isClosed: { type: Boolean, default: false }
    }],
    branding: {
      primaryColor: { type: String, default: '#1976d2' },
      secondaryColor: { type: String, default: '#424242' },
      backgroundColor: { type: String, default: '#ffffff' },
      fontFamily: { type: String, default: 'Roboto' },
      logoPosition: { type: String, enum: ['left', 'center', 'right'], default: 'center' }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes
restaurantSchema.index({ tenantId: 1, slug: 1 }, { unique: true });
restaurantSchema.index({ tenantId: 1, isActive: 1 });

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
