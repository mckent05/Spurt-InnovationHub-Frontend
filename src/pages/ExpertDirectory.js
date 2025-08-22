import React, { useEffect, useState } from "react";
import ExpertCard from "../components/experts/ExpertCard";
import ExpertFilter from "../components/experts/ExpertFilter";
import axios from "axios";

const ExpertDirectory = () => {
  const [experts, setExperts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");

  // useEffect(() => {
  //   const fetchExperts = async () => {
  //     const { data } = await axios.get("/api/experts");
  //     setExperts(data);
  //     setFiltered(data);
  //   };

  //   fetchExperts();
  // }, []);

  // useEffect(() => {
  //   if (!filter) {
  //     setFiltered(experts);
  //   } else {
  //     setFiltered(
  //       experts.filter((expert) =>
  //         expert.expertise.includes(filter)
  //       )
  //     );
  //   }
  // }, [filter, experts]);

  const expertiseOptions = [
    "branding",
    "legal",
    "fundraising",
    "product",
    "compliance",
  ];

  return (
    <div className="container py-4">
      <h2 className="mb-3">Expert Directory</h2>
      <ExpertFilter
        selected={filter}
        onChange={setFilter}
        categories={expertiseOptions}
      />
      {filtered.length ? (
        filtered.map((expert) => (
          <ExpertCard key={expert._id} expert={expert} />
        ))
      ) : (
        <p>No experts found for this category.</p>
      )}
    </div>
  );
};

export default ExpertDirectory;
