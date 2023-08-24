import { Link } from "react-router-dom";
import github_icon from "../assets/images/github-icon.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-3 mb-8 bg-neutral-800">
      <Link
        className="ml-2"
        to={"https://github.com/saurabh600/react-ecommerce-site/"}
      >
        <img
          className="block w-8 h-8 p-1 rounded hover:bg-blue-600 hover:text-blue-400"
          src={github_icon}
          alt="github"
        />
      </Link>
      <ul className="flex justify-center items-center list-none space-x-2">
        <li className="nav-item">
          <Link
            className="py-1 px-2 text-sm no-underline block text-slate-50 bg-gray-800 rounded-sm border-transparent border border-solid hover:border-blue-500 hover:text-blue-500"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="py-1 px-2 text-sm no-underline block text-slate-50 bg-gray-800 rounded-sm border-transparent border border-solid hover:border-blue-500 hover:text-blue-500"
            to="/#about"
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="py-1 px-2 text-sm no-underline block text-slate-50 bg-gray-800 rounded-sm border-transparent border border-solid hover:border-blue-500 hover:text-blue-500"
            to="/offers"
          >
            Offers
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="py-1 px-2 text-sm no-underline block text-slate-50 bg-gray-800 rounded-sm border-transparent border border-solid hover:border-blue-500 hover:text-blue-500"
            to="/accout"
          >
            Account
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="py-1 px-2 text-sm no-underline block text-slate-50 bg-gray-800 rounded-sm border-transparent border border-solid hover:border-blue-500 hover:text-blue-500"
            to="/checkout"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="py-1 px-2 text-sm no-underline block text-slate-50 bg-gray-800 rounded-sm border-transparent border border-solid hover:border-blue-500 hover:text-blue-500"
            to=""
          >
            Category
          </Link>
        </li>
      </ul>
      <div></div>
    </nav>
  );
};

export default Navbar;
