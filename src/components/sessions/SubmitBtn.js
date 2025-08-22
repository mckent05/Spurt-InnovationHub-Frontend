import React from "react";

const Submit = ({ title, loading }) => {
  return (
    <div className="w-100 mt-3 d-flex justify-content-center">
      <button
        type="submit"
        className="btn text-white"
        disabled={loading}
        style={{
          width: "160px",
          height: "56px",
          fontWeight: 700,
          fontSize: "16px",
          fontFamily: "QuickSand, sans-serif",
          backgroundColor: "#f9a109",
          borderRadius: "0.75rem",
          textTransform: "none",
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default Submit;
