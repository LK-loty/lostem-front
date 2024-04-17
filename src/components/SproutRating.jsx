import React, { useState } from "react";
import graySprout from "../assets/icons/ico_gray-sprout.png";
import greenSprout from "../assets/icons/ico_green-sprout.png";

const SproutRating = ({ rating, handleRatingChange }) => {
  return (
    <div>
      <div className="green">{rating}</div>
      {[1, 2, 3, 4, 5].map((value) => (
        <button key={value} onClick={() => handleRatingChange(value)}>
          <img src={value <= rating ? greenSprout : graySprout} />
        </button>
      ))}
    </div>
  );
};

export default SproutRating;
