import { model, Schema } from 'mongoose';

import { ISale } from './sale.interface';

const saleSchema = new Schema<ISale>(
  {
    date: { type: Date, required: true },
    customer: { type: String, required: true },
    warehouse: {
      type: String,
      enum: ['Uttara Warehouse', 'Mirpur Warehouse'],
      required: true,
    },
    product_id: { type: String, required: true },
    sale_quantity: { type: Number, required: true },
    sale_amount: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Sale = model<ISale>('Sale', saleSchema);
