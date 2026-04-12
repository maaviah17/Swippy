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

const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
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
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      navigate("/user/login");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout variant="user">
      <h1 className="auth-heading">Create account</h1>
      <p className="auth-subheading">Join thousands of food lovers today.</p>

      {apiError && (
        <div style={{ background: "var(--clr-error-soft)", border: "1px solid var(--clr-error)", borderRadius: "var(--radius-sm)", padding: "0.7rem 1rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--clr-error)" }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" className={`form-input${errors.name ? " error" : ""}`} placeholder="Jane Doe" value={form.name} onChange={handleChange} autoComplete="name" />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={`form-input${errors.email ? " error" : ""}`} placeholder="jane@example.com" value={form.email} onChange={handleChange} autoComplete="email" />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="form-input-wrap">
            <input id="password" name="password" type={showPw ? "text" : "password"} className={`form-input${errors.password ? " error" : ""}`} placeholder="Min. 6 characters" value={form.password} onChange={handleChange} autoComplete="new-password" style={{ paddingRight: "2.5rem" }} />
            <button type="button" className="input-icon" onClick={() => setShowPw((p) => !p)} aria-label={showPw ? "Hide password" : "Show password"}>
              <EyeIcon open={showPw} />
            </button>
          </div>
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirm">Confirm Password</label>
          <input id="confirm" name="confirm" type={showPw ? "text" : "password"} className={`form-input${errors.confirm ? " error" : ""}`} placeholder="Repeat password" value={form.confirm} onChange={handleChange} autoComplete="new-password" />
          {errors.confirm && <p className="form-error">{errors.confirm}</p>}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <span className="spinner" /> : null}
          {loading ? "Creating account…" : "Create Account"}
        </button>

        <p className="auth-terms">
          By signing up you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/user/login">Sign in</Link>
      </p>
      <p className="auth-switch" style={{ marginTop: "0.5rem" }}>
        Are you a restaurant? <Link to="/food-partner/register" className="partner-link">Partner with us</Link>
      </p>
    </AuthLayout>
  );
};

export default UserRegister;