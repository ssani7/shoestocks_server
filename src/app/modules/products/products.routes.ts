import express from 'express';

import { ProductController } from './products.controller';

const router = express.Router();

router
  .get('/', ProductController.getAllProducts)
  .get('/search', ProductController.searchProduct)
  .get('/stock', ProductController.getStockInfo)
  .get('/low-stock', ProductController.getLowStockProducts)
  .post('/create-product', ProductController.createProduct);

export const ProductRouter = router;
