import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { majors } from '../data/majors';
import '../styles/LoginPage.css';


function LoginPage() {
const [formData, setFormData] = useState({
email: '',
password: '',
role: 'student',
major: '',
semester: '',
});

const navigate = useNavigate();

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
e.preventDefault();
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('role', formData.role);
localStorage.setItem('email', formData.email);
localStorage.setItem('major', formData.major);
localStorage.setItem('semester', formData.semester);
if (formData.role === 'student') {
  navigate('/dashboard');
} else {
  navigate('/pro-dashboard');
}
};

const selectedMajor = majors.find(m => m.name === formData.major);

return (
<div className="login-wrapper">
<form className="login-form" onSubmit={handleSubmit}>
<h2>GUC Internship Login</h2>
    <label>Email</label>
    <input
      type="email"
      name="email"
      required
      value={formData.email}
      onChange={handleChange}
    />

    <label>Password</label>
    <input
      type="password"
      name="password"
      required
      value={formData.password}
      onChange={handleChange}
    />

    <label>Login As</label>
    <select name="role" value={formData.role} onChange={handleChange}>
      <option value="student">Student</option>
      <option value="pro">Pro Student</option>
    </select>

    <label>Major</label>
    <select name="major" value={formData.major} onChange={handleChange} required>
      <option value="">Select Major</option>
      {majors.map((major) => (
        <option key={major.name} value={major.name}>
          {major.name}
        </option>
      ))}
    </select>

    <label>Semester</label>
    <select
      name="semester"
      value={formData.semester}
      onChange={handleChange}
      required
    >
      <option value="">Select Semester</option>
      {selectedMajor?.semesters.map((sem) => (
        <option key={sem} value={sem}>
          {sem}
        </option>
      ))}
    </select>

    <button type="submit">Login</button>
  </form>
</div>
);
}

export default LoginPage;