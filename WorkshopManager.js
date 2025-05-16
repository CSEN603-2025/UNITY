import React, { useState } from 'react';

const WorkshopManager = () => {
  const [workshops, setWorkshops] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', time: '', speaker: '', description: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...workshops];
      updated[editingIndex] = form;
      setWorkshops(updated);
      setEditingIndex(null);
    } else {
      setWorkshops([...workshops, form]);
    }
    setForm({ title: '', date: '', time: '', speaker: '', description: '' });
  };

  const handleEdit = (index) => {
    setForm(workshops[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...workshops];
    updated.splice(index, 1);
    setWorkshops(updated);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Career Workshops</h2>
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          name="title"
          placeholder="Workshop Title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="speaker"
          placeholder="Speaker"
          value={form.speaker}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          {editingIndex !== null ? 'Update Workshop' : 'Add Workshop'}
        </button>
      </form>

      <h3 style={styles.subheader}>Existing Workshops</h3>
      <ul style={styles.list}>
        {workshops.map((ws, index) => (
          <li key={index} style={styles.listItem}>
            <strong>{ws.title}</strong> — {ws.date} at {ws.time}<br />
            <em>Speaker:</em> {ws.speaker}<br />
            <em>Description:</em> {ws.description}<br />
            <button onClick={() => handleEdit(index)} style={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
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
    marginBottom: '15px',
    textAlign: 'center'
  },
  subheader: {
    marginTop: '30px',
    color: 'black'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    borderColor: 'black',
    borderRadius: '4px',
    fontSize: '16px'
  },
  textarea: {
    padding: '10px',
    borderColor: 'black',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '80px',
    resize: 'vertical'
  },
  button: {
    backgroundColor: 'yellow',
    color: 'black',
    padding: '10px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid black',
    borderRadius: '6px'
  },
  editButton: {
    marginRight: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer'
  }
};

export default WorkshopManager;
