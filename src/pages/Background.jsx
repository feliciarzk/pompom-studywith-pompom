import background from "../assets/animation/background.png";

function Background() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -999,
        overflow: "hidden",
      }}
    >
      <img
        src={background}
        alt="Study Room"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay supaya timer tetap kebaca */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(255,248,240,0.35), rgba(255,248,240,0.35))",
          backdropFilter: "blur(1px)",
        }}
      />
    </div>
  );
}

export default Background;