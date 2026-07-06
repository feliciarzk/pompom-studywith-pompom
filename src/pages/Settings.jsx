import { useState } from "react";

import Background from "./Background";
import Sidebar from "../components/Sidebar";
import { useSound } from "../context/SoundContext";
import useIsMobile from "../hooks/useIsMobile";

function Settings() {
  const stored = JSON.parse(localStorage.getItem("pompom_settings") || "{}");
  const isMobile = useIsMobile();
  const { refreshVolumes } = useSound();

  const [focusTime, setFocusTime] = useState(stored.focusTime ?? 25);
  const [breakTime, setBreakTime] = useState(stored.breakTime ?? 5);
  const [alarmVolume, setAlarmVolume] = useState(stored.alarmVolume ?? 70);
  const [pianoVolume, setPianoVolume] = useState(stored.pianoVolume ?? 40);
  const [rainVolume, setRainVolume] = useState(stored.rainVolume ?? 40);

  const updateSetting = (key, value, setter, refreshSound = false) => {
    setter(value);

    const current = JSON.parse(localStorage.getItem("pompom_settings") || "{}");
    current[key] = Number(value);
    localStorage.setItem("pompom_settings", JSON.stringify(current));

    if (refreshSound) {
      refreshVolumes();
    }
  };

  return (
    <>
      <Background />
      <Sidebar />

      <div
        style={{
          minHeight: "100vh",
          padding: isMobile ? "1.5rem 1rem 6rem" : "3rem",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "700px",
            maxWidth: "100%",
            background: "rgba(255,255,255,.82)",
            backdropFilter: "blur(14px)",
            borderRadius: isMobile ? "24px" : "35px",
            padding: isMobile ? "1.5rem" : "2.5rem",
            boxShadow: "0 15px 40px rgba(0,0,0,.1)",
          }}
        >
          <h1 style={{ color: "#4A2F1D", marginBottom: "2rem" }}>Settings</h1>

          <div style={section}>
            <label style={label}>Focus Duration</label>
            <input
              type="range"
              min="15"
              max="90"
              value={focusTime}
              onChange={(e) => updateSetting("focusTime", e.target.value, setFocusTime)}
              style={slider}
            />
            <p style={valueText}>{focusTime} minutes</p>
          </div>

          <div style={section}>
            <label style={label}>Break Duration</label>
            <input
              type="range"
              min="3"
              max="30"
              value={breakTime}
              onChange={(e) => updateSetting("breakTime", e.target.value, setBreakTime)}
              style={slider}
            />
            <p style={valueText}>{breakTime} minutes</p>
          </div>

          <div style={section}>
            <label style={label}>Alarm Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={alarmVolume}
              onChange={(e) => updateSetting("alarmVolume", e.target.value, setAlarmVolume)}
              style={slider}
            />
            <p style={valueText}>{alarmVolume}%</p>
          </div>

          <div style={section}>
            <label style={label}>Piano Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={pianoVolume}
              onChange={(e) =>
                updateSetting("pianoVolume", e.target.value, setPianoVolume, true)
              }
              style={slider}
            />
            <p style={valueText}>{pianoVolume}%</p>
          </div>

          <div style={section}>
            <label style={label}>Rain Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={rainVolume}
              onChange={(e) =>
                updateSetting("rainVolume", e.target.value, setRainVolume, true)
              }
              style={slider}
            />
            <p style={valueText}>{rainVolume}%</p>
          </div>
        </div>
      </div>
    </>
  );
}

const section = {
  marginBottom: "2rem",
};

const label = {
  display: "block",
  marginBottom: ".7rem",
  fontWeight: "600",
  color: "#4A2F1D",
};

const valueText = {
  color: "#8B5E3C",
  fontSize: ".9rem",
  marginTop: ".4rem",
};

const slider = {
  width: "100%",
};

export default Settings;