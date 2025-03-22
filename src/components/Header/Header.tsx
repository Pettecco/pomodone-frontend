import { NavLink } from "react-router";
import styles from "./Header.module.css";

interface HeaderProps {
  toggleModal: () => void;
}

export const Header = ({ toggleModal }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="history">History</NavLink>
        <NavLink to="/">Timer</NavLink>
        <a href="javascript:void(0);" onClick={toggleModal}>
          About
        </a>
      </nav>
    </div>
  );
};
