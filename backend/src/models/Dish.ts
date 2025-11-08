import mongoose, { Schema } from 'mongoose';
import { IDish, DishStatus } from '../types';

const dishSchema = new Schema<IDish>(
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
    categoryId: {
      type: String,
      required: true,
      ref: 'Category',
      index: true
    },
    additionalCategories: [{
      type: String,
      ref: 'Category'
    }],
    name: {
      type: Map,
      of: String,
      required: true
    },
    description: {
      type: Map,
      of: String,
      required: true
    },
    shortDescription: {
      type: Map,
      of: String
    },
    ingredients: {
      type: Map,
      of: [String]
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    oldPrice: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      required: true,
      default: 'USD'
    },
    unit: {
      type: String,
      default: 'portion'
    },
    variations: [{
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      isDefault: { type: Boolean, default: false }
    }],
    modifierGroups: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, enum: ['single', 'multiple'], required: true },
      required: { type: Boolean, default: false },
      min: { type: Number, default: 0 },
      max: { type: Number },
      modifiers: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        isDefault: { type: Boolean, default: false }
      }]
    }],
    images: [{
      url: { type: String, required: true },
      isMain: { type: Boolean, default: false },
      order: { type: Number, default: 0 }
    }],
    video: {
      type: String
    },
    allergens: [{
      type: String
    }],
    dietary: [{
      type: String
    }],
    nutrition: {
      calories: { type: Number },
      protein: { type: Number },
      fat: { type: Number },
      carbs: { type: Number },
      fiber: { type: Number },
      sugar: { type: Number },
      salt: { type: Number }
    },
    weight: {
      type: Number
    },
    volume: {
      type: Number
    },
    status: {
      type: String,
      enum: Object.values(DishStatus),
      default: DishStatus.AVAILABLE
    },
    preparationTime: {
      min: { type: Number },
      max: { type: Number }
    },
    tags: [{
      type: String,
      index: true
    }],
    spicyLevel: {
      type: Number,
      min: 0,
      max: 5
    },
    position: {
      type: Number,
      default: 0
    },
    viewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Indexes
dishSchema.index({ tenantId: 1, restaurantId: 1, categoryId: 1 });
dishSchema.index({ restaurantId: 1, status: 1 });
dishSchema.index({ 'name.en': 'text', 'description.en': 'text' }); // Text search

export const Dish = mongoose.model<IDish>('Dish', dishSchema);
