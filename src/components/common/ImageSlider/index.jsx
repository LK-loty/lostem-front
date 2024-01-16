import React, { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-list ${
              index === currentIndex ? "active" : "inactive"
            }`}
          >
            <img src={image} alt={image} />
          </div>
        ))}
        <button className="prev-button" onClick={goPrev}>
          <GoChevronLeft size={24} />
        </button>
        <button className="next-button" onClick={goNext}>
          <GoChevronRight size={24} />
        </button>
      </div>
      <div className="nav-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "active" : "inactive"}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
