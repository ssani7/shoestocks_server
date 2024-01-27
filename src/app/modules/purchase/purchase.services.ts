import { Product } from '../products/products.model';

import { IPurchase } from './purchase.interface';
import { Purchase } from './purchase.model';

const getAllPurchases = async (): Promise<IPurchase[]> => {
  const result = await Purchase.find();

  return result;
};

const getAllPurchaseAmount = async (): Promise<{ totalPurchase: number }> => {
  const result = await Purchase.aggregate([
    { $group: { _id: null, totalPurchase: { $sum: '$purchase_amount' } } },
  ]);

  return { totalPurchase: result[0].totalPurchase };
};

const makePurchase = async (payload: IPurchase): Promise<IPurchase> => {
  const result = await Purchase.create(payload);
  //   Incrementing product quantity from current quantity
  await Product.updateOne(
    { _id: payload.product_id },
    { $inc: { quantity: -payload.purchase_quantity } },
  );

  return result;
};

export const PurchaseService = {
  makePurchase,
  getAllPurchases,
  getAllPurchaseAmount,
};
