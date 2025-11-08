import mongoose, { Schema } from 'mongoose';
import { IAnalyticsEvent } from '../types';

const analyticsEventSchema = new Schema<IAnalyticsEvent>(
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
    eventType: {
      type: String,
      enum: ['qr_scan', 'menu_view', 'dish_view', 'search', 'filter_applied'],
      required: true,
      index: true
    },
    metadata: {
      qrCodeId: { type: String },
      tableNumber: { type: Number },
      dishId: { type: String },
      categoryId: { type: String },
      searchQuery: { type: String },
      filters: { type: Schema.Types.Mixed },
      userAgent: { type: String },
      ipAddress: { type: String },
      sessionId: { type: String, index: true }
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'hours'
    }
  }
);

// Indexes
analyticsEventSchema.index({ tenantId: 1, timestamp: -1 });
analyticsEventSchema.index({ restaurantId: 1, eventType: 1, timestamp: -1 });

export const AnalyticsEvent = mongoose.model<IAnalyticsEvent>('AnalyticsEvent', analyticsEventSchema);
