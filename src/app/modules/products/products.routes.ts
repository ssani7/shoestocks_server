import express from 'express';

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
  .post('/create-product', jwtVerify, ProductController.createProduct)
  .put('/:id', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct);

export const ProductRouter = router;
