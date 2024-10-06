import Database from "@tauri-apps/plugin-sql";
import { useEffect, useState } from "react";

const DBTest = () => {
  const [result, setResult] = useState<Array<Product>>();
  const [query, setQuery] = useState("");
  const [db, setDb] = useState<Database>();

  const connectDB = async () => {
    const db = await Database.load(
      "postgres://yuki_kasir:yukikasir%231809@192.168.1.2/yuki_kasir"
    );

    setDb(db);
  };

  // const seedProducts = async (db) => {
  //   const names = [
  //     'Apple', 'Banana', 'Milk', 'Orange', 'Grapes', 'Tomato', 'Potato', 'Carrot', 'Chicken Breast', 'Beef Steak',
  //     'Fish Fillet', 'Eggs', 'Butter', 'Cheese', 'Yogurt', 'Rice', 'Pasta', 'Bread', 'Cereal', 'Peanut Butter'
  //   ];

  //   const descriptions = [
  //     'Fresh and organic', 'High-quality product', 'Delicious and healthy', 'Packed with nutrients', 'Premium quality',
  //     'Sourced from local farms', 'Naturally grown', 'Farm fresh', 'Great for cooking', 'Rich in flavor'
  //   ];

  //   const brands = [
  //     'FarmFresh', 'Organic Valley', 'Nature\'s Best', 'DairyLand', 'EcoGreen', 'Fresh Harvest', 'Green Farms', 'PureTaste',
  //     'NutriChoice', 'Good Earth'
  //   ];

  //   const generateRandomPrice = () => (Math.random() * (50 - 1) + 1).toFixed(2);
  //   const generateRandomCost = (price) => (price * (Math.random() * (0.8 - 0.5) + 0.5)).toFixed(2); // Cost is between 50%-80% of price
  //   const generateRandomStock = () => Math.floor(Math.random() * 1000) + 1;
  //   const generateRandomThreshold = () => Math.floor(Math.random() * 50) + 1;
  //   const generateRandomBoolean = () => Math.random() > 0.5;

  //   for (let i = 0; i < 100; i++) {
  //     const randomName = names[Math.floor(Math.random() * names.length)];
  //     const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
  //     const randomBrand = brands[Math.floor(Math.random() * brands.length)];
  //     const randomPrice = generateRandomPrice();
  //     const randomCost = generateRandomCost(randomPrice);
  //     const randomStock = generateRandomStock();
  //     const randomThreshold = generateRandomThreshold();
  //     const randomIsActive = true;

  //     try {
  //       await db.execute(
  //         "INSERT INTO products (sku, name, description, brand, price, cost, stock_quantity, stock_threshold, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)",
  //         [
  //           `P${String(i + 1).padStart(3, '0')}`, // Auto-generate SKU like P001, P002...
  //           randomName,
  //           randomDescription,
  //           randomBrand,
  //           Number(randomPrice),
  //           Number(randomCost),
  //           randomStock,
  //           randomThreshold
  //         ]
  //       );
  //       console.log(`Inserted product: ${randomName}`);
  //     } catch (error) {
  //       console.error(`Error inserting product: ${randomName}`, error);
  //     }
  //   }
  // };

  useEffect(() => {
    connectDB();
  }, []);

  const fetchProducts = async () => {
    if (!db) return;
    const res = await db.select(
      `SELECT * FROM products WHERE name = '${query}' LIMIT 1`
    );
    setResult(res as Array<Product>);
    console.log(res);
  };

  return (
    <div>
      Select test
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={fetchProducts}>Fetch</button>
      {result && result.length !== 0 && <ProductDetails product={result[0]} />}
    </div>
  );
};

export default DBTest;

const ProductDetails = ({ product }: { product: Product }) => {
  if (!product) return null;
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Product Details</h2>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Product ID:</strong> {product.product_id}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>SKU:</strong> {product.sku}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Name:</strong> {product.name}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Description:</strong> {product.description}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Brand:</strong> {product.brand}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Price:</strong> ${product.price}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Cost:</strong> ${product.cost}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Stock Quantity:</strong> {product.stock_quantity}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Stock Threshold:</strong> {product.stock_threshold}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Active:</strong> {product.is_active ? 'Yes' : 'No'}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}
      </div>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>Updated At:</strong> {new Date(product.updated_at).toLocaleString()}
      </div>
    </div>
  );
};

interface Product {
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
}
