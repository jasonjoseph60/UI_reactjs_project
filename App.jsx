import React, { useState } from 'react';
import './App.css';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);
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
        <label htmlFor="fileUpload">
          <button className="btn upload-btn">Upload PDF</button>
        </label>
      </div>

      <div className="content">
        {/* Left Side: PDF Viewer */}
        <div className="pdf-section">
          {pdfFile ? (
            <div className="pdf-container">
              <p>PDF file uploaded successfully!</p>
              <Viewer fileUrl={pdfFile} />
            </div>
          ) : (
            <div className="pdf-placeholder">
              <p>PDF Viewer Area</p>
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

          <div className="field-group">
            <label>Invoice Number</label>
            <div className="field-row">
              <input type="text" value="INV-12345" disabled />
              <input type="text" defaultValue="INV-12345" />
            </div>
          </div>

          <div className="field-group">
            <label>Date</label>
            <div className="field-row">
              <input type="text" value="2025-04-21" disabled />
              <input type="text" defaultValue="2025-04-21" />
            </div>
          </div>

          <div className="field-group">
            <label>Total Amount</label>
            <div className="field-row">
              <input type="text" value="$1,200.00" disabled />
              <input type="text" defaultValue="$1,200.00" />
            </div>
          </div>

          <button className="btn confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default App;
