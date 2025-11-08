import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';
import { Category } from '../models/Category';
import { Dish } from '../models/Dish';
import { QRCode } from '../models/QRCode';
import { AnalyticsEvent } from '../models/AnalyticsEvent';
import { Tenant } from '../models/Tenant';
import { AppError } from '../middleware/errorHandler';
import { DishStatus } from '../types';

export const getMenuBySubdomain = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subdomain } = req.params;
    const { lang = 'en' } = req.query;

    // Find tenant by subdomain
    const tenant = await Tenant.findOne({ subdomain, status: 'active' });
    if (!tenant) {
      throw new AppError('Restaurant not found', 404);
    }

    // Get active restaurant for this tenant
    const restaurant = await Restaurant.findOne({
      tenantId: tenant._id,
      isActive: true
    });

    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }

    // Get visible categories
    const categories = await Category.find({
      restaurantId: restaurant._id,
      isVisible: true
    }).sort({ order: 1 });

    // Get available dishes
    const dishes = await Dish.find({
      restaurantId: restaurant._id,
      status: DishStatus.AVAILABLE
    }).sort({ position: 1 });

    // Track menu view event
    await AnalyticsEvent.create({
      tenantId: tenant._id,
      restaurantId: restaurant._id,
      eventType: 'menu_view',
      metadata: {
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        sessionId: req.sessionID
      }
    });

    res.json({
      restaurant: {
        name: restaurant.name,
        description: restaurant.description,
        logo: restaurant.logo,
        coverImage: restaurant.coverImage,
        contact: restaurant.contact,
        workingHours: restaurant.workingHours,
        branding: restaurant.branding,
        address: restaurant.address
      },
      categories: categories.map((cat) => ({
        id: cat._id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        order: cat.order
      })),
      dishes: dishes.map((dish) => ({
        id: dish._id,
        categoryId: dish.categoryId,
        name: dish.name,
        description: dish.description,
        shortDescription: dish.shortDescription,
        price: dish.price,
        oldPrice: dish.oldPrice,
        currency: dish.currency,
        unit: dish.unit,
        images: dish.images,
        allergens: dish.allergens,
        dietary: dish.dietary,
        nutrition: dish.nutrition,
        tags: dish.tags,
        spicyLevel: dish.spicyLevel,
        preparationTime: dish.preparationTime,
        variations: dish.variations,
        modifierGroups: dish.modifierGroups
      }))
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch menu', 500);
  }
};

export const getDishDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subdomain, dishId } = req.params;

    const tenant = await Tenant.findOne({ subdomain, status: 'active' });
    if (!tenant) {
      throw new AppError('Restaurant not found', 404);
    }

    const dish = await Dish.findOne({
      _id: dishId,
      tenantId: tenant._id
    });

    if (!dish) {
      throw new AppError('Dish not found', 404);
    }

    // Increment view count
    dish.viewCount += 1;
    await dish.save();

    // Track dish view event
    await AnalyticsEvent.create({
      tenantId: tenant._id,
      restaurantId: dish.restaurantId,
      eventType: 'dish_view',
      metadata: {
        dishId: dish._id.toString(),
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        sessionId: req.sessionID
      }
    });

    res.json({ dish });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch dish', 500);
  }
};

export const searchDishes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subdomain } = req.params;
    const { q, dietary, allergens, priceMin, priceMax, tags } = req.query;

    const tenant = await Tenant.findOne({ subdomain, status: 'active' });
    if (!tenant) {
      throw new AppError('Restaurant not found', 404);
    }

    const restaurant = await Restaurant.findOne({
      tenantId: tenant._id,
      isActive: true
    });

    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }

    const query: any = {
      restaurantId: restaurant._id,
      status: DishStatus.AVAILABLE
    };

    // Text search
    if (q) {
      query.$or = [
        { 'name.en': { $regex: q, $options: 'i' } },
        { 'description.en': { $regex: q, $options: 'i' } },
        { 'ingredients.en': { $regex: q, $options: 'i' } }
      ];
    }

    // Dietary filter
    if (dietary) {
      const dietaryArray = (dietary as string).split(',');
      query.dietary = { $in: dietaryArray };
    }

    // Allergen exclusion
    if (allergens) {
      const allergenArray = (allergens as string).split(',');
      query.allergens = { $nin: allergenArray };
    }

    // Price range
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Tags filter
    if (tags) {
      const tagArray = (tags as string).split(',');
      query.tags = { $in: tagArray };
    }

    const dishes = await Dish.find(query).limit(50);

    // Track search event
    await AnalyticsEvent.create({
      tenantId: tenant._id,
      restaurantId: restaurant._id,
      eventType: 'search',
      metadata: {
        searchQuery: q as string,
        filters: { dietary, allergens, priceMin, priceMax, tags },
        resultCount: dishes.length,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        sessionId: req.sessionID
      }
    });

    res.json({
      results: dishes,
      count: dishes.length
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Search failed', 500);
  }
};

export const trackQRScan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.params;

    const qrCode = await QRCode.findOne({ code, isActive: true });

    if (!qrCode) {
      throw new AppError('QR code not found', 404);
    }

    // Update scan count
    qrCode.scanCount += 1;
    qrCode.lastScannedAt = new Date();
    await qrCode.save();

    // Track QR scan event
    await AnalyticsEvent.create({
      tenantId: qrCode.tenantId,
      restaurantId: qrCode.restaurantId,
      eventType: 'qr_scan',
      metadata: {
        qrCodeId: qrCode._id.toString(),
        tableNumber: qrCode.tableNumber,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip
      }
    });

    res.json({
      success: true,
      redirectUrl: qrCode.url
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to track QR scan', 500);
  }
};
