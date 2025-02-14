import React from "react";
import { useNavigate } from "react-router-dom";

const NavLink = ({ to, onClick, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-gray-700 hover:text-gray-900 lg:mx-6 border-b-2 border-transparent hover:bg-gray-200"
    >
      {children}
    </button>
  );
};

export default NavLink;