import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Navbar() {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    setHasLoggedIn(() => (auth.currentUser ? true : false));
  }, []);

  function onLogOut() {
    signOut(auth)
      .then(() => {
        alert("Logged Out Successfully!");
        setHasLoggedIn(() => false);
      })
      .catch((e) => {
        alert(`Logout failed, error: ${e}`);
      });
  }

  return (
    <header className="nav-header">
      <nav className="nav">
        <h1 className="nav-title">React Firebase Ecommerce Site</h1>
        <ul className="nav-list">
          {hasLoggedIn ? (
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-logout"
                onClick={onLogOut}
              >
                Log Out
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link nav-login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link nav-signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
