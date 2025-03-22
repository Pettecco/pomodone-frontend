import { useState, useRef, useEffect } from "react";
import styles from "./Timer.module.css";
import alarmAudio from "../../assets/alarm.wav";

interface ClockProps {
  initialValue: number;
}

export const Clock = ({ initialValue }: ClockProps) => {
  const [timer, setTimer] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timeInterval = useRef<NodeJS.Timeout | null>(null);
  const [startHover, setStartHover] = useState<boolean>(false);
  const [stopHover, setStopHover] = useState<boolean>(false);
  const [resetHover, setResetHover] = useState<boolean>(false);

  const alarmSound = useRef(new Audio(alarmAudio));

  useEffect(() => {
    if (timer === 0) {
      alarmSound.current.play();
      setTimer(initialValue * 60);
    }
  }, [initialValue, timer]);

  useEffect(() => {
    setTimer(initialValue * 60);
  }, [initialValue]);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    timeInterval.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(timeInterval.current!);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (timeInterval.current) clearInterval(timeInterval.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(initialValue * 60);
    if (timeInterval.current) clearInterval(timeInterval.current);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <div>
        <h1 className={styles.h1}>{formatTime(timer)}</h1>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleStart}
            className={styles.button}
            style={{
              backgroundColor: startHover ? "#66bb6a" : "#81c784",
            }}
            onMouseEnter={() => setStartHover(true)}
            onMouseLeave={() => setStartHover(false)}
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className={styles.button}
            style={{
              backgroundColor: stopHover ? "#ef5350" : "#e57373",
            }}
            onMouseEnter={() => setStopHover(true)}
            onMouseLeave={() => setStopHover(false)}
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className={styles.button}
            style={{
              backgroundColor: resetHover ? "#ffeb3b" : "#fff176",
            }}
            onMouseEnter={() => setResetHover(true)}
            onMouseLeave={() => setResetHover(false)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
