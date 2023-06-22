import React, { useState } from 'react';
import './style.css'
const FileUpload = ({ selectedFile, saveFile}) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    saveFile(file);
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div className="file-info">
          <span>Selected File: </span>
          <span>{selectedFile.name}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;