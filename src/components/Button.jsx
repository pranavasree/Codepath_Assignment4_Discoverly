import React from "react";

const Button = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
  >
    {text}
  </button>
);

export default Button;
