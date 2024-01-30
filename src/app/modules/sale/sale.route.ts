import express from 'express';

import { jwtVerify } from '../../middleware/jwtMiddleware';

import { SalesController } from './sale.controller';

const router = express.Router();

router
  .get('/recent-sales', SalesController.getRecentSales)
  .get('/best-selling', SalesController.getBestSelling)
  .get('/:category', SalesController.getSalesByCategory)
  .post('/make-sale', jwtVerify, SalesController.makeSale);

export const SalesRouter = router;
