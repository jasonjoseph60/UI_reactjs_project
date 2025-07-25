import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";  // New list page
import Viewer from "./Viewer";        // Your PDF viewer page

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect base URL to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Dashboard (document list) */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Viewer (PDF + extracted fields) */}
        <Route path="/viewer/:docId" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);