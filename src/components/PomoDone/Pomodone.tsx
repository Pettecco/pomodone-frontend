import styles from "./Pomodone.module.css";
import image from "../../assets/pomodoro-technique.png";

export const Pomodone = () => {
  return (
    <div className={styles.container}>
      <img src={image} className={styles.img} alt="Tomato Podomoro Image" />
      <h1 className={styles.h1}>PomoDone</h1>
    </div>
  );
};
