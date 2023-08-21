import { Link } from "react-router-dom";

import "../assets/css/navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/#about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/offers">
            Offers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/accout">
            Account
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/checkout">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="">
            Category
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
