import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleUsersClick = () => {
    navigate("/users");
  };

  const handleCategoriesClick = () => {
    navigate("/categories");
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      {/* Page Content */}
      <div className="dashboard-content">
        <div className="modules-grid">
          <div className="module-card users" onClick={handleUsersClick}>
            <div className="module-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 className="module-title">Users</h3>
          </div>
          <div className="module-card users" onClick={handleCategoriesClick}>
            <div className="module-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
              </svg>
            </div>
            <h3 className="module-title">Categories</h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;


