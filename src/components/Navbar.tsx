import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </header>
  );
}
