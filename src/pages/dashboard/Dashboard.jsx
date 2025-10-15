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

  const handleCompaniesClick = () => {
    navigate("/companies");
  };

  const handleSuppliersClick = () => {
    navigate("/suppliers");
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
          <div className="module-card companies" onClick={handleCompaniesClick}>
            <div className="module-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
            </div>
            <h3 className="module-title">Companies</h3>
          </div>
          <div className="module-card users" onClick={handleSuppliersClick}>
            <div className="module-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
              </svg>
            </div>
            <h3 className="module-title">Suppliers</h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;


