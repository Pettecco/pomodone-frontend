import { useEffect, useState } from "react";
import { Timer } from "../Timer/Timer";
import { Todo } from "../Todo/Todo";
import styles from "./Home.module.css";
import { useLocation } from "react-router";

export const Home = () => {
  const locator = useLocation();

  const [isHistoryPage, setIsHistoryPage] = useState<boolean>(false);

  useEffect(() => {
    setIsHistoryPage(locator.pathname === "/history");
  }, [locator]);

  return (
    <div className={styles.home}>
      <div>
        <Timer />
      </div>
      <div className={styles.todo}>
        <Todo isHistoryPage={isHistoryPage} />
      </div>
    </div>
  );
};
