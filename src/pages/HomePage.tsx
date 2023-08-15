import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    setHasLoggedIn(() => (auth.currentUser ? true : false));
  }, []);

  onAuthStateChanged(auth, () => {
    setHasLoggedIn(() => (auth.currentUser ? true : false));
  });

  return (
    <>
      <Navbar hasLoggedIn={hasLoggedIn} />
      <main className="main-wrapper">
        <Products />
      </main>
      <Footer />
    </>
  );
}
