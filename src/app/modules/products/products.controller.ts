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

const getProductByID: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ProductService.getProductByID(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getProductsByFilter: RequestHandler = async (req, res, next) => {
  try {
    const filter = req.query;
    const result = await ProductService.getProductsByFilter(filter);

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

const searchProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;
    const result = await ProductService.searchProduct(String(name));

    res.status(200).json({
      success: true,
      message: 'Product is created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...productData } = req.body;
    const result = await ProductService.updateProduct(id, productData);

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
  searchProduct,
  getProductsByFilter,
  deleteProduct,
  updateProduct,
  getProductByID,
};
