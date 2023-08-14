import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductList } from "../services/api/product";
import { TProduct } from "../models";

function Products() {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    fetchProductList(setProducts);
  }, []);

  return (
    <section className="product-section">
      {products.map((product) => (
        <Link
          className="product"
          to={`/product/${product.id.toString()}`}
          key={product.id.toString()}
          target="_blank"
        >
          <img className="product__image" src={product.image} alt="image" />
          <div className="product__title">{product.title}</div>
          <div className="product__desc">{product.description}</div>
          <span className="product__price">{product.price}</span>
          <div className="product__rating">rating {product.rating.rate}</div>
          <div className="product__count">reviews {product.rating.count}</div>
        </Link>
      ))}
    </section>
  );
}

export default memo(Products);
