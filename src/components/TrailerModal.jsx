import React from 'react';
import '../MovieDetail.css';

const TrailerModal = ({ show, trailerKey, onClose }) => {
  if (!show) return null;

  return (
    <div className="trailer-modal-overlay">
      <div className="trailer-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
