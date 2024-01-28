import express from 'express';

import { SalesController } from './sale.controller';

const router = express.Router();

router
  .get('/recent-sales', SalesController.getRecentSales)
  .post('/make-sale', SalesController.makeSale);

export const SalesRouter = router;
