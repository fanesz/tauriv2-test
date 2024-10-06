import { useEffect } from "react";
import "./App.css";
import Database from "@database/database";
import GetProduct from "./GetProduct";
import CreateProduct from "./CreateProduct";

function App() {
  const database = Database.getInstance();

  useEffect(() => {
    database.connect({
      onSuccess: () => console.log("Connected to database"),
      onError: (error) => console.log(error),
    });
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <GetProduct />
      <CreateProduct />
    </div>
  );
}

export default App;
