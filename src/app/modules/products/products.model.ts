import { model, Schema } from 'mongoose';

import { IProduct } from './products.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    stock_alert: { type: Number, required: true },
    brand: { type: String },
    model: { type: String },
    style: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    material: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Product = model<IProduct>('Product', productSchema);
