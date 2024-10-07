import { Callback, WithPagination } from "@types";
import { Product, ProductCreate, ProductGet, ProductGetByID } from "./entity";
import ProductRepository from "./repository";
import { IProductService } from "./interfaces";

class ProductService implements IProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAll(req: ProductGet, callback: Callback<WithPagination<Product[]>>) {
    const result = await this.productRepository.getAll(req);
    if (result.error) {
      callback.onError(result.error);
      return;
    }

    callback.onSuccess({
      data: result.data,
      pagination: result.pagination,
    });
  }

  async getByID(req: ProductGetByID, callback: Callback<Product | null>) {
    if (typeof req.productID !== "number" || isNaN(req.productID)) {
      callback.onError(new Error("Invalid product ID"));
      return;
    }

    const result = await this.productRepository.getByID(req);
    if (result.error) {
      callback.onError(result.error);
      return;
    }

    callback.onSuccess(result.data?.[0]);
  }

  async create(product: ProductCreate, callback: Callback<number>) {
    const result = await this.productRepository.create(product);
    if (result.error) {
      callback.onError(result.error);
      return;
    }

    const createdProductID = result.data[0]?.["product_id"] ?? -1;
    callback.onSuccess(createdProductID);
  }
}

export default ProductService;
