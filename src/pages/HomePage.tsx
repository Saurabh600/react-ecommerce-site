import { useEffect, useState } from "react";
import { fetchProductList } from "../api/product";
import Product from "../components/Product";
import { TProduct } from "../model";

import "../App.css";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [productList, setProductList] = useState<TProduct[]>([]);

  useEffect(() => {
    fetchProductList(setProductList);
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="title">React Firebase Ecommerce Site</h1>
      <section className="product-section">
        {productList.map((product) => (
          <Product key={product.id.toString()} data={product} />
        ))}
      </section>
    </>
  );
}
