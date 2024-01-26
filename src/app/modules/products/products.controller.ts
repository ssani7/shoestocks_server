import { RequestHandler } from 'express-serve-static-core';

import { SaleService } from '../sale/sale.services';

import { ProductService } from './products.service';

const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const result = await ProductService.getAllProducts();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getStockInfo: RequestHandler = async (req, res, next) => {
  try {
    const { totalStock } = await ProductService.getStocksCount();
    const { totalSale } = await SaleService.getAllSaleAmount();

    const result = {
      totalStock,
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

const getLowStockProducts: RequestHandler = async (req, res, next) => {
  try {
    const result = await ProductService.getLowStockProducts();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const { ...productData } = req.body;
    const result = await ProductService.createProduct(productData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getStockInfo,
  getLowStockProducts,
};
