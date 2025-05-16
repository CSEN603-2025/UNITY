import React from 'react';
import { useNavigate } from 'react-router-dom';

function FrontRoleSelector() {
const navigate = useNavigate();

const handleSelect = (role) => {
if (role === 'student') {
navigate('/');
} else if (role === 'faculty') {
navigate('/faculty-login');
} else if (role === 'scad') {
navigate('/scad-login');
} else if (role === 'company') {
navigate('/company-login');
}
};

return (
<div style={containerStyle}>
<h1>Welcome to the GUC Internship Portal</h1>
<p>Please choose your role to continue:</p>
<div style={buttonContainer}>
<button onClick={() => handleSelect('student')} style={buttonStyle}>Student</button>
<button onClick={() => handleSelect('faculty')} style={buttonStyle}>Faculty Member</button>
<button onClick={() => handleSelect('scad')} style={buttonStyle}>SCAD Office</button>
<button onClick={() => handleSelect('company')} style={buttonStyle}>Company Representative</button>
</div>
</div>
);
}

const containerStyle = {
textAlign: 'center',
marginTop: '100px',
};

const buttonContainer = {
display: 'flex',
justifyContent: 'center',
gap: '20px',
marginTop: '30px',
flexWrap: 'wrap',
};

const buttonStyle = {
padding: '15px 30px',
fontSize: '16px',
backgroundColor: '#C8102E',
color: 'white',
border: 'none',
borderRadius: '8px',
cursor: 'pointer',
};

export default FrontRoleSelector;