import { Callback, SelectReturn, WithPagination } from "@types";
import { Product, ProductCreate, ProductGet, ProductGetByID } from "./entity";

export interface IProductService {
  getAll(
    req: ProductGet,
    callback: Callback<WithPagination<Product[]>>
  ): Promise<void>;
  getByID(
    req: ProductGetByID,
    callback: Callback<Product | null>
  ): Promise<void>;
  create(product: ProductCreate, callback: Callback<number>): Promise<void>;
}

export interface IProductRepository {
  getAll(req: ProductGet): Promise<SelectReturn<Product>>;
  getByID(req: ProductGetByID): Promise<SelectReturn<Product>>;
  create(product: ProductCreate): Promise<SelectReturn<Product>>;
}
