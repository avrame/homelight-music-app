import React from "react";

function FilterTableHeader({ value, placeholder, onChange, clearFilter }) {
  return (
    <th className="filter">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <span className="icon" onClick={clearFilter}>
        <i className="fas fa-times-circle"></i>
      </span>
    </th>
  );
}

export default FilterTableHeader;
