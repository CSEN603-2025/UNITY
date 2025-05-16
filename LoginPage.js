import React, { useState } from 'react';

function LoginPage() {
const [formData, setFormData] = useState({ email: '', password: '' });

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
e.preventDefault();
console.log('Login data:', formData);
// Later: send to backend
};

return (
<div style={{
backgroundColor: '#f5f5f5',
height: '100vh',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
}}>
<form onSubmit={handleSubmit} style={{
backgroundColor: 'white',
padding: '40px',
borderRadius: '12px',
boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
width: '100%',
maxWidth: '400px',
}}>
<h2 style={{ marginBottom: '30px', color: '#C8102E', textAlign: 'center' }}>GUC Internship Login</h2>    <div style={{ marginBottom: '20px' }}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc' }}
      />
    </div>

    <div style={{ marginBottom: '20px' }}>
      <label>Password</label>
      <input
        type="password"
        name="password"
        required
        value={formData.password}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc' }}
      />
    </div>

    <button type="submit" style={{
      width: '100%',
      padding: '12px',
      backgroundColor: '#C8102E',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }}>
      Login
    </button>
  </form>
</div>
);
}