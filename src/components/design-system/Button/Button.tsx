import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  let buttonClassNames = `
    inline-flex items-center justify-center px-4 py-2
    border border-transparent rounded-md shadow-sm
    text-white bg-blue-600 hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  `;

  if (variant === "secondary") {
    buttonClassNames = `
      ${buttonClassNames}
      bg-gray-600 hover:bg-gray-700 focus:ring-gray-500
    `;
  } else if (variant === "danger") {
    buttonClassNames = `
      ${buttonClassNames}
      bg-red-600 hover:bg-red-700 focus:ring-red-500
    `;
  }

  return (
    <button className={buttonClassNames} type="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
