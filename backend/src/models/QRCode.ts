import mongoose, { Schema } from 'mongoose';
import { IQRCode } from '../types';
import { v4 as uuidv4 } from 'uuid';

const qrCodeSchema = new Schema<IQRCode>(
  {
    tenantId: {
      type: String,
      required: true,
      ref: 'Tenant',
      index: true
    },
    restaurantId: {
      type: String,
      required: true,
      ref: 'Restaurant',
      index: true
    },
    type: {
      type: String,
      enum: ['general', 'table', 'zone', 'temporary'],
      required: true
    },
    tableNumber: {
      type: Number
    },
    zone: {
      type: String
    },
    code: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4()
    },
    url: {
      type: String,
      required: true
    },
    design: {
      color: { type: String, default: '#000000' },
      backgroundColor: { type: String, default: '#ffffff' },
      logo: { type: String },
      style: { type: String, default: 'square' }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    scanCount: {
      type: Number,
      default: 0
    },
    lastScannedAt: {
      type: Date
    },
    expiresAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Indexes
qrCodeSchema.index({ tenantId: 1, restaurantId: 1, type: 1 });
qrCodeSchema.index({ code: 1 }, { unique: true });
qrCodeSchema.index({ isActive: 1, expiresAt: 1 });

export const QRCode = mongoose.model<IQRCode>('QRCode', qrCodeSchema);
