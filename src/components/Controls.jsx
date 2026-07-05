import { useEffect, useRef, useState } from "react";

function Controls({ onStart, onPause, onReset, onSkip }) {
  const [flash, setFlash] = useState("start"); // default: Start kuning duluan
  const touched = useRef(false); // belum ada interaksi

  useEffect(() => {
    if (!touched.current) return; // skip di render pertama (biar Start tetep kuning nempel dulu)

    const timer = setTimeout(() => {
      setFlash(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [flash]);

  const handleClick = (name, action) => {
    touched.current = true;
    setFlash(name);
    action();
  };

  const btnStyle = (name) => ({
    ...secondaryBtn,
    background: flash === name ? "#FFB86C" : "#F6EFE8",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: ".8rem",
        flexWrap: "wrap",
      }}
    >
      <button
        style={btnStyle("start")}
        onClick={() => handleClick("start", onStart)}
      >
        ▶ Start
      </button>

      <button
        style={btnStyle("pause")}
        onClick={() => handleClick("pause", onPause)}
      >
        ⏸ Pause
      </button>

      <button
        style={btnStyle("reset")}
        onClick={() => handleClick("reset", onReset)}
      >
        ↺ Reset
      </button>

      <button
        style={btnStyle("skip")}
        onClick={() => handleClick("skip", onSkip)}
      >
        ⏭ Skip
      </button>
    </div>
  );
}

const secondaryBtn = {
  border: "none",
  padding: "1rem 1.4rem",
  borderRadius: "14px",
  cursor: "pointer",
};

export default Controls;