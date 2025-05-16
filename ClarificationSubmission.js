import React, { useState } from 'react';

const ClarificationSubmission = () => {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Submit Clarification</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter clarification for flagged/rejected report..."
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {submitted && <p style={styles.confirmation}>Clarification submitted!</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    border: '2px solid red',
    borderRadius: '8px',
    color: 'black',
    maxWidth: '600px',
    margin: '20px auto'
  },
  header: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textarea: {
    padding: '10px',
    borderColor: 'black',
    minHeight: '120px',
    fontSize: '16px',
    marginBottom: '10px',
    resize: 'vertical'
  },
  button: {
    backgroundColor: 'yellow',
    color: 'black',
    border: 'none',
    padding: '10px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  confirmation: {
    marginTop: '10px',
    color: 'green'
  }
};

export default ClarificationSubmission;
