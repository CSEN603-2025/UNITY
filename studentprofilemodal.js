// src/components/StudentProfileModal.js
import React from 'react';

export default function StudentProfileModal({ student, onClose, themeColors }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-xl shadow-lg w-96 relative ${themeColors.bg} ${themeColors.text}`}>
        <button onClick={onClose} className={`absolute top-2 right-2 text-sm ${themeColors.danger}`}>✖</button>
        <h2 className="text-xl font-bold mb-2">{student.name}</h2>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Major:</strong> {student.major}</p>
        <p><strong>Status:</strong> <span className={`${themeColors.highlight}`}>{student.status}</span></p>
      </div>
    </div>
  );
}
