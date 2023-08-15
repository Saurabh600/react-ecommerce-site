import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { TProduct } from "../models";
import { Rating } from "../components/common/Rating";

export default function ProductPage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<TProduct>();

  useEffect(() => {
    const productQuery = query(
      collection(db, "products"),
      where("id", "==", Number(productId))
    );
    getDocs(productQuery)
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          console.log(doc.id);
          setProduct(() => doc.data() as TProduct);
        });
      })
      .catch((err: Error) => {
        alert("failed to load data");
        console.log(err.message);
      });
  }, []);

  const onClick = () => {
    alert("Working on this feature");
  };

  if (!product) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="product-page">
      <img
        className="product-page-image"
        src={product.image}
        alt="product image"
      />
      <div className="product-page-content-wrapper">
        <h1 className="product-page-title">{product.title}</h1>
        <div className="product-page-category">{product.category}</div>
        <p className="product-page-desc">{product.description}</p>
        <Rating count={product.rating.rate} />
        <div className="product-page-count">{product.rating.count} reviews</div>
        <div className="product-page-price">${product.price}</div>
        <button className="btn btn-buy" onClick={onClick}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
