import React, { useState } from 'react';

const ReportGenerator = () => {
  const [showReport, setShowReport] = useState(false);

  const handleGenerate = () => {
    setShowReport(true);
  };

  const reportData = [
    { label: 'Accepted Reports', value: 122 },
    { label: 'Flagged Reports', value: 18 },
    { label: 'Rejected Reports', value: 5 },
    { label: 'Avg. Review Time', value: '3.2 days' },
    { label: 'Top Rated Companies', value: 'IBM, Vodafone, Valeo' },
    { label: 'Most Used Courses', value: 'CSEN 701, DS 401, AI 310' }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Generate Internship Report Summary</h2>
      <button onClick={handleGenerate} style={styles.button}>Generate Report</button>

      {showReport && (
        <div style={styles.reportBox}>
          <h3 style={styles.reportTitle}>📄 Report Preview</h3>
          <ul>
            {reportData.map((item, index) => (
              <li key={index} style={styles.listItem}>
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    maxWidth: '700px',
    margin: '20px auto',
    border: '2px solid red',
    borderRadius: '8px',
    color: 'black',
    textAlign: 'center'
  },
  header: {
    color: 'red',
    marginBottom: '15px'
  },
  button: {
    backgroundColor: 'yellow',
    color: 'black',
    padding: '10px 20px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  reportBox: {
    marginTop: '20px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    border: '1px solid black',
    borderRadius: '6px',
    textAlign: 'left'
  },
  reportTitle: {
    marginBottom: '10px',
    color: 'black'
  },
  listItem: {
    marginBottom: '8px'
  }
};

export default ReportGenerator;
