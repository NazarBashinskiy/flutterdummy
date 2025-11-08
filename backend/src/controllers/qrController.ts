import { Response } from 'express';
import QRCodeGenerator from 'qrcode';
import { QRCode } from '../models/QRCode';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export const createQRCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId, type, tableNumber, zone, design, expiresAt } = req.body;

    const code = uuidv4();
    let url = `${FRONTEND_URL}/menu/${restaurantId}`;

    if (type === 'table' && tableNumber) {
      url += `?table=${tableNumber}`;
    } else if (type === 'zone' && zone) {
      url += `?zone=${zone}`;
    }

    const qrCode = await QRCode.create({
      tenantId: req.user?.tenantId,
      restaurantId,
      type,
      tableNumber,
      zone,
      code,
      url,
      design: design || {
        color: '#000000',
        backgroundColor: '#ffffff',
        style: 'square'
      },
      expiresAt
    });

    res.status(201).json({
      message: 'QR code created successfully',
      qrCode
    });
  } catch (error) {
    throw new AppError('Failed to create QR code', 500);
  }
};

export const bulkCreateQRCodes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId, startTable, endTable, design } = req.body;

    const qrCodes = [];

    for (let tableNum = startTable; tableNum <= endTable; tableNum++) {
      const code = uuidv4();
      const url = `${FRONTEND_URL}/menu/${restaurantId}?table=${tableNum}`;

      qrCodes.push({
        tenantId: req.user?.tenantId,
        restaurantId,
        type: 'table',
        tableNumber: tableNum,
        code,
        url,
        design: design || {
          color: '#000000',
          backgroundColor: '#ffffff',
          style: 'square'
        }
      });
    }

    const created = await QRCode.insertMany(qrCodes);

    res.status(201).json({
      message: `Created ${created.length} QR codes successfully`,
      qrCodes: created
    });
  } catch (error) {
    throw new AppError('Failed to create QR codes in bulk', 500);
  }
};

export const getQRCodes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId } = req.params;
    const { type, isActive } = req.query;

    const query: any = {
      restaurantId,
      tenantId: req.user?.tenantId
    };

    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const qrCodes = await QRCode.find(query).sort({ tableNumber: 1, createdAt: -1 });

    res.json({ qrCodes });
  } catch (error) {
    throw new AppError('Failed to fetch QR codes', 500);
  }
};

export const generateQRCodeImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { size = 300 } = req.query;

    const qrCode = await QRCode.findOne({
      _id: id,
      tenantId: req.user?.tenantId
    });

    if (!qrCode) {
      throw new AppError('QR code not found', 404);
    }

    const qrImage = await QRCodeGenerator.toDataURL(qrCode.url, {
      width: Number(size),
      margin: 2,
      color: {
        dark: qrCode.design.color,
        light: qrCode.design.backgroundColor
      }
    });

    res.json({
      image: qrImage,
      url: qrCode.url
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to generate QR code image', 500);
  }
};

export const updateQRCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const qrCode = await QRCode.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user?.tenantId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!qrCode) {
      throw new AppError('QR code not found', 404);
    }

    res.json({
      message: 'QR code updated successfully',
      qrCode
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update QR code', 500);
  }
};

export const deleteQRCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const qrCode = await QRCode.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user?.tenantId
    });

    if (!qrCode) {
      throw new AppError('QR code not found', 404);
    }

    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete QR code', 500);
  }
};

export const getQRAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId } = req.params;

    const qrCodes = await QRCode.find({
      restaurantId,
      tenantId: req.user?.tenantId
    }).sort({ scanCount: -1 });

    const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scanCount, 0);

    res.json({
      totalQRCodes: qrCodes.length,
      totalScans,
      topScanned: qrCodes.slice(0, 10),
      qrCodes: qrCodes.map((qr) => ({
        id: qr._id,
        type: qr.type,
        tableNumber: qr.tableNumber,
        scanCount: qr.scanCount,
        lastScannedAt: qr.lastScannedAt
      }))
    });
  } catch (error) {
    throw new AppError('Failed to fetch QR analytics', 500);
  }
};
