import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { assessments } from '../data/assessments';

function AssessmentPage() {
const [selected, setSelected] = useState(null);
const [answers, setAnswers] = useState({});
const [score, setScore] = useState(null);
const [postScore, setPostScore] = useState(false);

const handleSelect = (id) => {
const a = assessments.find(a => a.id === id);
setSelected(a);
setAnswers({});
setScore(null);
};

const handleAnswer = (qIndex, answer) => {
setAnswers(prev => ({ ...prev, [qIndex]: answer }));
};

const handleSubmit = () => {
const correct = selected.questions.filter((q, i) => q.answer === answers[i]);
setScore(correct.length);
if (postScore) {
localStorage.setItem('score', score);
}
};

return (
<div style={{ display: 'flex' }}>
<Sidebar />
<div style={{ flex: 1 }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h2>Online Assessments</h2>
{!selected ? (
<>
{assessments.map((a) => (
<button key={a.id} onClick={() => handleSelect(a.id)}>{a.name}</button>
))}
</>
) : (
<>
{selected.questions.map((q, i) => (
<div key={i}>
<p>{q.question}</p>
{q.options.map((opt) => (
<label key={opt}>
<input
  type="radio"
  name={`q${i}`}
  onChange={() => handleAnswer(i, opt)}
/>

{opt}
</label>
))}
</div>
))}
<label>
Post Score to Profile? <input type="checkbox" checked={postScore} onChange={e => setPostScore(e.target.checked)} />
</label><br />
<button onClick={handleSubmit}>Submit</button>
{score !== null && <p>Your score: {score} / {selected.questions.length}</p>}
</>
)}
</div>
</div>
</div>
);
}

export default AssessmentPage;