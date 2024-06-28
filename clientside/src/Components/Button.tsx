// Inside Button.tsx or where Button component is defined

import React from "react";

// Define ButtonProps interface
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Define type prop here
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick, type = "button" }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
