import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <div>
        <button onClick={goToPrevSlide}>이전</button>
        <img src={images[currentSlide]} alt={`slide ${currentSlide}`} />
        <button onClick={goToNextSlide}>다음</button>
      </div>
    </div>
  );
};

export default ImageSlider;
