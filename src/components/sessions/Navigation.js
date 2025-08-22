import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = ({ text, push, btnText }) => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column flex-lg-column align-items-center justify-content-lg-end gap-3 w-75 mx-auto"
      style={{ minHeight: "10vh", margin: "10px auto" }}
    >
      <span
        className="text-muted"
        style={{
          fontFamily: "QuickSand, sans-serif",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "17px",
        }}
      >
        {text}
      </span>
      <button
        onClick={() => navigate(`/${push}`)}
        className="btn text-warning w-75 w-lg-50 py-2 py-lg-3 mt-2 mt-lg-0"
        style={{
          fontFamily: "QuickSand, sans-serif",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "18px",
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          boxShadow: "0px 2px 2px rgba(74, 106, 149, 0.2)",
          textTransform: "none",
        }}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Navigation;
