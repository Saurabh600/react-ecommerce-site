import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TProduct } from "../../types";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductsSection from "./ProductSection";
import CategoryList from "./CategoryList";

const HomePage = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setting window title
    document.title = "React Shopping Site";

    // fetching data & modifying product state
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="grid grid-cols-4 gap-x-6">
        <section className="p-4 bg-white col-span-1">
          <div id="about" className="mb-4">
            <p className="">
              A modern and feature-rich ecommerce project! 🛒🚀 built using
              React.js and Firebase.{" "}
              <Link
                className="no-underline text-blue-600 text-sm"
                to="https://github.com/saurabh600/react-ecommerce-site"
                target="_blank"
              >
                Github
              </Link>
            </p>
          </div>
          <CategoryList setLoading={setLoading} setProducts={setProducts} />
        </section>
        {loading ? <div></div> : <ProductsSection data={products} />}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
