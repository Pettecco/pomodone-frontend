import styles from "./ExpandedTodo.module.css";
import image from "../../../assets/remove.png";
import { useState } from "react";
import axios from "axios";
import { UUID } from "crypto";
interface ExpandedTodoProps {
  id?: UUID;
  isDone?: number;
  initialValue: string;
  isEditing: boolean;
  closeModal: () => void;
  setChanged?: () => void;
}

export const ExpandedTodo = ({
  closeModal,
  initialValue,
  isEditing,
  id,
  isDone,
  setChanged,
}: ExpandedTodoProps) => {
  const [task, setTask] = useState<string>(initialValue);

  const handleSubmit = async () => {
    if (!isEditing) {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/todos", {
          task: task,
          isDone: 0,
        });
        if (response.status == 201) {
          console.log("Todo criado com sucesso!");
        }
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    } else {
      try {
        const response = await axios.put(`http://localhost:3000/api/v1/todos/${id?.toString()}`, {
          task: task,
          isDone: isDone,
        });
        if (response.status == 200 || response.status == 204) {
          if (setChanged) {
            setChanged();
          }
          console.log("Todo atualizado com sucesso!");
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <button className={styles.button} onClick={() => closeModal()}>
        <img src={image} className={styles.icon} alt="Close Modal Icon" />
      </button>
      <p style={{ fontSize: "18px" }}> {isEditing ? "Edit To-Do" : "New To-Do"}</p>
      <textarea
        className={styles.textarea}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        maxLength={500}
        autoFocus
      />
      <div className={styles.actions}>
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
        <p className={styles.lenght}>{task.length}/500</p>
      </div>
    </div>
  );
};
