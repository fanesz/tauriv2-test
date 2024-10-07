import { Product } from "@product/entity";
import ProductService from "@product/service";
import { useState } from "react";

const GetProduct = () => {
  const [result, setResult] = useState<Product>();
  const [query, setQuery] = useState("");
  const productService = new ProductService();

  const fetchProducts = async () => {
    await productService.getByID(
      { productID: Number(query) },
      {
        onSuccess: (res) => {
          if (res) setResult(res);
          else alert("Product not found");
        },
        onError: (err) => alert(err),
      }
    );
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchProducts();
          }
        }}
      />
      <button onClick={fetchProducts}>Fetch</button>
      {result && <ProductDetails product={result} />}
    </div>
  );
};

export default GetProduct;

const ProductDetails = ({ product }: { product: Product }) => {
  if (!product) return null;
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>Product Details</h2>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Product ID:</strong> {product.product_id}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>SKU:</strong> {product.sku}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Name:</strong> {product.name}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Description:</strong> {product.description}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Brand:</strong> {product.brand}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Price:</strong> ${product.price}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Stock Quantity:</strong> {product.stock_quantity}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Active:</strong> {product.is_active ? "Yes" : "No"}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Created At:</strong>{" "}
        {new Date(product.created_at).toLocaleString()}
      </div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <strong>Updated At:</strong>{" "}
        {new Date(product.updated_at).toLocaleString()}
      </div>
    </div>
  );
};
