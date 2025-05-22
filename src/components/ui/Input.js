import React from "react";

const Input = ({ label, value, onChange, type = "text", placeholder = "", className = "" }) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${className}`}
      />
    </div>
  );
};

export default Input;
