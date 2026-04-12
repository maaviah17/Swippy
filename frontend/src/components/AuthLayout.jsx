import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

const FOOD_BG = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80&auto=format&fit=crop";
const PARTNER_BG = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop";

const AuthLayout = ({ children, variant = "user" }) => {
  const isPartner = variant === "partner";

  return (
    <div className="auth-layout">
      {/* Visual Panel */}
      <div className="auth-panel">
        <img
          className="panel-bg"
          src={isPartner ? PARTNER_BG : FOOD_BG}
          alt=""
          aria-hidden="true"
        />
        <div className="panel-overlay" />
        <div className="auth-panel-inner">
          <div className="panel-content">
            <span className={`panel-tag${isPartner ? " partner" : ""}`}>
              {isPartner ? "Food Partner Portal" : "For Food Lovers"}
            </span>
            <h2 className="panel-headline">
              {isPartner
                ? "Grow your restaurant with us"
                : "Flavors from every corner of the world"}
            </h2>
            <p className="panel-sub">
              {isPartner
                ? "Reach thousands of hungry customers. Upload your menu, track orders, and grow your brand."
                : "Discover curated dishes from top restaurants around you — one seamless platform."}
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          <Link to="/" className="auth-logo">
            <div className={`logo-mark${isPartner ? " partner" : ""}`}>F</div>
            <span className="logo-name">Folio</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;