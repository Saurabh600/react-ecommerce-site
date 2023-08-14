import { useEffect, useState } from "react";
import { TProduct } from "./model";
import Product from "./components/Product";
import { fetchProductList } from "./api/product";

import "./App.css";

export default function App() {
  const [productList, setProductList] = useState<TProduct[]>([]);

  useEffect(() => {
    fetchProductList(setProductList);
  }, []);

  return (
    <>
      <h1 className="title">React Firebase Ecommerce Site</h1>
      <section className="product-section">
        {productList.map((product) => (
          <Product key={product.id.toString()} data={product} />
        ))}
      </section>
    </>
  );
}
