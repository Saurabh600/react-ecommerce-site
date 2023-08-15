import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductList } from "../services/api/product";
import { TProduct } from "../models";
import { Rating } from "./common/Rating";

function Products() {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    fetchProductList(setProducts);
  }, []);

  return (
    <section className="product-section">
      <h2 className="product-section-title">Product Section</h2>
      <div className="product-wrapper">
        {products.map((product) => (
          <Link
            className="product"
            to={`/product/${product.id.toString()}`}
            key={product.id.toString()}
            target="_blank"
          >
            <img className="product__image" src={product.image} alt="image" />
            <div className="product__title">{product.title}</div>
            <span className="product__price">${product.price}</span>
            <Rating count={product.rating.rate} />
            <div className="product__count">{product.rating.count} reviews</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default memo(Products);
