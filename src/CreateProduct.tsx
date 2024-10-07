import ProductService from "@product/service";
import { useState } from "react";

const CreateProduct = () => {
  const productService = new ProductService();
  const [newProduct, setNewProduct] = useState<number>();

  const fetchProducts = async () => {
    const payload = {
      brand: "Apple",
      description: "iPhone 13",
      name: "iPhone 13",
      price: 1200,
      sku: "iphone13",
      stockQuantity: 10,
      stockThreshold: 5,
    };
    await productService.create(payload, {
      onSuccess: (data) => setNewProduct(data),
      onError: (error) => console.error(error),
    });
  };

  return (
    <div>
      <button onClick={fetchProducts}>Create!</button>
      created product ID: {newProduct}
    </div>
  );
};

export default CreateProduct;
