export type ISale = {
  date: Date;
  customer: string;
  warehouse: 'Uttara Warehouse' | 'Mirpur Warehouse';
  product_id: string;
  sale_quantity: number;
  sale_amount: number;
};
