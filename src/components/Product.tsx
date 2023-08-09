import { TProduct } from "../model"

export default function Product({ data: product }: { data: TProduct }) {
  return (
    <a className="product" href="#">
      <img className="product__image" src={product.image} alt="image" />
      <div className="product__title">{product.title}</div>
      <div className="product__desc">{product.description}</div>
      <span className="product__price">{product.price}</span>
      <span className="product__rating">{product.rating.rate}</span>
      <span className="product__count">{product.rating.count}</span>
    </a>
  )
}
