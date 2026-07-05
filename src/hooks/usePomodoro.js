import { useEffect, useState } from "react";

export default function usePomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}