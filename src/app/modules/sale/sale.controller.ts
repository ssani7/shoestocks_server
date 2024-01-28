import { RequestHandler } from 'express';

import { SaleService } from './sale.services';

const getRecentSales: RequestHandler = async (req, res, next) => {
  try {
    const result = await SaleService.getRecentSales();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const makeSale: RequestHandler = async (req, res, next) => {
  try {
    const { saleData } = req.body;
    const result = await SaleService.makeSale(saleData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const SalesController = {
  makeSale,
  getRecentSales,
};
