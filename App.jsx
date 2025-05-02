import React, { useState } from 'react';
import './App.css';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';
import axios from 'axios';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("http://127.0.0.1:8000/api/extract", formData);
        setExtractedData(response.data.extracted_data);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to extract data from the PDF.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  return (
    <div className="container">
      <h1 className="title">PDF Validation</h1>
      <div className="top-bar">
        <input
          type="file"
          accept="application/pdf"
          id="fileUpload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="fileUpload" className="btn upload-btn">
          Upload PDF
        </label>
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <span>Processing... please wait.</span>
        </div>
      )}

      <div className="content">
        {/* Left Side: PDF Viewer */}
        <div className="pdf-section">
          {pdfFile ? (
            <div className="pdf-container">
              <Viewer fileUrl={pdfFile} />
            </div>
          ) : (
            <div className="pdf-placeholder">
              <p>Please upload a PDF to extract data from.</p>
            </div>
          )}
        </div>

        {/* Right Side: Data Fields */}
        <div className="data-section">
          <div className="headers-container">
            <div className="label-header">Datapoint</div>
            <div className="field-headers">
              <div className="field-header">Extracted</div>
              <div className="field-header">Editable</div>
            </div>
          </div>

          {/* Dynamically render field rows from the API response */}
          {extractedData.map((key, index) => (
            <div key={index} className="field-group">
              <label>{key.id}</label>
              <div className="field-row">
                <input type="text" value={key.value} disabled />
                <input type="text" defaultValue={key.value} />
              </div>
            </div>
          ))}

          {extractedData.length > 0 && (
            <button className="btn confirm-btn">Confirm</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;