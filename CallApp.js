import React, { useState } from "react";
import CallNotification from "./CallNotification";
import CallControls from "./CallControls";
import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [incomingCall, setIncomingCall] = useState(true);
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [scadLeft, setScadLeft] = useState(false);

  const handleAccept = () => {
    setInCall(true);
    setIncomingCall(false);
    setTimeout(() => {
      setScadLeft(true);
      setInCall(false);
    }, 10000); // SCAD leaves after 10 sec
  };

  const handleReject = () => {
    setIncomingCall(false);
  };

  const handleLeaveCall = () => {
    setInCall(false);
  };

  return (
    <div className="App">
      <h2>SCAD Internship Video Call Simulation</h2>
      <p>Status: {isOnline ? "🟢 SCAD Officer is Online" : "🔴 Offline"}</p>

      {incomingCall && (
        <CallNotification onAccept={handleAccept} onReject={handleReject} />
      )}

      {inCall && (
        <>
          <p>🧑‍💼 You are in a call with SCAD Officer</p>
          <CallControls
            videoEnabled={videoEnabled}
            setVideoEnabled={setVideoEnabled}
            micEnabled={micEnabled}
            setMicEnabled={setMicEnabled}
            screenSharing={screenSharing}
            setScreenSharing={setScreenSharing}
            onLeave={handleLeaveCall}
          />
          {screenSharing && (
            <div className="screen-share-box">
              <p>📺 Screen is being shared</p>
            </div>
          )}
        </>
      )}

      {scadLeft && (
        <div className="scad-left-banner">
          🚪 SCAD Officer has left the call.
        </div>
      )}
    </div>
  );
}

export default App;
