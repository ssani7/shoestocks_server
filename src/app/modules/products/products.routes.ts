import express from 'express';

import { ProductController } from './products.controller';

const router = express.Router();

router
  .get('/products', ProductController.getAllProducts)
  .get('/stock', ProductController.getStockInfo)
  .get('/low-stock', ProductController.getLowStockProducts)
  .post('/create-product', ProductController.createProduct);

export const ProductRouter = router;
