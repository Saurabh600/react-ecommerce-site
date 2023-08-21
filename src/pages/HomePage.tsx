import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { TProduct } from "../types";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/css/homepage.css";

export default function NewHomePage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [_, setIsAuthenticated] = useState(false);

  const categoryList = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
        alert(`failed to fetch data: ${err.message}`);
      });
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setIsAuthenticated(() => false);
      return;
    }

    setIsAuthenticated(() => true);
  });

  function onClearSelection() {
    document.title = "React Shopping Site";
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
        alert(`failed to fetch data: ${err.message}`);
      });
  }

  function onSelectCategory(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = e.target as HTMLButtonElement;
    const category = target.getAttribute("data-category-type")!;

    document.title = `${category} | React Shopping Cart`;

    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
        alert(`failed to fetch data: ${err.message}`);
      });
  }

  document.title = "React Shopping Site";

  return (
    <>
      <Navbar />
      <main className="main-container">
        <section className="side-bar">
          <div id="about" className="about">
            <p className="about-text">
              A modern and feature-rich ecommerce project! 🛒🚀 built using
              React.js and Firebase.
            </p>
            <Link
              className="link"
              to="https://github.com/saurabh600/react-ecommerce-site"
              target="_blank"
            >
              Github
            </Link>
          </div>
          <div>
            <div className="">Select by Category</div>
            <div className="category-list">
              {categoryList.map((category) => (
                <button
                  key={category}
                  className="btn btn-category"
                  data-category-type={category}
                  onClick={onSelectCategory}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="btn btn-clear" onClick={onClearSelection}>
              Clear Selection
            </button>
          </div>
        </section>
        <section className="product-section">
          {products.map((data) => (
            <Link
              key={data.id.toString()}
              className="product"
              to={`/product/${data.id}`}
              target="_blank"
            >
              <img
                src={data.thumbnail}
                className="product-image"
                alt="images"
              />
              <div className="product-title">{data.title}</div>
              <div className="product-price">
                <small className="text-small">$</small> <b>{data.price}</b>
                <small className="text-small-lg">.99</small>
              </div>
              <button className="btn btn-checkout">Add to Cart</button>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
