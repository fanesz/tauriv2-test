import ProductService from "@services/product";
import { useState } from "react";

const CreateProduct = () => {
  const productService = new ProductService();
  const [newProduct, setNewProduct] = useState<number>();

  const fetchProducts = async () => {
    const res = await productService.create({
      brand: "Apple",
      cost: 1000,
      description: "iPhone 13",
      name: "iPhone 13",
      price: 1200,
      sku: "iphone13",
      stock_quantity: 10,
      stock_threshold: 5,
    });
    console.log(res);

    setNewProduct(res);
  };

  return (
    <div>
      <button onClick={fetchProducts}>Create!</button>
      create product: {newProduct}
    </div>
  );
};

export default CreateProduct;
