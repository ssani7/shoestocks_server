import { RequestHandler } from 'express';

import { PurchaseService } from './purchase.services';

const getALlPurchase: RequestHandler = async (req, res, next) => {
  try {
    const result = await PurchaseService.getAllPurchases();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const makePurchase: RequestHandler = async (req, res, next) => {
  try {
    const { ...purchaseData } = req.body;
    const result = await PurchaseService.makePurchase(purchaseData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const PurchaseController = {
  makePurchase,
  getALlPurchase,
};
