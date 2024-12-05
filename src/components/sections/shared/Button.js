import React from "react";
import PropTypes from "prop-types";

const Button = ({
  text,
  onClick,
  type = "button",
  style = {},
  className = "",
  disabled = false,
  variant = "primary", // 'primary', 'secondary', etc.
}) => {
  // Define styles for different variants
  const variantStyles = {
    primary: {
      background: "linear-gradient(135deg, #3c82f6, #9147ff)",
      color: "#ffffff",
      border: "none",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    secondary: {
      background: "transparent",
      color: "#3c82f6",
      border: "2px solid #3c82f6",
      boxShadow: "none",
    },
    disabled: {
      background: "#a5a5a5",
      color: "#ffffff",
      border: "none",
      cursor: "not-allowed",
    },
  };

  const appliedStyle = disabled ? variantStyles.disabled : variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...appliedStyle, padding: "10px 20px", borderRadius: "5px", ...style }}
      className={`custom-button ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
