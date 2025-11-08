import { Router } from 'express';
import * as qrController from '../controllers/qrController';
import { authenticate, authorize, checkTenantAccess } from '../middleware/auth';
import { UserRole } from '../types';

const router = Router();

router.use(authenticate);
router.use(checkTenantAccess);

router.post('/', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), qrController.createQRCode);
router.post('/bulk', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), qrController.bulkCreateQRCodes);
router.get('/restaurants/:restaurantId', qrController.getQRCodes);
router.get('/:id/image', qrController.generateQRCodeImage);
router.get('/restaurants/:restaurantId/analytics', qrController.getQRAnalytics);
router.put('/:id', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), qrController.updateQRCode);
router.delete('/:id', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), qrController.deleteQRCode);

export default router;
