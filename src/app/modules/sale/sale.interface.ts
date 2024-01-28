import mongoose from 'mongoose';

export type ISale = {
  date: Date;
  customer: string;
  warehouse: 'Uttara Warehouse' | 'Mirpur Warehouse';
  product_id: typeof mongoose.Schema.ObjectId;
  sale_quantity: number;
  sale_amount: number;
};
