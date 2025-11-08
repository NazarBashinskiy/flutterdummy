import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types';

const categorySchema = new Schema<ICategory>(
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
    name: {
      type: Map,
      of: String,
      required: true
    },
    description: {
      type: Map,
      of: String
    },
    icon: {
      type: String
    },
    order: {
      type: Number,
      default: 0
    },
    parentId: {
      type: String,
      ref: 'Category'
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    availability: {
      type: {
        type: String,
        enum: ['always', 'schedule'],
        default: 'always'
      },
      schedule: {
        days: [{ type: Number, min: 0, max: 6 }],
        startTime: { type: String },
        endTime: { type: String }
      }
    }
  },
  {
    timestamps: true
  }
);

// Indexes
categorySchema.index({ tenantId: 1, restaurantId: 1, order: 1 });
categorySchema.index({ restaurantId: 1, isVisible: 1 });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
