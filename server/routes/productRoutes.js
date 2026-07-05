import express from 'express';
import {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, isAdmin, upload.array('images', 4), createProduct);
router.put('/:id', protect, isAdmin, upload.array('images', 4), updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

export default router;