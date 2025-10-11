import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />

      {/* Page Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to the Dashboard</h1>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;


