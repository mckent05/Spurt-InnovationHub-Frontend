import React from "react";

const Input = ({
  ariaLabel,
  label,
  name,
  type,
  placeholder,
  handle,
  value,
}) => {
  return (
    <div className="w-100" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div className="form-floating">
        <input
          type={type}
          className="form-control border-warning"
          id={name}
          name={name}
          value={value}
          aria-label={ariaLabel}
          placeholder={placeholder}
          onInput={handle}
          style={{ fontSize: "1rem", padding: "1rem" }}
        />
        <label htmlFor={name} style={{ fontSize: "0.9rem", color: "#555" }}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
