import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TProduct } from "../types";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type ProductsSectionProps = {
  products: TProduct[];
};

export default function NewHomePage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  let btnController: AbortController | null = null;
  let clearController: AbortController | null = null;

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

  const onClearSelection = () => {
    // aborting previous api call
    if (clearController) clearController.abort();
    setLoading(true);

    // setting window title
    document.title = "React Shopping Site";

    const newController = new AbortController();
    // fetching data & modifying products state
    fetch("https://dummyjson.com/products", { signal: newController.signal })
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
      });

    // setting new abort controlller
    clearController = newController;
  };

  const onSelectCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // aborting previous api call
    if (btnController) btnController.abort();
    setLoading(true);

    const target = e.target as HTMLButtonElement;
    const category = target.getAttribute("data-category-type")!;

    // changing window title
    document.title = `${category} | React Shopping Cart`;

    const newController = new AbortController();
    // fetching data & modifying products state
    fetch(`https://dummyjson.com/products/category/${category}`, {
      signal: newController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
      });

    // setting new abort controller
    btnController = newController;
  };

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
          <div>
            <div className="bg-neutral-800 text-white p-3 rounded-lg">
              Select by Category
            </div>
            <div className="category-list">
              {categoryList.map((category) => (
                <button
                  key={category}
                  className="inline-block px-2 py-3 text-sm m-2 bg-slate-100 border border-solid border-transparent rounded-sm cursor-pointer"
                  data-category-type={category}
                  onClick={onSelectCategory}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              className="py-3 px-4 text-base text-white bg-neutral-900 border border-solid border-transparent rounded"
              onClick={onClearSelection}
            >
              Clear Selection
            </button>
          </div>
        </section>
        {loading ? <div></div> : <ProductsSection products={products} />}
      </main>
      <Footer />
    </>
  );
}

function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section className="col-span-3 grid grid-cols-4 gap-x-9 gap-y-4">
      {products.map((data) => (
        <Link
          key={data.id.toString()}
          className="flex flex-col justify-between no-underline text-inherit p-4 bg-slate-100 rounded"
          to={`/product/${data.id}`}
          target="_blank"
        >
          <img
            src={data.thumbnail}
            className="block w-full h-[300px]"
            alt="images"
          />
          <div className="text-center text-lg my-4">{data.title}</div>
          <div className="text-center">
            <small className="text-sm">$</small>{" "}
            <b className="text-lg">{data.price}</b>
            <small className="text-base">.99</small>
          </div>
          <button className="py-3 text-base text-white bg-neutral-800 border-none cursor-pointer transition">
            Add to Cart
          </button>
        </Link>
      ))}
    </section>
  );
}
