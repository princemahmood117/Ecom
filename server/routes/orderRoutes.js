import express from 'express';
import {
  addToCart, getCart, confirmOrder, getMyOrders, cancelOrder,
  getAllOrders, updateOrderStatus, getAdminStats,
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/cart', protect, addToCart);
router.get('/cart', protect, getCart);
router.post('/confirm', protect, confirmOrder);
router.get('/my-orders', protect, getMyOrders);
router.delete('/:id', protect, cancelOrder);

router.get('/admin/all', protect, isAdmin, getAllOrders);
router.get('/admin/stats', protect, isAdmin, getAdminStats);
router.put('/admin/:id/status', protect, isAdmin, updateOrderStatus);

export default router;