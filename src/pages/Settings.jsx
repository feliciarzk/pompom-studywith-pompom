import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Background from "./Background";

function Settings() {
  const stored = JSON.parse(localStorage.getItem("pompom_settings") || "{}");

  const [focusTime, setFocusTime] = useState(stored.focusTime ?? 25);
  const [breakTime, setBreakTime] = useState(stored.breakTime ?? 5);
  const [alarmVolume, setAlarmVolume] = useState(stored.alarmVolume ?? 70);
  const [musicVolume, setMusicVolume] = useState(stored.musicVolume ?? 40);
  const [saved, setSaved] = useState(false);

  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/stats", label: "Stats" },
    { to: "/settings", label: "Settings" },
  ];

  const handleSave = () => {
    const settings = {
      focusTime: Number(focusTime),
      breakTime: Number(breakTime),
      alarmVolume: Number(alarmVolume),
      musicVolume: Number(musicVolume),
    };

    localStorage.setItem("pompom_settings", JSON.stringify(settings));

    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <>
      <Background />

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          left: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "200px",
          background: "rgba(255,255,255,.7)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "1.75rem 1.25rem",
          boxShadow: "0 10px 40px rgba(0,0,0,.08)",
          border: "1px solid rgba(255,255,255,.5)",
        }}
      >
        <p
          style={{
            color: "#4A2F1D",
            fontWeight: 600,
            fontSize: ".75rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
            opacity: 0.6,
          }}
        >
          PomPom
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
          {navLinks.map((nav) => {
            const active = location.pathname === nav.to;
            return (
              <Link key={nav.to} to={nav.to} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    padding: ".7rem .9rem",
                    borderRadius: "12px",
                    fontSize: ".95rem",
                    fontWeight: active ? 600 : 500,
                    color: active ? "#4A2F1D" : "#9A8578",
                    background: active ? "rgba(255,184,108,.35)" : "transparent",
                    transition: "all .2s ease",
                    cursor: "pointer",
                  }}
                >
                  {nav.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* MAIN */}
      <div
        style={{
          minHeight: "100vh",
          padding: "3rem",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "700px",
            maxWidth: "95%",
            background: "rgba(255,255,255,.82)",
            backdropFilter: "blur(14px)",
            borderRadius: "35px",
            padding: "2.5rem",
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
              onChange={(e) => setFocusTime(e.target.value)}
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
              onChange={(e) => setBreakTime(e.target.value)}
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
              onChange={(e) => setAlarmVolume(e.target.value)}
              style={slider}
            />
            <p style={valueText}>{alarmVolume}%</p>
          </div>

          <div style={section}>
            <label style={label}>Chill Music Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={musicVolume}
              onChange={(e) => setMusicVolume(e.target.value)}
              style={slider}
            />
            <p style={valueText}>{musicVolume}%</p>
          </div>

          <button style={saveBtn} onClick={handleSave}>
            {saved ? "Saved ✓" : "Save Settings"}
          </button>
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

const saveBtn = {
  width: "100%",
  border: "none",
  background: "#FFB86C",
  color: "#4A2F1D",
  padding: "1rem",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "background .2s ease",
};

export default Settings;