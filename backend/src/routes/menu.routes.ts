import { Router } from 'express';
import * as menuController from '../controllers/menuController';
import { authenticate, authorize, checkTenantAccess } from '../middleware/auth';
import { UserRole } from '../types';

const router = Router();

router.use(authenticate);
router.use(checkTenantAccess);

// Categories
router.post('/categories', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), menuController.createCategory);
router.get('/restaurants/:restaurantId/categories', menuController.getCategories);
router.put('/categories/:id', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), menuController.updateCategory);
router.delete('/categories/:id', authorize(UserRole.OWNER, UserRole.ADMIN), menuController.deleteCategory);

// Dishes
router.post('/dishes', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR), menuController.createDish);
router.get('/restaurants/:restaurantId/dishes', menuController.getDishes);
router.get('/dishes/:id', menuController.getDishById);
router.put('/dishes/:id', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR), menuController.updateDish);
router.delete('/dishes/:id', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), menuController.deleteDish);
router.post('/dishes/bulk-update', authorize(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), menuController.bulkUpdateDishes);

export default router;
