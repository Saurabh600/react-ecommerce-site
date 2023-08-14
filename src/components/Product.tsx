import { Link } from "react-router-dom";
import { TProduct } from "../models";

export default function Product({ data: product }: { data: TProduct }) {
  return (
    <Link
      className="product"
      to={`/product/${product.id.toString()}`}
      target="_blank"
    >
      <img className="product__image" src={product.image} alt="image" />
      <div className="product__title">{product.title}</div>
      <div className="product__desc">{product.description}</div>
      <span className="product__price">{product.price}</span>
      <div className="product__rating">rating {product.rating.rate}</div>
      <div className="product__count">reviews {product.rating.count}</div>
    </Link>
  );
}
