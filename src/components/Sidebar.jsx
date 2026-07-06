import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/stats", label: "Stats" },
  { to: "/settings", label: "Settings" },
];

function Sidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,.06)",
          display: "flex",
          justifyContent: "space-around",
          padding: ".8rem 0",
          zIndex: 50,
        }}
      >
        {navLinks.map((nav) => {
          const active = location.pathname === nav.to;
          return (
            <Link key={nav.to} to={nav.to} style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontSize: ".8rem",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#4A2F1D" : "#9A8578",
                  padding: ".4rem .9rem",
                  borderRadius: "999px",
                  background: active ? "rgba(255,184,108,.35)" : "transparent",
                }}
              >
                {nav.label}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
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
        zIndex: 50,
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
  );
}

export default Sidebar;