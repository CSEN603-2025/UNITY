import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function ReportEditorPage() {
const [report, setReport] = useState({
title: '',
intro: '',
body: '',
status: 'draft',
comment: '',
appeal: ''
});

useEffect(() => {
const saved = JSON.parse(localStorage.getItem('report'));
if (saved) setReport(saved);
}, []);

const handleChange = (e) => {
setReport(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = () => {
const newReport = { ...report, status: 'submitted' };
localStorage.setItem('report', JSON.stringify(newReport));
setReport(newReport);
};

const handleDownload = () => {
const blob = new Blob([`${report.title}\n\n${report.intro}\n\n${report.body}`], { type: 'text/plain' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = `${report.title}.txt`;
link.click();
};

const handleAppeal = () => {
setReport(prev => ({ ...prev, status: 'appealed' }));
};

return (
<div style={{ display: 'flex' }}>
<Sidebar />
<div style={{ flex: 1 }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h2>Internship Report</h2>
<input name="title" value={report.title} placeholder="Title" onChange={handleChange} /><br />
<textarea name="intro" placeholder="Introduction" value={report.intro} onChange={handleChange} /><br />
<textarea name="body" placeholder="Body" value={report.body} onChange={handleChange} /><br />
<p>Status: {report.status}</p>
{report.status === 'flagged' && (
<>
<p><strong>Comments:</strong> {report.comment}</p>
<textarea name="appeal" placeholder="Appeal Message" value={report.appeal} onChange={handleChange} /><br />
<button onClick={handleAppeal}>Appeal</button>
</>
)}
<button onClick={handleSubmit}>Submit Report</button>
<button onClick={handleDownload}>Download PDF</button>
</div>
</div>
</div>
);
}

export default ReportEditorPage;