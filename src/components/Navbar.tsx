import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

interface Props {
  hasLoggedIn: boolean;
}

const Navbar: React.FC<Props> = ({ hasLoggedIn }) => {
  function onClick() {
    signOut(auth)
      .then(() => {
        alert("Logged Out Successfully!");
      })
      .catch((e: Error) => {
        alert(`Logout failed, error: ${e.message}`);
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
                onClick={onClick}
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
};

export default Navbar;
