import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { courses } from '../data/courses';

function CoursesPage() {
const [selected, setSelected] = useState([]);

const major = localStorage.getItem('major');
const available = courses[major] || [];

useEffect(() => {
const saved = JSON.parse(localStorage.getItem('selectedCourses')) || [];
setSelected(saved);
}, []);

const toggleCourse = (course) => {
const updated = selected.includes(course)
? selected.filter(c => c !== course)
: [...selected, course];
setSelected(updated);
localStorage.setItem('selectedCourses', JSON.stringify(updated));
};

return (
<div style={{ display: 'flex' }}>
<Sidebar />
<div style={{ flex: 1 }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h2>Courses That Helped During Internship</h2>
{available.map((course) => (
<div key={course}>
<input
type="checkbox"
checked={selected.includes(course)}
onChange={() => toggleCourse(course)}
/>
{course}
</div>
))}
</div>
</div>
</div>
);
}

export default CoursesPage;