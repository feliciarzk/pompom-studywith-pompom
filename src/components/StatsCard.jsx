function StatsCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#FFF8F2",
        borderRadius: "20px",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#4A2F1D",
          margin: ".5rem 0",
        }}
      >
        {value}
      </h3>

      <p
        style={{
          color: "#8B5E3C",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default StatsCard;