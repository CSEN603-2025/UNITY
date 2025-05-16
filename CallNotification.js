import React from "react";
import "./CallNotification.css";

const CallNotification = ({ onAccept, onReject }) => (
  <div className="notification">
    📞 Incoming call from SCAD Officer...
    <div>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  </div>
);

export default CallNotification;
