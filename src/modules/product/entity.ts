import { ReqPagination } from "@types";

export type Product = {
  product_id: number;
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock_quantity: number;
  stock_threshold: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductGet = ReqPagination & {
  sku?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ProductGetByID = {
  productID: number;
};

export type ProductCreate = {
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stockQuantity: number;
  stockThreshold: number;
  isActive?: boolean;
};
