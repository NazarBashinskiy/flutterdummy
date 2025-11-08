import { Router } from 'express';
import * as tenantController from '../controllers/tenantController';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';

const router = Router();

// Super admin only routes
router.get('/', authenticate, authorize(UserRole.SUPER_ADMIN), tenantController.getAllTenants);
router.get('/stats', authenticate, authorize(UserRole.SUPER_ADMIN), tenantController.getTenantStats);
router.get('/:id', authenticate, authorize(UserRole.SUPER_ADMIN), tenantController.getTenantById);
router.put('/:id', authenticate, authorize(UserRole.SUPER_ADMIN), tenantController.updateTenant);
router.post('/:id/suspend', authenticate, authorize(UserRole.SUPER_ADMIN), tenantController.suspendTenant);
router.delete('/:id', authenticate, authorize(UserRole.SUPER_ADMIN), tenantController.deleteTenant);

export default router;
