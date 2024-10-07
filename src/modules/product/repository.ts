import BaseRepository from "@infrastructure/baseRepository";
import { Options, PaginatedSelectReturn, SelectReturn } from "@types";
import { Product, ProductCreate, ProductGet, ProductGetByID } from "./entity";
import { IProductRepository } from "./interfaces";

class ProductRepository extends BaseRepository implements IProductRepository {
  async getAll(req: ProductGet): Promise<PaginatedSelectReturn<Product>> {
    const query = "SELECT * FROM products";
    const options = this.#whereGetAll(req);
    const paginator = this.handlePaginator(req);

    const [result, pagination] = await Promise.all([
      this.db.select<Product>(
        query + options.where + paginator,
        options.values
      ),
      this.handlePagination({
        tableName: "products",
        options: options,
        paginator: req,
      }),
    ]);

    return Object.assign(result, { pagination });
  }

  async getByID(req: ProductGetByID): Promise<SelectReturn<Product>> {
    const query = "SELECT * FROM products WHERE product_id = $1 LIMIT 1";

    return await this.db.select<Product>(query, [req.productID]);
  }

  async create(product: ProductCreate): Promise<SelectReturn<Product>> {
    const query = `
    INSERT INTO products (sku, name, description, brand, price, cost, stock_quantity, stock_threshold, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::boolean)
    RETURNING product_id
    `;

    return await this.db.select<Product>(query, [
      product.sku,
      product.name,
      product.description,
      product.brand,
      product.price,
      product.stockQuantity,
      product.stockThreshold,
      product.isActive ?? true,
    ]);
  }

  #whereGetAll(req: ProductGet): Options {
    const { sku, name, minPrice, maxPrice } = req;
    let where = "";
    const values = [];

    if (sku) {
      where += ` AND sku = $${values.length + 1}`;
      values.push(sku);
    }

    if (name) {
      where += ` AND LOWER(name) LIKE LOWER($${values.length + 1})`;
      values.push(`%${name}%`);
    }

    if (minPrice && minPrice > 0) {
      where += ` AND price >= $${values.length + 1}`;
      values.push(minPrice);
    }

    if (maxPrice && maxPrice > 0) {
      where += ` AND price <= $${values.length + 1}`;
      values.push(maxPrice);
    }

    return this.buildWhereClause({ where, values });
  }
}

export default ProductRepository;
