import React from 'react';
import './style.css';
import closeIcon from './close-icon.png'

const KeypointsModal = ({keypointsData, handleClose}) => {
    console.log(1232, keypointsData)
    const entries = Object.entries(keypointsData);
    const halfLength = Math.ceil(entries.length / 2);
    const firstHalf = entries.slice(0, halfLength);
    const secondHalf = entries.slice(halfLength);
  
    const closeModal = () => {
      handleClose()
    };
  
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="table-container">
            <table className="table">
              <tbody>
                {firstHalf.map(([key, value]) => (
                  <tr key={key}>
                    <td className="key">{key}</td>
                    <td className="value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border"></div>
          <div className="table-container">
            <table className="table">
              <tbody>
                {secondHalf.map(([key, value]) => (
                  <tr key={key}>
                    <td className="key">{key}</td>
                    <td className="value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="close-icon" onClick={closeModal}>
          <img src={closeIcon} alt="Close" />
        </div>
      </div>
    );
};

export default KeypointsModal;