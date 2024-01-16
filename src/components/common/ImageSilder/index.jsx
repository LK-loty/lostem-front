import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";

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
    <div className="image-slider">
      <div className="slider-container">
        <ul className="image-list">
          {images.map((image, index) => (
            <li
              key={index}
              className={index === currentIndex ? "visible" : "hidden"}
            >
              <img src={image} alt={image} />
            </li>
          ))}
        </ul>
        <button className="prev-button" onClick={goPrev}>
          <GoChevronLeft size={20} />
        </button>
        <button className="next-button" onClick={goNext}>
          다음
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
