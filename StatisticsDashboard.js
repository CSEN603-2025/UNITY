import React from 'react';

const StatisticsDashboard = () => {
  const stats = {
    acceptedReports: 122,
    flaggedReports: 18,
    rejectedReports: 5,
    avgReviewTime: "3.2 days",
    topCourses: ["CSEN 701", "DS 401", "AI 310"],
    topRatedCompanies: ["IBM", "Vodafone", "Valeo"],
    topInternshipCompanies: ["IBM", "Vodafone", "Valeo"]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Internship Report Statistics</h2>

      <div style={styles.grid}>
        <StatCard label="✅ Accepted Reports" value={stats.acceptedReports} />
        <StatCard label="⚠️ Flagged Reports" value={stats.flaggedReports} />
        <StatCard label="❌ Rejected Reports" value={stats.rejectedReports} />
        <StatCard label="⏱️ Avg. Review Time" value={stats.avgReviewTime} />
      </div>

      <div style={styles.listSection}>
        <ListSection title="🔥 Most Common Internship Courses" items={stats.topCourses} />
        <ListSection title="⭐ Top Rated Companies" items={stats.topRatedCompanies} />
        <ListSection title="🏢 Top Internship Companies" items={stats.topInternshipCompanies} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div style={styles.card}>
    <p style={styles.label}>{label}</p>
    <h3 style={styles.value}>{value}</h3>
  </div>
);

const ListSection = ({ title, items }) => (
  <div style={styles.list}>
    <h4 style={styles.listTitle}>{title}</h4>
    <ul>
      {items.map((item, index) => (
        <li key={index} style={styles.listItem}>{item}</li>
      ))}
    </ul>
  </div>
);

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    border: '2px solid red',
    borderRadius: '8px',
    maxWidth: '900px',
    margin: '20px auto',
    color: 'black'
  },
  header: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: 'yellow',
    color: 'black',
    padding: '20px',
    width: '200px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid black'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px'
  },
  value: {
    fontSize: '24px',
    marginTop: '10px'
  },
  listSection: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
    flexWrap: 'wrap'
  },
  list: {
    width: '250px',
    backgroundColor: '#f9f9f9',
    border: '1px solid black',
    padding: '15px',
    borderRadius: '8px'
  },
  listTitle: {
    color: 'black',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  listItem: {
    margin: '5px 0'
  }
};

export default StatisticsDashboard;
