import { Router } from 'express';
import * as publicController from '../controllers/publicController';

const router = Router();

// Public routes - no authentication required
router.get('/:subdomain/menu', publicController.getMenuBySubdomain);
router.get('/:subdomain/dishes/:dishId', publicController.getDishDetails);
router.get('/:subdomain/search', publicController.searchDishes);
router.post('/qr/:code/scan', publicController.trackQRScan);

export default router;
