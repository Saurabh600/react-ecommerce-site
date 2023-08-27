import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-4 text-center text-sm text-slate-50 bg-gray-800">
      <div id="about" className="mb-4">
        <p className="">
          A modern and feature-rich ecommerce project! 🛒🚀 built using React.js
          and Firebase (
          <Link
            className="text-blue-600 text-base"
            to="https://github.com/saurabh600/react-ecommerce-site"
            target="_blank"
          >
            Github
          </Link>
          )
        </p>
      </div>
      <p>Copyright (c) 2023 Saurabh Chaudhary. All Rights Reserved.</p>
    </footer>
  );
}
