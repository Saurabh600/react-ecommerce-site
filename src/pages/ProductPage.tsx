import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { TProduct } from "../types";

import "../assets/css/productpage.css";
import { Rating } from "../components/common/Rating";
import Navbar from "../components/Navbar";

export default function ProductPage() {
  const [product, setProduct] = useState<TProduct>();
  const [loading, setLoading] = useState<boolean>(true);
  const thumbnailImgRef = useRef<HTMLImageElement>(null);

  const { id } = useParams();

  useEffect(() => {
    if (Number(id) > 100) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(() => data))
      .then(() => setLoading(() => false))
      .catch((err) => console.log(err));
  }, []);

  function onClickImage(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const target = e.target as HTMLImageElement;
    if (!thumbnailImgRef.current) return;
    thumbnailImgRef.current.src = target.currentSrc;
  }

  function onAddtoCart() {
    console.log(`${product?.title} added to cart, price: ${product?.price}`);
    const productCart: number[] = JSON.parse(
      localStorage.getItem("product_cart") || "[]"
    );
    productCart.push(Number(id));
    localStorage.setItem("product_cart", JSON.stringify(productCart));
  }

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <h1>Proudct is not available</h1>
      </div>
    );
  }

  document.title = `${product.title} | React Shopping Cart`

  return (
    <div>
      <Navbar />
      <div className="product-page-wrapper">
        <div className="side-bar-image">
          <div className="side-bar-image__imglist">
            {product.images.map((url) => (
              <img
                className="side-bar-image__img"
                key={url}
                src={url}
                alt="url"
                onClick={onClickImage}
              />
            ))}
          </div>
          <img
            ref={thumbnailImgRef}
            className="side-bar-image__thumbnail"
            src={product.thumbnail}
            alt="product image"
          />
        </div>
        <div className="side-bar-data">
          <h1 className="side-bar-data__title">{product.title}</h1>
          <div>Brand: {product.brand}</div>
          <div>Category: {product.category}</div>
          <div>Only {product.stock} item left</div>
          <div className="side-bar-data__desc">{product.description}</div>
          <Rating className="side-bar-data__rating" count={product.rating} />
          <div>Offer {product.discountPercentage}% off</div>
          <div className="side-bar-data__price">
            <small className="text-small">$</small> <b>{product.price}</b>
            <small className="text-small-lg">.99</small>
          </div>
          <button className="btn btn-cart" onClick={onAddtoCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
