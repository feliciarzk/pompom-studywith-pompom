import usePomodoro from "../hooks/usePomodoro";
import { formatTime } from "../utils/formatTime";

function Timer() {
  const {
    timeLeft,
    start,
    pause,
    reset,
  } = usePomodoro();

  return (
    <div className="timer-card">
      <h2>{formatTime(timeLeft)}</h2>

      <div className="buttons">
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;