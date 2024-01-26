import { RequestHandler } from 'express';

import { SaleService } from './sale.services';

const makeSale: RequestHandler = async (req, res, next) => {
  try {
    const { ...saleData } = req.body;
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
};
