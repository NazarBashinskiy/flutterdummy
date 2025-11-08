import { Response } from 'express';
import { Category } from '../models/Category';
import { Dish } from '../models/Dish';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';

// ==================== CATEGORIES ====================
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categoryData = {
      ...req.body,
      tenantId: req.user?.tenantId
    };

    const category = await Category.create(categoryData);

    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    throw new AppError('Failed to create category', 500);
  }
};

export const getCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId } = req.params;

    const categories = await Category.find({
      restaurantId,
      tenantId: req.user?.tenantId
    }).sort({ order: 1 });

    res.json({ categories });
  } catch (error) {
    throw new AppError('Failed to fetch categories', 500);
  }
};

export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user?.tenantId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    res.json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update category', 500);
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user?.tenantId
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    // Check if there are dishes in this category
    const dishCount = await Dish.countDocuments({ categoryId: req.params.id });
    if (dishCount > 0) {
      throw new AppError('Cannot delete category with dishes', 400);
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete category', 500);
  }
};

// ==================== DISHES ====================
export const createDish = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dishData = {
      ...req.body,
      tenantId: req.user?.tenantId
    };

    const dish = await Dish.create(dishData);

    res.status(201).json({
      message: 'Dish created successfully',
      dish
    });
  } catch (error) {
    throw new AppError('Failed to create dish', 500);
  }
};

export const getDishes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId } = req.params;
    const {
      categoryId,
      status,
      search,
      tags,
      page = 1,
      limit = 50,
      sortBy = 'position',
      order = 'asc'
    } = req.query;

    const query: any = {
      restaurantId,
      tenantId: req.user?.tenantId
    };

    if (categoryId) query.categoryId = categoryId;
    if (status) query.status = status;
    if (tags) {
      const tagArray = (tags as string).split(',');
      query.tags = { $in: tagArray };
    }
    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = order === 'asc' ? 1 : -1;

    const [dishes, total] = await Promise.all([
      Dish.find(query)
        .sort({ [sortBy as string]: sortOrder })
        .skip(skip)
        .limit(Number(limit)),
      Dish.countDocuments(query)
    ]);

    res.json({
      dishes,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    throw new AppError('Failed to fetch dishes', 500);
  }
};

export const getDishById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dish = await Dish.findOne({
      _id: req.params.id,
      tenantId: req.user?.tenantId
    });

    if (!dish) {
      throw new AppError('Dish not found', 404);
    }

    res.json({ dish });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch dish', 500);
  }
};

export const updateDish = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dish = await Dish.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user?.tenantId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!dish) {
      throw new AppError('Dish not found', 404);
    }

    res.json({
      message: 'Dish updated successfully',
      dish
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update dish', 500);
  }
};

export const deleteDish = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dish = await Dish.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user?.tenantId
    });

    if (!dish) {
      throw new AppError('Dish not found', 404);
    }

    res.json({ message: 'Dish deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete dish', 500);
  }
};

export const bulkUpdateDishes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { dishIds, updates } = req.body;

    const result = await Dish.updateMany(
      {
        _id: { $in: dishIds },
        tenantId: req.user?.tenantId
      },
      { $set: updates }
    );

    res.json({
      message: 'Dishes updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    throw new AppError('Failed to bulk update dishes', 500);
  }
};
