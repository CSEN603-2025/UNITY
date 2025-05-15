// src/components/StatusFilter.js
import React from 'react';

export default function StatusFilter({ value, onChange }) {
  return (
    <select
      className="border px-3 py-1 rounded text-black bg-white border-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Statuses</option>
      <option value="Enrolled">Enrolled</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
    </select>
  );
}
