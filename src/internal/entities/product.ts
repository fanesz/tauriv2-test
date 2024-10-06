export type Product = {
  product_id: number;
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  cost: number;
  stock_quantity: number;
  stock_threshold: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductCreate = {
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  cost: number;
  stock_quantity: number;
  stock_threshold: number;
  is_active?: boolean;
};
