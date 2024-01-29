import { Product } from '../products/products.model';

import { ISale } from './sale.interface';
import { Sale } from './sale.model';

const getAllSales = async (): Promise<ISale[]> => {
  const result = await Sale.find();

  return result;
};

const getRecentSales = async (): Promise<ISale[]> => {
  const result = await Sale.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'products',
        localField: 'product_id',
        foreignField: '_id',
        as: 'product',
      },
    },
  ]);

  return result;
};

const getAllSaleAmount = async (): Promise<{ totalSale: number }> => {
  const result = await Sale.aggregate([
    { $group: { _id: null, totalSale: { $sum: '$sale_amount' } } },
  ]);

  return { totalSale: result[0].totalSale };
};

const makeSale = async (payload: ISale): Promise<ISale> => {
  //  updating product stock with sale data
  const product = await Product.findOne({ _id: payload.product_id });

  // return error if product is not available
  if (!product) throw new Error('Product not found');

  const remainingQuantity =
    Number(product?.quantity) - Number(payload.sale_quantity);

  if (remainingQuantity < 0)
    throw new Error('Product stock is lower than the sale quantity');

  // deleting the whole product if stock is 0 otherwise reducing quantity
  if (remainingQuantity === 0)
    await Product.deleteOne({ _id: payload.product_id });
  else
    await Product.updateOne(
      { _id: payload.product_id },
      { $inc: { quantity: -Number(payload.sale_quantity) } },
    );
  //   recoding the sale if the product can be updated
  return await Sale.create(payload);
};

export const SaleService = {
  makeSale,
  getAllSales,
  getAllSaleAmount,
  getRecentSales,
};
