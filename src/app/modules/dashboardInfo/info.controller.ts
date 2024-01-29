import { RequestHandler } from 'express-serve-static-core';

import { ProductService } from '../products/products.service';
import { PurchaseService } from '../purchase/purchase.services';
import { SaleService } from '../sale/sale.services';

const getCardInfo: RequestHandler = async (req, res, next) => {
  try {
    const { currentStock } = await ProductService.getStocksCount();
    const { totalSale } = await SaleService.getAllSaleAmount();
    const { totalPurchase } = await PurchaseService.getAllPurchasesAmount();

    const result = {
      currentStock,
      totalSale,
      totalPurchase,
    };

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const InfoController = {
  getCardInfo,
};
