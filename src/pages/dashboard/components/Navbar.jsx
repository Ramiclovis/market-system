import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [clock, setClock] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const handleLogout = () => {
    navigate("/");
  };

  const showLogoutConfirmation = () => {
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-brand">Market System</div>

          {/* Center clock */}
          <div className="nav-clock" aria-live="polite" aria-atomic="true">
            {clock}
          </div>

          {/* Logout button */}
          <button onClick={showLogoutConfirmation} className="logout-button nav">
            Logout
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={cancelLogout}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">⚠️</div>
              <h3 className="modal-title">Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout from the Market System?</p>
              <p className="modal-subtitle">You will need to login again to access your account.</p>
            </div>
            <div className="modal-actions">
              <button onClick={cancelLogout} className="modal-btn cancel">
                Cancel
              </button>
              <button onClick={handleLogout} className="modal-btn confirm">
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
