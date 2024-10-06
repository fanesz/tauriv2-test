import Database from "@database/database";
import { Product, ProductCreate } from "../entities/product";

class ProductService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async getByName(name: string): Promise<Product[]> {
    const query =
      "SELECT * FROM products WHERE LOWER(name) LIKE LOWER($1) LIMIT 1";
    return await this.db.select<Product[]>(query, [`%${name}%`]);
  }

  async create(product: ProductCreate): Promise<number> {
    const query = `
    INSERT INTO products (sku, name, description, brand, price, cost, stock_quantity, stock_threshold, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::boolean)
    RETURNING id
  `;
    const res = await this.db.execute(query, [
      product.sku,
      product.name,
      product.description,
      product.brand,
      product.price,
      product.cost,
      product.stock_quantity,
      product.stock_threshold,
      product.is_active ?? true,
    ]);

    console.log(res);

    return res.lastInsertId;
  }
}

export default ProductService;
