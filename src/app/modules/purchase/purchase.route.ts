import express from 'express';

import { jwtVerify } from '../../middleware/jwtMiddleware';

import { PurchaseController } from './purchase.controller';

const router = express.Router();

router
  .get('/', PurchaseController.getALlPurchase)
  .post('/make-purchase', jwtVerify, PurchaseController.makePurchase);

export const PurchaseRouter = router;
