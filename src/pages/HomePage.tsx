import { useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  onAuthStateChanged(auth, () => {
    setIsAuthenticated(() => (auth.currentUser ? true : false));
  });

  return (
    <>
      <Navbar login={isAuthenticated} />
      <main className="main-wrapper">
        <Products />
      </main>
      <Footer />
    </>
  );
}
