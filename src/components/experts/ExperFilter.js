import React from "react";

const ExpertFilter = ({ selected, onChange, categories }) => {
  return (
    <div className="mb-4">
      <label className="form-label fw-semibold">Filter by Expertise</label>
      <select
        className="form-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpertFilter;
