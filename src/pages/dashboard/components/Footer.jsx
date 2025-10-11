import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-inner">
        <div className="footer-left">© {new Date().getFullYear()} Market System</div>
        <div className="footer-center">All rights reserved</div>
        <div className="footer-right">v1.0.0</div>
      </div>
    </footer>
  );
}

export default Footer;
