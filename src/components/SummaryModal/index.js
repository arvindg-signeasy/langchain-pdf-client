import React from 'react';
import './style.css';

const SummaryModal = ({ summariseData, handleClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={handleClose}>
          &times;
        </span>
        <div className="modal-text">
          <p>
            {summariseData}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
