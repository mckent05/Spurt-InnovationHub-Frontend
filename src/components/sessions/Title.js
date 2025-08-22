import React from "react";

const Title = ({ text }) => {
  return (
    <h4
      className="text-dark fw-semibold text-center mt-2 mb-3"
      style={{ fontFamily: "QuickSand, sans-serif" }}
    >
      {text}
    </h4>
  );
};

export default Title;
