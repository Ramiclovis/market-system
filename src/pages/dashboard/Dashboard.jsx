import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleUsersClick = () => {
    navigate("/users");
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      {/* Page Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to the Dashboard</h1>
        <div className="modules-grid">
          <div className="module-card users" onClick={handleUsersClick}>
            <div className="module-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 className="module-title">Users</h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;


