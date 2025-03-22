import styles from "./Timer.module.css";

interface SelectTimerProps {
  setTimer: (minutes: number) => void;
}

export const SelectTimer = ({ setTimer }: SelectTimerProps) => {
  return (
    <div className={styles.select}>
      <button className={styles.selectButton} onClick={() => setTimer(25)}>
        Pomodoro
      </button>
      <button className={styles.selectButton} onClick={() => setTimer(5)}>
        Short Break
      </button>
      <button className={styles.selectButton} onClick={() => setTimer(10)}>
        Long Break
      </button>
    </div>
  );
};
