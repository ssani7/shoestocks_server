import { Product } from '../products/products.model';

import { ISale } from './sale.interface';
import { Sale } from './sale.model';

const getAllSales = async (): Promise<ISale[]> => {
  const result = await Sale.find();

  return result;
};

const getAllSaleAmount = async (): Promise<{ totalSale: number }> => {
  const result = await Sale.aggregate([
    { $group: { _id: null, totalSale: { $sum: '$sale_amount' } } },
  ]);

  return { totalSale: result[0].totalSale };
};

const makeSale = async (payload: ISale): Promise<ISale> => {
  //   subtracting sale quantity from current quantity
  const sub = await Product.updateOne(
    { _id: payload.product_id, quantity: { $gt: payload.sale_quantity } },
    { $inc: { quantity: -payload.sale_quantity } },
  );
  //   recoding the sale if the product can be updated
  if (sub.modifiedCount) return await Sale.create(payload);
  else
    throw new Error(
      'Product not found or the stock is lower than the quantity',
    );
};

export const SaleService = {
  makeSale,
  getAllSales,
  getAllSaleAmount,
};
