import React from "react";

const ExpertCard = ({ expert }) => {
  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
        <div>
          <h5>{expert.fullName}</h5>
          <p className="text-muted">{expert.expertise.join(", ")}</p>
          <p>{expert.bio}</p>
        </div>
        <div>
          <a
            href={expert.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-warning"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
