import { productFilterGenerator } from '../../../config/helper';

import { IProduct } from './products.interface';
import { Product } from './products.model';

const getAllProducts = async (): Promise<IProduct[]> => {
  const result = await Product.find();
  return result;
};

const getProductByID = async (id: string): Promise<any> => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const getProductsByFilter = async (filter: any): Promise<IProduct[]> => {
  const queryFilter = productFilterGenerator(filter);
  const result = await Product.find(queryFilter);
  return result;
};

const getLowStockProducts = async (): Promise<IProduct[]> => {
  const result = await Product.find({
    $expr: { $lte: ['$quantity', '$stock_alert'] },
  });
  return result;
};

const getStocksCount = async (): Promise<{ currentStock: number }> => {
  const result = await Product.aggregate([
    { $group: { _id: null, currentStock: { $sum: '$quantity' } } },
  ]);
  return { currentStock: result[0].currentStock };
};

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const searchProduct = async (payload: string): Promise<IProduct[]> => {
  const result = await Product.find({
    name: { $regex: `${payload}`, $options: 'i' },
  });
  return result;
};

const updateProduct = async (_id: string, productData: any): Promise<any> => {
  const result = await Product.updateOne(
    { _id: _id },
    {
      $set: {
        ...productData,
      },
    },
  );
  return result;
};

const deleteProduct = async (_id: string): Promise<any> => {
  const result = await Product.deleteOne({ _id: _id });
  return result;
};

export const ProductService = {
  getAllProducts,
  createProduct,
  getStocksCount,
  getLowStockProducts,
  searchProduct,
  getProductsByFilter,
  deleteProduct,
  updateProduct,
  getProductByID,
};
