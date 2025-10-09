import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clock, setClock] = useState("");

  const handleLogout = () => {
    navigate("/");
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now);
      setClock(formatted);
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="navbar">
        {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />}
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => navigateTo("/dashboard")}>Market System</div>

          <button
            className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {/* Navigation items removed */}
          </nav>

          {/* Desktop center clock and right logout */}
          <div className="nav-clock desktop" aria-live="polite" aria-atomic="true">{clock}</div>
          <button onClick={handleLogout} className="logout-button nav">Logout</button>
        </div>
      </header>

      {/* Page Content */}
      <div className="dashboard-content">
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-inner">
          <div className="footer-left">© {new Date().getFullYear()} Market System</div>
          <div className="footer-center">All rights reserved</div>
          <div className="footer-right">v1.0.0</div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;


