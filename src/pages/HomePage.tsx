import { useEffect, useState } from "react";
import Product from "../components/Product";
import Navbar from "../components/Navbar";
import { fetchProductList } from "../services/api/product";
import { TProduct } from "../models";

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
