import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const EyeIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/food-partner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      // store token: localStorage.setItem("partnerToken", data.token)
      navigate("/food-partner/dashboard"); // redirect to partner dashboard
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout variant="partner">
      <h1 className="auth-heading">Partner portal</h1>
      <p className="auth-subheading">Sign in to manage your restaurant and menu.</p>

      {apiError && (
        <div style={{ background: "var(--clr-error-soft)", border: "1px solid var(--clr-error)", borderRadius: "var(--radius-sm)", padding: "0.7rem 1rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--clr-error)" }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Business Email</label>
          <input id="email" name="email" type="email" className={`form-input partner${errors.email ? " error" : ""}`} placeholder="hello@myrestaurant.com" value={form.email} onChange={handleChange} autoComplete="email" />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
            <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
            <a href="#" style={{ fontSize: "0.78rem", color: "var(--clr-partner)", textDecoration: "none" }}>Forgot password?</a>
          </div>
          <div className="form-input-wrap">
            <input id="password" name="password" type={showPw ? "text" : "password"} className={`form-input partner${errors.password ? " error" : ""}`} placeholder="Your password" value={form.password} onChange={handleChange} autoComplete="current-password" style={{ paddingRight: "2.5rem" }} />
            <button type="button" className="input-icon" onClick={() => setShowPw((p) => !p)} aria-label={showPw ? "Hide password" : "Show password"}>
              <EyeIcon open={showPw} />
            </button>
          </div>
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        {/* Partner perks reminder */}
        <div style={{ background: "var(--clr-partner-soft)", borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "16px", flexShrink: 0 }}>✦</span>
          <p style={{ fontSize: "0.82rem", color: "var(--clr-partner)", lineHeight: "1.5", margin: 0 }}>
            Manage your full menu, track customer reach, and upload video showcases of your dishes — all from the partner dashboard.
          </p>
        </div>

        <button type="submit" className="btn-primary partner-btn" disabled={loading}>
          {loading ? <span className="spinner" /> : null}
          {loading ? "Signing in…" : "Sign In to Dashboard"}
        </button>
      </form>

      <p className="auth-switch" style={{ marginTop: "1.5rem" }}>
        Not a partner yet? <Link to="/food-partner/register" className="partner-link">Register your restaurant</Link>
      </p>
      <p className="auth-switch" style={{ marginTop: "0.5rem" }}>
        Looking for food? <Link to="/user/login">User login</Link>
      </p>
    </AuthLayout>
  );
};

export default PartnerLogin;