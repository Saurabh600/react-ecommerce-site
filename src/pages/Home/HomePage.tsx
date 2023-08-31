import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductsSection from "./ProductSection";
import CategoryList from "./CategoryList";
import CartSection from "./CartSection";

import { TProduct } from "../../types";
import ProductPage from "../ProductPage";

const HomePage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [showOneProduct, setShowOneProduct] = useState({
    show: false,
    productId: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    // setting window title
    document.title = "React Shopping Site";

    // on auth sate change
    onAuthStateChanged(auth, (user) => {
      setIsLogged(() => (user ? true : false));
    });

    // fetching data & modifying product state
    const controller = new AbortController();
    fetch("https://dummyjson.com/products?limit=20", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log(err);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="relative bg-gray-900">
      <Navbar
        isLogged={isLogged}
        setShowCart={setShowCart}
        setShowCategory={setShowCategory}
      />
      {showCart && <CartSection setShowCart={setShowCart} />}
      <main className="m-4 max-w-6xl mx-auto">
        {showCategory && (
          <CategoryList setLoading={setLoading} setProducts={setProducts} />
        )}
        <section>
          {showOneProduct.show ? (
            <ProductPage productId={showOneProduct.productId} />
          ) : (
            <>
              <div className="text-gray-100 text-lg mb-3">
                {products.length} product(s) found.
              </div>
              <div className="grid grid-cols-4 gap-4">
                {!loading &&
                  products.map((product) => (
                    <ProductsSection
                      product={product}
                      setShowOneProduct={setShowOneProduct}
                    />
                  ))}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
