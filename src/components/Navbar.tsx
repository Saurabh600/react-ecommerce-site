import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { TSetState } from "../types";

type Props = {
  isLogged: boolean;
  setShowCategory: TSetState<boolean>;
  setShowCart: TSetState<boolean>;
};

const Navbar: React.FC<Props> = ({
  isLogged,
  setShowCart,
  setShowCategory,
}) => {
  return (
    <header className="flex items-center py-2 bg-gray-950 text-gray-200">
      <nav className="mx-auto">
        <ul className="flex list-none space-x-1.5 first:ml-0 last:mr-0">
          <li>
            <Link
              to="/"
              className="no-underline block py-1.5 px-3 border-b border-solid border-transparent hover:border-blue-600 hover:bg-gray-800"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="#about"
              className="block no-underline py-1.5 px-3 border-b border-solid border-transparent hover:border-blue-600 hover:bg-gray-800"
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowCategory((prev) => !prev)}
              className="py-1.5 px-3 border-b border-solid border-transparent hover:border-blue-600 hover:bg-gray-800"
            >
              Category
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowCart((prev) => !prev)}
              className="py-1.5 px-3 border-b border-solid border-transparent hover:border-blue-600 hover:bg-gray-800"
            >
              Cart
            </button>
          </li>
        </ul>
      </nav>
      <div className="mr-2 space-x-2">
        {isLogged ? (
          <button
            onClick={() => signOut(auth)}
            className="py-1.5 px-3 border border-solid border-blue-600 hover:bg-gray-800 rounded text-sm"
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              target="_blank"
              className="py-1.5 px-3 border border-solid border-blue-600 hover:bg-gray-800 rounded text-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              target="_blank"
              className="py-1.5 px-3 border border-solid border-blue-600 hover:bg-gray-800 rounded text-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
