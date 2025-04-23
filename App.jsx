import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1 className="title">PDF Validation</h1>

      <div className="top-bar">
        <button className="btn upload-btn">Upload PDF</button>
      </div>

      <div className="content">
        {/* Left Side: PDF Viewer */}
        <div className="pdf-section">
          <div className="pdf-placeholder">
            <p>PDF Viewer Area</p>
          </div>
        </div>

        {/* Right Side: Data Fields */}
        <div className="data-section">
          {/* Column Headers */}
          <div className="headers-container">
            <div className="label-header">Datapoint</div>
            <div className="field-headers">
              <div className="field-header">Extracted</div>
              <div className="field-header">Editable</div>
            </div>
          </div>

          {/* Invoice Number */}
          <div className="field-group">
            <label>Invoice Number</label>
            <div className="field-row">
              <input type="text" value="INV-12345" disabled />
              <input type="text" defaultValue="INV-12345" />
            </div>
          </div>

          {/* Date */}
          <div className="field-group">
            <label>Date</label>
            <div className="field-row">
              <input type="text" value="2025-04-21" disabled />
              <input type="text" defaultValue="2025-04-21" />
            </div>
          </div>

          {/* Total Amount */}
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
};

export default App;