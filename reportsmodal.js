// src/components/ReportsModal.js
import React from 'react';

export default function ReportsModal({ reports, onClose, themeColors }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-xl shadow-lg w-96 relative ${themeColors.bg} ${themeColors.text}`}>
        <button onClick={onClose} className={`absolute top-2 right-2 text-sm ${themeColors.danger}`}>✖</button>
        <h2 className="text-xl font-bold mb-3">Submitted Reports</h2>
        <ul className="space-y-2">
          {reports.map((report, index) => (
            <li key={index} className="border p-2 rounded">
              <strong>{report.title}</strong><br />
              <span className="text-sm text-gray-600">{report.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
