// src/components/StudentCard.js
import React, { useState } from 'react';
import StudentProfileModal from './StudentProfileModal';
import ReportsModal from './ReportsModal';

export default function StudentCard({ student, themeColors }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showReports, setShowReports] = useState(false);

  return (
    <div className={`border p-4 rounded-xl shadow ${themeColors.bg} ${themeColors.text} ${themeColors.border}`}>
      <h2 className="text-xl font-semibold">{student.name}</h2>
      <p className="text-sm text-gray-600">{student.major}</p>
      <p>Status: <span className={`font-medium ${themeColors.highlight}`}>{student.status}</span></p>
      <div className="mt-3 space-x-2">
        <button onClick={() => setShowProfile(true)} className={`hover:underline ${themeColors.highlight}`}>
          View Profile
        </button>
        <button onClick={() => setShowReports(true)} className={`hover:underline ${themeColors.highlight}`}>
          View Reports
        </button>
      </div>

      {showProfile && (
        <StudentProfileModal student={student} onClose={() => setShowProfile(false)} themeColors={themeColors} />
      )}
      {showReports && (
        <ReportsModal reports={student.reports} onClose={() => setShowReports(false)} themeColors={themeColors} />
      )}
    </div>
  );
}
