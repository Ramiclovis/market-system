import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import "./PurchasesTable.css";

function PurchasesTable() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="users-table-container">
      <Navbar />
      
      {/* Table Container */}
      <div className="table-container">
        <div className="table-wrapper">
          {/* Header */}
          <div className="users-header">
            <div className="header-content">
              <button onClick={handleBack} className="back-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="purchases-content">
            <h1>Purchases</h1>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PurchasesTable;
