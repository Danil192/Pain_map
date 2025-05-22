import React from "react";

const Select = ({ label, value, onChange, options = [], className = "" }) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`form-select ${className}`}
      >
        <option value="">Выберите...</option>
        {options.map((opt) => (
          <option key={opt.value || opt.id} value={opt.value || opt.id}>
            {opt.label || opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
    