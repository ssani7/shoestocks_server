import { IProduct } from '../products/products.interface';
import { Product } from '../products/products.model';

import { IPurchase } from './purchase.interface';
import { Purchase } from './purchase.model';

const getAllPurchases = async (): Promise<IPurchase[]> => {
  const result = await Purchase.find();

  return result;
};

const getAllPurchasesAmount = async (): Promise<{ totalPurchase: number }> => {
  const result = await Purchase.aggregate([
    { $group: { _id: null, totalPurchase: { $sum: '$purchase_amount' } } },
  ]);

  return { totalPurchase: result[0].totalPurchase };
};

const getAllPurchaseAmount = async (): Promise<{ totalPurchase: number }> => {
  const result = await Purchase.aggregate([
    { $group: { _id: null, totalPurchase: { $sum: '$purchase_amount' } } },
  ]);

  return { totalPurchase: result[0].totalPurchase };
};

const makePurchase = async (
  payload: IProduct & { _id: string },
): Promise<IPurchase> => {
  //   Incrementing product quantity or create new product based on _id
  let productID = payload?._id;
  if (productID)
    await Product.updateOne(
      { _id: payload._id },
      { $inc: { quantity: payload.quantity } },
    );
  else {
    const product = await Product.create(payload);
    productID = product._id as unknown as string;
  }

  const purchaseData = {
    date: new Date(),
    product_id: productID,
    purchase_quantity: payload.quantity,
    purchase_amount: Number(payload.price) * Number(payload.quantity),
  };
  const result = await Purchase.create(purchaseData);

  return result;
};

export const PurchaseService = {
  makePurchase,
  getAllPurchases,
  getAllPurchaseAmount,
  getAllPurchasesAmount,
};
