// Button.tsx
import React from 'react';

interface ButtonProps {
  className: string;
  onClick?: () => void; // Make onClick optional
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

export default Button;
