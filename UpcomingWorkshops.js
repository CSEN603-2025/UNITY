import React from 'react';

const UpcomingWorkshops = () => {
  const workshops = [
    {
      title: 'Landing Your First Internship',
      date: '2025-06-10',
      time: '15:00',
      speaker: 'Mr. Omar Hossam',
      description: 'Learn how to write resumes and apply to tech internships.'
    },
    {
      title: 'AI Trends in 2025',
      date: '2025-06-20',
      time: '13:00',
      speaker: 'Dr. Rania Ahmed',
      description: 'Explore current applications of AI in industry and how to stay relevant.'
    },
    {
      title: 'Interview Skills Workshop',
      date: '2025-06-25',
      time: '11:00',
      speaker: 'Eng. Khaled Samir',
      description: 'Tips and tricks for excelling in technical and behavioral interviews.'
    }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Upcoming Online Career Workshops</h2>
      <ul style={styles.list}>
        {workshops.map((ws, index) => (
          <li key={index} style={styles.card}>
            <h3 style={styles.title}>{ws.title}</h3>
            <p><strong>Date:</strong> {ws.date} — <strong>Time:</strong> {ws.time}</p>
            <p><strong>Speaker:</strong> {ws.speaker}</p>
            <p style={styles.description}>{ws.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    border: '2px solid red',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '20px auto',
    color: 'black'
  },
  header: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '20px'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  card: {
    backgroundColor: '#fffbe6',
    border: '1px solid black',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '15px'
  },
  title: {
    margin: 0,
    color: 'black'
  },
  description: {
    marginTop: '10px'
  }
};

export default UpcomingWorkshops;
