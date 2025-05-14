import React, { useState } from "react";
import './loginsignup.css';
import { useHistory } from 'react-router-dom';

const SCAD = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
const history = useHistory();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     history.push("/dashboard");
  };

  return (
    <div className="scad-container">
      <div className="scad-header">
        <div className="scad-logo">
          <span className="scad-logo-text">SCAD</span>
        </div>
      </div>

      <div className="scad-form-container">
        <div className="scad-form-header">
          <h2>{action === "Login" ? "Sign in" : "Register"}</h2>
          <p>{action === "Login" ? "Access your professional dashboard" : "Begin your professional journey"}</p>
        </div>

        <form onSubmit={handleSubmit} className="scad-form">
          {action === "Sign Up" && (
            <>
              <div className="scad-input-group">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="scad-input-group">
                <input
                  type="text"
                  placeholder="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                />
              </div>

              <div className="scad-input-group">
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="scad-select"
                  required
                >
                  <option value="">Company Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>

              <div className="scad-input-group">
                <label className="scad-upload-label">
                  {logoPreview ? (
                    <div className="logo-preview-container">
                      <img src={logoPreview} alt="Company logo preview" className="logo-preview" />
                      <span>Change Logo</span>
                    </div>
                  ) : (
                    <>
                      <span className="upload-icon">+</span>
                      <span>Upload Company Logo</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="scad-upload-input"
                  />
                </label>
              </div>
            </>
          )}

          <div className="scad-input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="scad-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="scad-submit-btn">
            {action === "Login" ? "Sign in" : "Register"}
          </button>

          <div className="scad-divider">
            <span>or</span>
          </div>

          <div className="scad-toggle-container">
            <p>
              {action === "Login" ? (
                <>
                  New to SCAD?{" "}
                  <span onClick={() => setAction("Sign Up")}>Register</span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span onClick={() => setAction("Login")}>Sign in</span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SCAD;