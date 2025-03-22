import styles from "./Timer.module.css";
import { SelectTimer } from "./SelectTimer";
import { Clock } from "./Clock";
import { useState } from "react";

export const Timer = () => {
  const [timer, setTimer] = useState<number>(25);

  return (
    <div className={styles.container}>
      <div>
        <SelectTimer setTimer={setTimer} />
      </div>
      <div>
        <Clock initialValue={timer} />
      </div>
    </div>
  );
};
