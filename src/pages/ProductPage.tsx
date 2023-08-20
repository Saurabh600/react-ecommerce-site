import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProduct } from "../types";

export default function ProductPage() {
  const [product, setProduct] = useState<TProduct>();

  const { id } = useParams();

  useEffect(() => {
    if (Number(id) > 100) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(() => data))
      .catch((err) => console.log(err));
  }, []);

  if (!product) {
    return (
      <div>
        <h1>Proudct is not available</h1>
      </div>
    );
  }

  return (
    <main className="main-container">
      <div className="product-left">
        <div className="image-list">
          {product.images.map((url) => (
            <img key={url} src={url} alt="url" />
          ))}
        </div>
        <img src={product.thumbnail} alt="" />
      </div>
      <div className="product-right">
        <h1 className="product-title">{product.title}</h1>
        <div className="product-desc">{product.description}</div>
        <div className="product-price">{product.price}</div>
        <div className="product-rating">{product.rating}</div>
      </div>
    </main>
  );
}
