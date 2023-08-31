import { useEffect, useRef, useState } from "react";
import { TProduct } from "../types";

import "../assets/css/productpage.css";
import { Rating } from "../components/common/Rating";

type Props = {
  productId: number;
};

const ProductPage: React.FC<Props> = ({ productId }) => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const thumbnailImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (productId > 100) return;

    const controller = new AbortController();
    async function loadProduct() {
      const res = await fetch(`https://dummyjson.com/products/${productId}`, {
        signal: controller.signal,
      });
      const data: TProduct = await res.json();
      setProduct(() => data);
      setLoading(false);

      document.title = `${data.title} | React Shopping Cart`;
    }

    loadProduct();

    return () => controller.abort();
  }, [productId]);

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
    productCart.push(productId);
    localStorage.setItem("product_cart", JSON.stringify(productCart));
  }

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      {!product ? (
        <h1>Proudct is not available</h1>
      ) : (
        <div className="p-4 grid grid-cols-2 bg-gray-800 text-white">
          <div className="grid grid-cols-10">
            <div className="col-start-1">
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
              className="col-start-2 max-w-[550px] h-[550px]"
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
      )}
    </div>
  );
};

export default ProductPage;
