import { RequestHandler } from 'express';

import { SaleCategory } from './sale.interface';
import { SaleService } from './sale.services';

const getSalesByCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = req.params.category as SaleCategory;
    const result = await SaleService.getSalesByCategory(category);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

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
  getSalesByCategory,
};
