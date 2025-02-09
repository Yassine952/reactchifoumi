import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-gray-700 hover:text-gray-900 lg:mx-6 border-b-2 border-transparent hover:border-red-400"
    >
      {children}
    </Link>
  );
};

export default NavLink;
