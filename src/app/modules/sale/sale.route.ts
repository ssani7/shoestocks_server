import express from 'express';

import { SalesController } from './sale.controller';

const router = express.Router();

router
  //   .get('/sales', ProductController.getAllProducts)
  .post('/make-sale', SalesController.makeSale);

export const SalesRouter = router;
