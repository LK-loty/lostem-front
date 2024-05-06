import React from "react";
import fullStar from "../../../assets/icons/green.png";
import emptyStar from "../../../assets/icons/gray.png";

const StarRating = ({ value, onStarClick }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating" style={{ display: "flex" }}>
      {stars.map((star) => (
        <img
          key={star}
          src={star <= value ? fullStar : emptyStar}
          alt={`${star} star`}
          style={{ width: "45px", cursor: "pointer" }}
          onClick={() => onStarClick(star)}
        />
      ))}
      {/* <span className="green" style={{ marginLeft: "5px", fontSize: "20px" }}>
        {value}
      </span> */}
    </div>
  );
};

export default StarRating;
