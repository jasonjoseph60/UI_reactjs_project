import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/documents")
      .then((res) => {
        setDocs(res.data);
        setFilteredDocs(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = [...docs];

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (doc) => doc.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((doc) =>
        doc.filename.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredDocs(filtered);
  }, [statusFilter, search, docs]);

  const resetFilters = () => {
    setStatusFilter("All");
    setSearch("");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Processed Documents</h2>

      <div className="filters">
        <label>Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option>All</option>
          <option>Processed</option>
          <option>In Progress</option>
          <option>Error</option>
        </select>

        <input
          type="text"
          placeholder="Search by filename"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-search"
        />

        <button onClick={resetFilters} className="reset-btn">
          Reset Filters
        </button>
      </div>

      <table className="docs-table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Status</th>
            <th>Processed At</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocs.map((doc) => (
            <tr key={doc.id} onClick={() => navigate(`/viewer/${doc.id}`)}>
              <td>{doc.filename}</td>
              <td>
                <span className={`status-badge ${doc.status.toLowerCase()}`}>
                  {doc.status}
                </span>
              </td>
              <td>{new Date(doc.processed_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
