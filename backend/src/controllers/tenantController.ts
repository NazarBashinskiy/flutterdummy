import { Response } from 'express';
import { Tenant } from '../models/Tenant';
import { User } from '../models/User';
import { Restaurant } from '../models/Restaurant';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest, TenantStatus } from '../types';

export const getAllTenants = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      plan,
      search,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query: any = {};

    if (status) query.status = status;
    if (plan) query.plan = plan;
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subdomain: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = order === 'asc' ? 1 : -1;

    const [tenants, total] = await Promise.all([
      Tenant.find(query)
        .sort({ [sortBy as string]: sortOrder })
        .skip(skip)
        .limit(Number(limit)),
      Tenant.countDocuments(query)
    ]);

    res.json({
      tenants,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    throw new AppError('Failed to fetch tenants', 500);
  }
};

export const getTenantById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      throw new AppError('Tenant not found', 404);
    }

    const [owner, restaurantCount, userCount] = await Promise.all([
      User.findById(tenant.ownerId),
      Restaurant.countDocuments({ tenantId: tenant._id }),
      User.countDocuments({ tenantId: tenant._id })
    ]);

    res.json({
      tenant,
      owner: owner ? {
        id: owner._id,
        email: owner.email,
        firstName: owner.firstName,
        lastName: owner.lastName
      } : null,
      stats: {
        restaurantCount,
        userCount
      }
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch tenant', 500);
  }
};

export const updateTenant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    const allowedUpdates = [
      'companyName',
      'email',
      'phone',
      'country',
      'city',
      'customDomain',
      'status',
      'plan',
      'settings',
      'features',
      'branding'
    ];

    const actualUpdates: any = {};
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        actualUpdates[key] = updates[key];
      }
    });

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      actualUpdates,
      { new: true, runValidators: true }
    );

    if (!tenant) {
      throw new AppError('Tenant not found', 404);
    }

    res.json({
      message: 'Tenant updated successfully',
      tenant
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update tenant', 500);
  }
};

export const suspendTenant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { reason } = req.body;

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { status: TenantStatus.SUSPENDED },
      { new: true }
    );

    if (!tenant) {
      throw new AppError('Tenant not found', 404);
    }

    // TODO: Send notification email to tenant owner

    res.json({
      message: 'Tenant suspended successfully',
      tenant
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to suspend tenant', 500);
  }
};

export const deleteTenant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { status: TenantStatus.CANCELLED },
      { new: true }
    );

    if (!tenant) {
      throw new AppError('Tenant not found', 404);
    }

    // Soft delete - mark as cancelled
    // TODO: Schedule hard delete after 30 days

    res.json({
      message: 'Tenant marked for deletion',
      tenant
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete tenant', 500);
  }
};

export const getTenantStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [
      totalTenants,
      activeTenants,
      trialTenants,
      suspendedTenants,
      planDistribution
    ] = await Promise.all([
      Tenant.countDocuments(),
      Tenant.countDocuments({ status: TenantStatus.ACTIVE }),
      Tenant.countDocuments({ status: TenantStatus.TRIAL }),
      Tenant.countDocuments({ status: TenantStatus.SUSPENDED }),
      Tenant.aggregate([
        { $group: { _id: '$plan', count: { $sum: 1 } } }
      ])
    ]);

    res.json({
      total: totalTenants,
      active: activeTenants,
      trial: trialTenants,
      suspended: suspendedTenants,
      planDistribution: planDistribution.reduce((acc: any, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    });
  } catch (error) {
    throw new AppError('Failed to fetch tenant stats', 500);
  }
};
