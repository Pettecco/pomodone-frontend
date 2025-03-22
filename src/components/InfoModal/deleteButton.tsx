import styles from "./InfoModal.module.css";
import image from "../../assets/remove.png";

interface DeleteButtonProps {
  closeModal: () => void;
}

export const DeleteButton = ({ closeModal }: DeleteButtonProps) => {
  return (
    <button onClick={closeModal} className={styles.close}>
      <img src={image} alt="" className={styles.icon} />
    </button>
  );
};
