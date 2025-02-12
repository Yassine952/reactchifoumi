import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ to, children, className = "" }) => {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-white hover:text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;