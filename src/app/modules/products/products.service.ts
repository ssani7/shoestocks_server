import { IProduct } from './products.interface';
import { Product } from './products.model';

const getAllProducts = async (): Promise<IProduct[]> => {
  const result = await Product.find();
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

export const ProductService = {
  getAllProducts,
  createProduct,
  getStocksCount,
  getLowStockProducts,
};
