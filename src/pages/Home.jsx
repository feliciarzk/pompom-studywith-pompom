import { useEffect, useState } from "react";

import Background from "./Background";
import Pompom from "../components/Pompom";
import Controls from "../components/Controls";
import Sidebar from "../components/Sidebar";

import { addSession } from "../utils/storage";
import { useSound } from "../context/SoundContext";
import useIsMobile from "../hooks/useIsMobile";

const QUOTES = [
  "You can totally do this 🌟",
  "Focus on progress, not perfection.",
  "One pomodoro at a time 🍅",
  "Small steps still move you forward.",
  "Deep work, deep rest.",
];

const AMBIENCE_TRACKS = [{ id: "rain", label: "Rain" }];

function Home() {
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const isMobile = useIsMobile();
  const { musicOn, activeAmbience, toggleMusic, toggleAmbience } = useSound();

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [quote] = useState(
    QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (mode === "focus") {
            addSession(25);
            setMode("break");
            return BREAK_TIME;
          }

          setMode("focus");
          return FOCUS_TIME;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    if (newMode === "focus") {
      setMode("focus");
      setTimeLeft(FOCUS_TIME);
    } else {
      setMode("break");
      setTimeLeft(BREAK_TIME);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const handleSkip = () => {
    switchMode(mode === "focus" ? "break" : "focus");
  };

  return (
    <>
      <Background />
      <Sidebar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
          padding: isMobile ? "1.25rem 1rem 6rem" : "2rem",
        }}
      >
        <div
          style={{
            width: "600px",
            maxWidth: "100%",
            background: "rgba(255,255,255,.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,.4)",
            borderRadius: isMobile ? "28px" : "40px",
            padding: isMobile ? "1.5rem 1.25rem" : "2.25rem 2rem",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,.12)",
          }}
        >
          <p
            style={{
              color: "#8B5E3C",
              fontStyle: "italic",
              fontSize: isMobile ? ".9rem" : "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {quote}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <button
              onClick={() => switchMode("focus")}
              style={{
                ...modeBtn,
                background: mode === "focus" ? "#FFB86C" : "#F6EFE8",
              }}
            >
              Focus
            </button>

            <button
              onClick={() => switchMode("break")}
              style={{
                ...modeBtn,
                background: mode === "break" ? "#FFB86C" : "#F6EFE8",
              }}
            >
              Break
            </button>
          </div>

          <h2
            style={{
              fontSize: isMobile ? "3.2rem" : "5rem",
              color: "#4A2F1D",
              margin: ".5rem 0",
            }}
          >
            {formatTime(timeLeft)}
          </h2>

          <p style={{ color: "#8B5E3C", marginBottom: "1.5rem" }}>
            {mode === "focus" ? "Focus Time" : "Break Time"}
          </p>

          <Controls
            onStart={() => setIsRunning(true)}
            onPause={() => setIsRunning(false)}
            onReset={handleReset}
            onSkip={handleSkip}
          />

          <div style={{ marginTop: "1.5rem" }}>
            <p style={soundLabel}>Music</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: ".6rem",
                marginBottom: "1rem",
              }}
            >
              <button
                onClick={toggleMusic}
                style={{
                  ...soundBtn,
                  background: musicOn ? "#FFB86C" : "#F6EFE8",
                }}
              >
                {musicOn ? "⏸ Piano" : "▶ Piano"}
              </button>
            </div>

            <p style={soundLabel}>Background Ambience</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: ".6rem",
                flexWrap: "wrap",
              }}
            >
              {AMBIENCE_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => toggleAmbience(track.id)}
                  style={{
                    ...soundBtn,
                    background:
                      activeAmbience === track.id ? "#FFB86C" : "#F6EFE8",
                  }}
                >
                  {activeAmbience === track.id
                    ? `⏸ ${track.label}`
                    : `▶ ${track.label}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            transform: isMobile ? "scale(.6)" : "scale(.75)",
          }}
        >
          <Pompom />
        </div>
      </div>
    </>
  );
}

const modeBtn = {
  border: "none",
  padding: ".8rem 1.2rem",
  borderRadius: "999px",
  cursor: "pointer",
};

const soundLabel = {
  fontSize: ".75rem",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#B79A82",
  marginBottom: ".5rem",
};

const soundBtn = {
  border: "none",
  color: "#4A2F1D",
  padding: ".6rem 1.1rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: ".85rem",
  fontWeight: 500,
};

export default Home;