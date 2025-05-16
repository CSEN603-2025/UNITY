import React from "react";
import "./CallControls.css";

const CallControls = ({
  videoEnabled,
  setVideoEnabled,
  micEnabled,
  setMicEnabled,
  screenSharing,
  setScreenSharing,
  onLeave,
}) => {
  return (
    <div className="controls">
      <button onClick={() => setVideoEnabled(!videoEnabled)}>
        {videoEnabled ? "Disable Video" : "Enable Video"}
      </button>
      <button onClick={() => setMicEnabled(!micEnabled)}>
        {micEnabled ? "Mute Mic" : "Unmute Mic"}
      </button>
      <button onClick={() => setScreenSharing(!screenSharing)}>
        {screenSharing ? "Stop Sharing" : "Share Screen"}
      </button>
      <button className="leave" onClick={onLeave}>
        Leave Call
      </button>
    </div>
  );
};

export default CallControls;
