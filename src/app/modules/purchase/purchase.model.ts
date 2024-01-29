import { model, Schema } from 'mongoose';

import { IPurchase } from './purchase.interface';

const purchaseSchema = new Schema<IPurchase>(
  {
    date: { type: Date, required: true },
    product_id: { type: String, required: true },
    purchase_quantity: { type: Number, required: true },
    purchase_amount: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Purchase = model<IPurchase>('Purchase', purchaseSchema);
