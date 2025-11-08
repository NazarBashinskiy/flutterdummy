import { Response } from 'express';
import { Restaurant } from '../models/Restaurant';
import { Category } from '../models/Category';
import { Dish } from '../models/Dish';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';

export const createRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantData = {
      ...req.body,
      tenantId: req.user?.tenantId
    };

    const restaurant = await Restaurant.create(restaurantData);

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant
    });
  } catch (error) {
    throw new AppError('Failed to create restaurant', 500);
  }
};

export const getRestaurants = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tenantId = req.user?.tenantId;
    const { isActive } = req.query;

    const query: any = { tenantId };
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const restaurants = await Restaurant.find(query).sort({ createdAt: -1 });

    res.json({ restaurants });
  } catch (error) {
    throw new AppError('Failed to fetch restaurants', 500);
  }
};

export const getRestaurantById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      tenantId: req.user?.tenantId
    });

    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }

    res.json({ restaurant });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch restaurant', 500);
  }
};

export const updateRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user?.tenantId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }

    res.json({
      message: 'Restaurant updated successfully',
      restaurant
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update restaurant', 500);
  }
};

export const deleteRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user?.tenantId },
      { isActive: false },
      { new: true }
    );

    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }

    res.json({
      message: 'Restaurant deactivated successfully',
      restaurant
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete restaurant', 500);
  }
};
