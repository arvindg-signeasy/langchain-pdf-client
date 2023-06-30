import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import FileUpload from './components/Fileupload'
import FileActions from './components/Fileactions'
import KeypointsModal from './components/KeypointsModal'
import SummaryModal from './components/SummaryModal'
import ChatModal from './components/ChatModal'
import JSON_DATA from './data.js'

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false)
  const [embeddingSuccess, setEmbeddingSuccess] = useState(false)
  const [keypointsSuccess, setKeypointsSuccess] = useState(false)
  const [keypointsData, setKeypointsData] = useState({})
  const [summariseSuccess, setSummariseSuccess] = useState(false)
  const [summariseData, setSummariseData] = useState('')
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [smallDoc, setSmallDoc] = useState(false)
  const [fileType, setFileType] = useState('')

  useEffect(() => {
    if(selectedFile){
      uploadFileToServer()
    }
  }, [selectedFile])

  const handleSaveFile = (file) => {
    setSelectedFile(file)
  } 

  const uploadFileToServer = () => {
    setLoading(true)
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false)
          setFileUploadSuccess(true)
          setFileType(data.fileType)
          // Handle the response from the server
        })
        .catch((error) => {
          setLoading(false)
          console.error('Error:', error);
        });
    }
  }

  const handleGenerateEmbedding = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/embedding`);
      const data = await response.json();
      console.log('embedded')
      setEmbeddingSuccess(true)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  }

  const handleGenerateKeypoints = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/keypoints`);
      const data = await response.json();
      console.log('Keypoints successful')
      setKeypointsSuccess(true)
      setKeypointsData(data)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  }

  const handleGenerateKeypointsSmallDocs = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/smallkeypoints`);
      const data = await response.json();
      console.log('Keypoints successful')
      setKeypointsSuccess(true)
      setKeypointsData(data)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  }

  const handleGenerateSummary = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/summary`);
      const data = await response.json();
      console.log('Summary successful')
      setSummariseSuccess(true)
      setSummariseData(data.result.text)
      console.log(3, data)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  }

  const handleGenerateImprovement = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/improvement`);
      const data = await response.json();
      console.log('Improvement successful')
      setKeypointsSuccess(true)
      setKeypointsData(data)
      console.log(3, data)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  }

  const handleGenerateInsightsForJson = async () => {
    setLoading(true)
    const json = JSON_DATA
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/jsoninsight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });
      
      const data = await response.json();
      console.log('Improvement successful')
      setKeypointsSuccess(true)
      setKeypointsData({})
      console.log(3, data)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  }

  const handleGenerateInsightsForCSV = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/csvinsight`);
      const data = await response.json();
      console.log('Improvement successful')
      setKeypointsSuccess(true)
      setKeypointsData({})
      console.log(3, data)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {<div className="app">
          <h1>Langchain APP for PDF</h1>
          <div className="app-content">
          {fileUploadSuccess ? <FileActions openChatModal={() => {setChatModalOpen(true)}} openSmallChatModal={() => {setChatModalOpen(true)
          setSmallDoc(true)}} generateImprovement={handleGenerateImprovement} generateInsightsForJson={handleGenerateInsightsForJson} generateInsightsForCSV={handleGenerateInsightsForCSV} generateSummary={handleGenerateSummary} generateKeypoints={handleGenerateKeypoints} generateKeypointsSmallDocs={handleGenerateKeypointsSmallDocs} generateEmbedding={handleGenerateEmbedding} embeddingSuccess={embeddingSuccess}/> : <FileUpload selectedFile={selectedFile} saveFile={handleSaveFile}/>}
          </div>
       </div>
      }
      {keypointsSuccess && <KeypointsModal keypointsData={keypointsData} handleClose={() => {setKeypointsSuccess(!keypointsSuccess)}}/> }
      {summariseSuccess && <SummaryModal summariseData={summariseData} handleClose={() => {setSummariseSuccess(!summariseSuccess)}}/> }
      {chatModalOpen && <ChatModal handleClose={() => {setChatModalOpen(!chatModalOpen)}} isSmallDoc={smallDoc}/>}
    </div>
  );
};

export default App;
