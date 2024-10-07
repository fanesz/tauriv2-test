import { Product } from "@product/entity";
import ProductService from "@product/service";
import { useState } from "react";

const GetAllProduct = () => {
  const productService = new ProductService();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);

  const fetchProducts = async () => {
    await productService.getAll(
      {
        page: 1,
        limit: 10,
        name: "iPhone",
      },
      {
        onSuccess: (data) => {
          if (data?.data) {
            console.log(data);
            setProducts(data.data);
            setTotalProduct(data.pagination.total_items);
          }
        },
        onError: (error) => alert(error),
      }
    );
  };

  return (
    <div>
      <button onClick={fetchProducts}>Get ALL!</button>
      total products: {totalProduct}
      products: {JSON.stringify(products, null, 2)}
    </div>
  );
};

export default GetAllProduct;
