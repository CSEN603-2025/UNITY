import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { workshops as mockData } from '../data/workshops';

function WorkshopListPage() {
const [workshops, setWorkshops] = useState([]);
const [selected, setSelected] = useState(null);
const [notes, setNotes] = useState('');
const [chatMessages, setChatMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
const [feedback, setFeedback] = useState('');
const [rating, setRating] = useState(5);

useEffect(() => {
setWorkshops(mockData);
}, []);

const handleRegister = (id) => {
const updated = workshops.map(w => w.id === id ? { ...w, registered: true } : w);
setWorkshops(updated);
};

const handleDownloadCertificate = (name) => {
const blob = new Blob([`Certificate of Attendance: ${name}`], { type: 'text/plain' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = `${name}-certificate.txt`;
link.click()

};

const handleJoin = () => {
setChatMessages(['Welcome to the live session!']);
setTimeout(() => {
setChatMessages(prev => [...prev, 'Attendee: Hello!']);
}, 3000);
};

const handleSendMessage = () => {
if (newMessage.trim()) {
setChatMessages(prev => [...prev, `You: ${newMessage}`]);
setNewMessage('');
}
};

const handlePlayVideo = () => {
alert('Video playing...');
};

const handlePauseVideo = () => {
alert('Video paused.');
};

const handleStopVideo = () => {
alert('Video stopped.');
};

return (
<div style={{ display: 'flex' }}>
<Sidebar />
<div style={{ flex: 1 }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h2>Career Workshops</h2>
{!selected ? (
<>
{workshops.map((w) => (
<div key={w.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
<h4>{w.name}</h4>
<p><strong>Speaker:</strong> {w.speaker}</p>
<p><strong>Type:</strong> {w.type}</p>
<p><strong>Agenda:</strong> {w.agenda}</p>
<button onClick={() => setSelected(w)}>View Details</button>
</div>
))}
</>
) : (
<div>
<h3>{selected.name}</h3>
<p><strong>Speaker:</strong> {selected.speaker}</p>
<p>{selected.description}</p>
{!selected.registered ? (
<button onClick={() => handleRegister(selected.id)}>Register</button>
) : (
<>
<h4>Registered ✅</h4>
<h4>Notes</h4>
<textarea
rows={3}
value={notes}
onChange={(e) => setNotes(e.target.value)}
/><br />
<h4>Certificate</h4>
<button onClick={() => handleDownloadCertificate(selected.name)}>Download Certificate</button>
              <h4>Workshop Type</h4>
              {selected.type === 'live' ? (
                <>
                  <button onClick={handleJoin}>Join Live Workshop</button>
                  <div style={{ border: '1px solid #ddd', marginTop: '10px', padding: '10px' }}>
                    {chatMessages.map((msg, i) => (
                      <p key={i}>{msg}</p>
                    ))}
                    <input
                      placeholder="Chat message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={handlePlayVideo}>Play</button>
                  <button onClick={handlePauseVideo}>Pause</button>
                  <button onClick={handleStopVideo}>Stop</button>
                </>
              )}
              <h4>Rate this workshop</h4>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <textarea
                rows={2}
                placeholder="Feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              /><br />
              <button onClick={() => alert('Thanks for your feedback!')}>Submit Feedback</button>
            </>
          )}
          <br /><br />
          <button onClick={() => setSelected(null)}>Back to list</button>
        </div>
      )}
    </div>
  </div>
</div>
);
}

export default WorkshopListPage;