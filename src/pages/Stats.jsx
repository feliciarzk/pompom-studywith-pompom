import { Link, useLocation } from "react-router-dom";

import Background from "./Background";
import StatsCard from "../components/StatsCard";
import { getStats } from "../utils/storage";

function Stats() {
  const location = useLocation();
  const stats = getStats();

  const productivity = Math.min(100, Math.round(stats.sessions * 2));

  const level =
    stats.sessions >= 100
      ? "Master"
      : stats.sessions >= 50
      ? "Advanced"
      : stats.sessions >= 20
      ? "Intermediate"
      : "Beginner";

  const achievements = [
    { text: "First Focus Session", unlocked: stats.sessions >= 1 },
    { text: "Study Streak", unlocked: stats.sessions >= 5 },
    { text: "Productivity Hero", unlocked: productivity >= 50 },
    { text: "Focus Master", unlocked: stats.sessions >= 20 },
  ];

  const weeklyData = [
    { label: "Monday", value: 75 },
    { label: "Tuesday", value: 55 },
    { label: "Wednesday", value: 90 },
    { label: "Thursday", value: 65 },
    { label: "Friday", value: 80 },
    { label: "Saturday", value: 45 },
    { label: "Sunday", value: 60 },
  ];

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
          padding: "3rem",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "950px",
            maxWidth: "95%",
            background: "rgba(255,255,255,.82)",
            backdropFilter: "blur(14px)",
            borderRadius: "35px",
            padding: "2.5rem",
            boxShadow: "0 15px 40px rgba(0,0,0,.1)",
          }}
        >
          <h1 style={{ color: "#4A2F1D", marginBottom: "2rem" }}>
            Statistics
          </h1>

          {/* OVERVIEW */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "1rem",
            }}
          >
            <StatsCard
              title="Focus Hours"
              value={`${stats.totalHours.toFixed(1)}h`}
            />

            <StatsCard title="Sessions" value={stats.sessions} />

            <StatsCard title="Productivity" value={`${productivity}%`} />

            <StatsCard title="Level" value={level} />
          </div>

          {/* WEEKLY */}
          <div style={{ marginTop: "2.5rem" }}>
            <h2 style={{ color: "#4A2F1D", marginBottom: "1rem" }}>
              Weekly Progress
            </h2>

            {weeklyData.map((day) => (
              <ProgressBar key={day.label} label={day.label} value={day.value} />
            ))}
          </div>

          {/* ACHIEVEMENTS */}
          <div style={{ marginTop: "2.5rem" }}>
            <h2 style={{ color: "#4A2F1D", marginBottom: "1rem" }}>
              Achievements
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem" }}>
              {achievements.map((a) => (
                <Badge key={a.text} text={a.text} unlocked={a.unlocked} />
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div
            style={{
              marginTop: "2rem",
              background: "#FFF4E8",
              padding: "1.5rem",
              borderRadius: "20px",
            }}
          >
            <h3 style={{ color: "#4A2F1D", marginBottom: ".5rem" }}>
              Today's Summary
            </h3>

            <p style={{ color: "#6B4E3D" }}>
              Total focus time: <strong>{stats.totalHours.toFixed(1)}h</strong>{" "}
              across <strong>{stats.sessions}</strong> completed sessions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: ".4rem",
          color: "#6B4E3D",
          fontSize: ".9rem",
        }}
      >
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div
        style={{
          height: "10px",
          background: "#ECECEC",
          borderRadius: "999px",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: "#FFB86C",
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  );
}

function Badge({ text, unlocked }) {
  return (
    <div
      style={{
        background: unlocked ? "#FFF4E8" : "#F1F1F1",
        padding: ".7rem 1.1rem",
        borderRadius: "999px",
        color: unlocked ? "#4A2F1D" : "#B5AFA9",
        fontWeight: 500,
        fontSize: ".9rem",
      }}
    >
      {text}
    </div>
  );
}

export default Stats;