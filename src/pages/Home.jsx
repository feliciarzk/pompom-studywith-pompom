import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Background from "./Background";
import Pompom from "../components/Pompom";
import Controls from "../components/Controls";

import { addSession } from "../utils/storage";

const QUOTES = [
  "You can totally do this 🌟",
  "Focus on progress, not perfection.",
  "One pomodoro at a time 🍅",
  "Small steps still move you forward.",
  "Deep work, deep rest.",
];

function Home() {
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const location = useLocation();

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [quote] = useState(
    QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );

  const [musicOn, setMusicOn] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef(null);

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

  const toggleMusic = () => {
    if (!musicOn) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sine";
      osc1.frequency.value = 110;

      osc2.type = "sine";
      osc2.frequency.value = 165;

      filter.type = "lowpass";
      filter.frequency.value = 400;

      gain.gain.value = 0;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);

      audioCtxRef.current = ctx;
      nodesRef.current = { osc1, osc2, gain };
      setMusicOn(true);
    } else {
      const ctx = audioCtxRef.current;
      const { osc1, osc2, gain } = nodesRef.current;

      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);

      setTimeout(() => {
        osc1.stop();
        osc2.stop();
        ctx.close();
      }, 1100);

      setMusicOn(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/stats", label: "Stats" },
    { to: "/settings", label: "Settings" },
  ];

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* TIMER CARD */}
        <div
          style={{
            width: "600px",
            maxWidth: "90%",
            background: "rgba(255,255,255,.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,.4)",
            borderRadius: "40px",
            padding: "2.25rem 2rem",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,.12)",
          }}
        >
          <p
            style={{
              color: "#8B5E3C",
              fontStyle: "italic",
              fontSize: "1rem",
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

          <h2 style={{ fontSize: "5rem", color: "#4A2F1D", margin: ".5rem 0" }}>
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

          <button
            onClick={toggleMusic}
            style={{
              marginTop: "1.5rem",
              border: "none",
              background: musicOn ? "#FFB86C" : "#F6EFE8",
              color: "#4A2F1D",
              padding: ".7rem 1.4rem",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: ".9rem",
              fontWeight: 500,
            }}
          >
            {musicOn ? "Music On — Tap to Stop" : "Play Relaxing Sound"}
          </button>
        </div>

        {/* POMPOM */}
        <div style={{ marginTop: "1rem", transform: "scale(.75)" }}>
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

export default Home;