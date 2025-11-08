import { Router } from 'express';
import * as restaurantController from '../controllers/restaurantController';
import { authenticate, authorize, checkTenantAccess } from '../middleware/auth';
import { UserRole } from '../types';

const router = Router();

router.use(authenticate);
router.use(checkTenantAccess);

router.post('/', authorize(UserRole.OWNER, UserRole.ADMIN), restaurantController.createRestaurant);
router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.put('/:id', authorize(UserRole.OWNER, UserRole.ADMIN), restaurantController.updateRestaurant);
router.delete('/:id', authorize(UserRole.OWNER, UserRole.ADMIN), restaurantController.deleteRestaurant);

export default router;
