import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="flex w-full justify-between items-center p-4 max-h-9">
    <p>Copyright &copy; {new Date().getFullYear()}</p>
    <Link to="#top" className="hover:underline">
      Back to Top
    </Link>
    <p>
      Made with ❤️ by{" "}
      <Link to="https://github.com/joskr2" className="hover:underline">
        Josue
      </Link>
    </p>
  </footer>
);
export default Footer;
