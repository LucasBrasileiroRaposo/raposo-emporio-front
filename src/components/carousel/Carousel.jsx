import { useEffect, useState } from 'react';
import './Carousel.css';

export default function Carousel({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel__control left" onClick={handlePrev}>&lt;</button>
      <img
        src={images[currentImage]}
        alt={`slide-${currentImage}`}
        className="carousel__image"
      />
      <button className="carousel__control right" onClick={handleNext}>&gt;</button>
    </div>
  );
}