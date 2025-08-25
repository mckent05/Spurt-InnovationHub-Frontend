import React from "react";

const SectionHeader = ({ title, children }) => (
  <div className="d-flex align-items-center justify-content-between mb-3">
    <h4 className="mb-0">{title}</h4>
    <div className="d-flex gap-2">{children}</div>
  </div>
);

export default SectionHeader;
