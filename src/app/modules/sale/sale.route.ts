import express from 'express';

import { SalesController } from './sale.controller';

const router = express.Router();

router
  .get('/recent-sales', SalesController.getRecentSales)
  .get('/:category', SalesController.getSalesByCategory)
  .post('/make-sale', SalesController.makeSale);

export const SalesRouter = router;
