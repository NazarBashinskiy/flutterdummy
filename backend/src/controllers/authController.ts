import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Tenant } from '../models/Tenant';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest, UserRole } from '../types';
import { TRIAL_PERIOD_DAYS } from '../config/constants';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

const generateToken = (userId: string): string => {
  // @ts-ignore
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      companyName,
      subdomain,
      phone,
      country,
      city,
      plan = 'free'
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    // Check if subdomain is taken
    const existingTenant = await Tenant.findOne({ subdomain });
    if (existingTenant) {
      throw new AppError('Subdomain already taken', 400);
    }

    // Create tenant
    const tenant = await Tenant.create({
      companyName,
      subdomain,
      email,
      phone,
      country,
      city,
      plan,
      ownerId: 'temp' // Will update after user creation
    });

    // Create owner user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: UserRole.OWNER,
      tenantId: tenant._id.toString(),
      phone
    });

    // Update tenant with actual owner ID
    tenant.ownerId = user._id.toString();
    await tenant.save();

    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      tenant: {
        id: tenant._id,
        companyName: tenant.companyName,
        subdomain: tenant.subdomain,
        status: tenant.status,
        plan: tenant.plan,
        trialEndsAt: tenant.trialEndsAt
      }
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Registration failed', 500);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id.toString());

    let tenant = null;
    if (user.tenantId) {
      tenant = await Tenant.findById(user.tenantId);
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenantId: user.tenantId
      },
      tenant: tenant ? {
        id: tenant._id,
        companyName: tenant.companyName,
        subdomain: tenant.subdomain,
        status: tenant.status,
        plan: tenant.plan
      } : null
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Login failed', 500);
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    let tenant = null;
    if (user.tenantId) {
      tenant = await Tenant.findById(user.tenantId);
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        tenantId: user.tenantId,
        lastLogin: user.lastLogin
      },
      tenant: tenant ? {
        id: tenant._id,
        companyName: tenant.companyName,
        subdomain: tenant.subdomain,
        customDomain: tenant.customDomain,
        status: tenant.status,
        plan: tenant.plan,
        settings: tenant.settings,
        usage: tenant.usage,
        features: tenant.features
      } : null
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get user', 500);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { firstName, lastName, phone },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      }
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update profile', 500);
  }
};
