import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1 className="title">PDF Validation</h1>

      <div className="top-bar">
        <button className="btn upload-btn">Upload</button>
        <button className="btn save-btn">Save</button>
      </div>

      <div className="content">
        {/* PDF Viewer */}
        <div className="pdf-section">
          <div className="pdf-placeholder">
            <p>PDF Viewer Area</p>
          </div>
        </div>

        {/* Extracted Data */}
        <div className="data-section">
          <h2>Extracted Data</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Extracted Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Invoice Number</td>
                <td><input type="text" defaultValue="INV-12345" /></td>
              </tr>
              <tr>
                <td>Date</td>
                <td><input type="text" defaultValue="2025-04-21" /></td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td><input type="text" defaultValue="$1,200.00" /></td>
              </tr>
            </tbody>
          </table>

          <button className="btn confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default App;