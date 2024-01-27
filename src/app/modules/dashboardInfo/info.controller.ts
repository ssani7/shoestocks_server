import { RequestHandler } from 'express-serve-static-core';

import { ProductService } from '../products/products.service';
import { SaleService } from '../sale/sale.services';

const getCardInfo: RequestHandler = async (req, res, next) => {
  try {
    const { currentStock } = await ProductService.getStocksCount();
    const { totalSale } = await SaleService.getAllSaleAmount();

    const result = {
      currentStock,
      totalSale,
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
