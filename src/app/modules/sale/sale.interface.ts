import mongoose from 'mongoose';

export type ISale = {
  date: Date;
  product_name: string;
  customer: string;
  warehouse: 'Uttara Warehouse' | 'Mirpur Warehouse';
  product_id: typeof mongoose.Schema.ObjectId;
  sale_quantity: number;
  sale_amount: number;
};

export type SaleCategory = 'daily' | 'weekly' | 'monthly' | 'yearly';
