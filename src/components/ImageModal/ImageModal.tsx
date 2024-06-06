import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

import { ImageModalProps } from '../../types/catalog';

import './ImageModal.css';

const ImageModal: React.FC<ImageModalProps> = ({ dataImage, onClose }) => {
  const [position, setPosition] = useState(0);
  const [activeIndicator, setActiveIndicator] = useState(0);

  const moveLeft = () => {
    setPosition(prevPosition => {
      const newPosition = Math.min(prevPosition + 600, 0);
      const newActiveIndicator = Math.abs(newPosition / 600);
      setActiveIndicator(newActiveIndicator);
      return newPosition;
    });
  };

  const moveRight = () => {
    setPosition(prevPosition => {
      const newPosition = Math.max(
        prevPosition - 600,
        -((dataImage.images.length - 1) * 600),
      );
      const newActiveIndicator = Math.abs(newPosition / 600);
      setActiveIndicator(newActiveIndicator);
      return newPosition;
    });
  };

  const indicatorClick = (index: number) => {
    setPosition(-index * 600);
    setActiveIndicator(index);
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <button
          type="button"
          className="slider-button slider-button-right"
          onClick={moveLeft}
          aria-label="Prev"
        >
          <FaArrowLeft />
        </button>
        <div className="slider-wrapper">
          <ul className="slider-line" style={{ transform: `translateX(${position}px)` }}>
            {dataImage.images.map((imageSrc, index) => (
              <li key={dataImage.id} className="slider-item">
                <img
                  src={imageSrc.url}
                  alt={`Product ${index + 1}`}
                  className="h-full w-full object-cover object-center lg:w-full"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="slider-button slider-button-right"
          onClick={moveRight}
          aria-label="Next"
        >
          <FaArrowRight />
        </button>
      </div>
      <ul className="indicators">
        {dataImage.images.map((image, index) => (
          <button
            type="button"
            key={`Product ${image}`}
            className={`indicators-item ${activeIndicator === index ? 'active' : ''}`}
            onClick={() => indicatorClick(index)}
            aria-label="Indicator"
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageModal;
