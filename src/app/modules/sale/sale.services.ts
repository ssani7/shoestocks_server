import { Product } from '../products/products.model';

import { ISale, SaleCategory } from './sale.interface';
import { Sale } from './sale.model';

const getSalesByCategory = async (category: SaleCategory): Promise<ISale[]> => {
  // calculating differce between current date and category value
  const today = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const lastOneDay = new Date(today.valueOf() - 1 * oneDay);
  const lastWeek = new Date(today.valueOf() - 7 * oneDay);
  const lastMonth = new Date(today.valueOf() - 30 * oneDay);
  const lastYear = new Date(today.valueOf() - 365 * oneDay);

  // default showing weekly sales
  let filter = lastWeek;

  // changing filter accoring to need
  if (category === 'daily') filter = lastOneDay;
  else if (category === 'monthly') filter = lastMonth;
  else if (category === 'yearly') filter = lastYear;

  // const result = await Sale.find({ date: { $gt: ['$date', filter] } });

  const result = await Sale.aggregate([
    { $match: { date: { $gt: filter } } },
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

const getRecentSales = async (): Promise<ISale[]> => {
  const result = await Sale.aggregate([
    { $sort: { createdAt: 1 } },
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

const getBestSelling = async (): Promise<ISale[]> => {
  const result = await Sale.aggregate([
    {
      $group: {
        _id: '$product_id',
        name: { $first: '$product_name' },
        value: { $sum: '$sale_amount' },
      },
    },
    { $sort: { value: -1 } },
    { $limit: 5 },
  ]);

  return result;
};

const getAllSaleAmount = async (): Promise<{ totalSale: number }> => {
  const result = await Sale.aggregate([
    { $group: { _id: null, totalSale: { $sum: '$sale_amount' } } },
  ]);

  // const range = await Sale.aggregate([
  //   {
  //     $group: {
  //       // _id: {
  //       //   $cond: [
  //       //     { $lt: ['$date', fifteenDays] },
  //       //     '16-30',
  //       //     { $cond: [{ $lt: ['$date', sevenDays] }, '08-15', '01-07'] },
  //       //   ],
  //       // },
  //       _id: { $lt: ['$date', sevenDays] },
  //       doc: { $first: '$$ROOT' },
  //       count: { $sum: 1 },
  //     },
  //   },
  //   { $replaceRoot: { newRoot: '$doc' } },
  // ]);

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
  getSalesByCategory,
  getAllSaleAmount,
  getRecentSales,
  getBestSelling,
};
