import Background from "./Background";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import { getStats } from "../utils/storage";
import useIsMobile from "../hooks/useIsMobile";

function Stats() {
  const stats = getStats();
  const isMobile = useIsMobile();

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
            width: "950px",
            maxWidth: "100%",
            background: "rgba(255,255,255,.82)",
            backdropFilter: "blur(14px)",
            borderRadius: isMobile ? "24px" : "35px",
            padding: isMobile ? "1.5rem" : "2.5rem",
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
              gridTemplateColumns: isMobile
                ? "repeat(2,1fr)"
                : "repeat(auto-fit,minmax(200px,1fr))",
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