"use client";

import { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; 

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      type="button" 
      className={className || "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"}
    >
      {children}
    </button>
  );
};
