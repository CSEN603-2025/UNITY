// src/pages/StudentManagement.js
import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/studentService';
import StudentCard from '../components/StudentCard';
import StatusFilter from '../components/StatusFilter';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const filteredStudents = students.filter(student =>
    !statusFilter || student.status === statusFilter
  );

  return (
    <div className="p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">Student Management</h1>
      <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredStudents.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}
