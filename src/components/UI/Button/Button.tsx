import React from "react";
import styles from "./Button.module.scss";
import type { ButtonVariant } from "./Button.types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  active?: boolean;
}

const Button = ({
  variant = "primary",
  active = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${
    active ? styles.active : ""
  } ${className || ""}`;

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
