import { useEffect, useState } from "react";
import styles from "./InfoModal.module.css";
import { DeleteButton } from "./deleteButton";

interface InfoModalProps {
  closeModal: () => void;
}

export const InfoModal = ({ closeModal }: InfoModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <div className={`${styles.container} ${isVisible ? styles.show : ""}`}>
      <div className={styles.button}>
        <DeleteButton closeModal={handleCloseModal} />
      </div>
      <div className={styles.info}>
        <section>
          <h2>What is the Pomodoro Technique?</h2>
          <p>
            The Pomodoro Technique is a time management method created by Francesco Cirillo to help
            you work and study more productively. For more information,{" "}
            <a href="https://www.pomodorotechnique.com/" target="_blank">
              click here
            </a>
            .
          </p>
        </section>
        <section>
          <h2>How the Pomodoro Technique Works</h2>
          <p>
            <ul>
              <li>The Pomodoro Technique involves breaking work into intervals</li>
              <li>Typically lasting 25 minutes, followed by short breaks</li>
              <li>These intervals, called "pomodoros," help maintain focus and productivity</li>
              <li>After completing four pomodoros, you take a longer break to recharge</li>
            </ul>
          </p>
        </section>
        <section>
          <h2>What is Pomodone?</h2>
          <p>
            Pomodone is a time management app designed to help you implement the Pomodoro Technique
            in your daily tasks. By integrating with your task management tools, Pomodone helps you
            stay focused and organized while working. It was also built by{" "}
            <a href="https://github.com/Pettecco" target="_blank">
              me
            </a>
            :) to solidify my studies in full-stack web development, using NestJS and React.
          </p>
        </section>
      </div>
    </div>
  );
};
