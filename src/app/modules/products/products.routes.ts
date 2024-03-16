import express from 'express';

import { superAdminVerify } from '../../middleware/checkSuperAdmin';
import { jwtVerify } from '../../middleware/jwtMiddleware';

import { ProductController } from './products.controller';

const router = express.Router();

router
  .get('/', ProductController.getAllProducts)
  .get('/search', ProductController.searchProduct)
  .get('/filter', ProductController.getProductsByFilter)
  .get('/stock', ProductController.getStockInfo)
  .get('/low-stock', ProductController.getLowStockProducts)
  .get('/:id', ProductController.getProductByID)
  .post('/create-product', superAdminVerify, ProductController.createProduct)
  .put('/:id', superAdminVerify, ProductController.updateProduct)
  .delete('/bulk', superAdminVerify, jwtVerify, ProductController.bulkDelete)
  .delete('/:id', superAdminVerify, jwtVerify, ProductController.deleteProduct);

export const ProductRouter = router;
