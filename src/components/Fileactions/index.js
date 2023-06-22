import React from 'react'

const FileActions = ({ generateEmbedding , embeddingSuccess, generateKeypoints, generateKeypointsSmallDocs, generateSummary, openChatModal, openSmallChatModal}) => {
    return embeddingSuccess ? <div style={containerStyle}>
    <h2 style={messageStyle}>Embedding creation was successful!</h2>
    <div style={ctaContainerStyle}>
      <button style={ctaButtonStyle} onClick={generateSummary}>Summarize Document</button>
      <button style={ctaButtonStyle} onClick={openChatModal}>Chat with Document</button>
      <button style={ctaButtonStyle} onClick={openSmallChatModal}>Chat with Small Document</button>
      <button style={ctaButtonStyle} onClick={generateKeypoints}>Generate Keypoints</button>
      <button style={ctaButtonStyle} onClick={generateKeypointsSmallDocs}>Generate Keypoints for small docs</button>
    </div>
  </div> : <div>
        <h2>File Uploaded Successfully!</h2>
        <p>Generate embeddings to process the file.</p>
        <button onClick={generateEmbedding} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate Embeddings</button>
      </div>
}

const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };
  
  const messageStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };
  
  const ctaContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };
  
  const ctaButtonStyle = {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

export default FileActions