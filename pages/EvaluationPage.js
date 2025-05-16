import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function EvaluationPage() {
const [company, setCompany] = useState('');
const [evaluation, setEvaluation] = useState('');
const [recommend, setRecommend] = useState(false);
const [existing, setExisting] = useState(null);

useEffect(() => {
const saved = JSON.parse(localStorage.getItem('evaluation'));
if (saved) {
setExisting(saved);
}
}, []);

const handleSubmit = () => {
if (!company || !evaluation) return alert('Please complete all fields.');
const evalData = { company, evaluation, recommend };
localStorage.setItem('evaluation', JSON.stringify(evalData));
setExisting(evalData);
};

const handleDelete = () => {
localStorage.removeItem('evaluation');
setExisting(null);
setCompany('');
setEvaluation('');
setRecommend(false);
};

return (
<div style={{ display: 'flex', height: '100vh' }}>
<Sidebar />
<div style={{ flex: 1 }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h2>Company Evaluation</h2>
{existing ? (
<>
<p><strong>Company:</strong> {existing.company}</p>
<p><strong>Evaluation:</strong> {existing.evaluation}</p>
<p><strong>Recommend:</strong> {existing.recommend ? 'Yes' : 'No'}</p>
<button onClick={handleDelete}>Delete</button>
</>
) : (
<>
<input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} /><br />
<textarea placeholder="Evaluation" value={evaluation} onChange={e => setEvaluation(e.target.value)} /><br />
<label>
Recommend? <input type="checkbox" checked={recommend} onChange={e => setRecommend(e.target.checked)} />
</label><br />
<button onClick={handleSubmit}>Submit</button>
</>
)}
</div>
</div>
</div>
);
}

export default EvaluationPage;