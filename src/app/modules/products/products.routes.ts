import express from 'express';

import { ProductController } from './products.controller';

const router = express.Router();

router
  .get('/', ProductController.getAllProducts)
  .get('/search', ProductController.searchProduct)
  .get('/filter', ProductController.getProductsByFilter)
  .get('/stock', ProductController.getStockInfo)
  .get('/low-stock', ProductController.getLowStockProducts)
  .post('/create-product', ProductController.createProduct)
  .delete('/:id', ProductController.deleteProduct);

export const ProductRouter = router;
