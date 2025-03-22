import { Dispatch, SetStateAction, useState } from "react";
import { ExpandedTodo } from "../ExpandedTodo/ExpandedTodo";

interface Todo {
  id: UUID;
  task: string;
  isDone: number;
}
import styles from "./TodoCard.module.css";
import image from "../../../assets/excluir.png";
import edit from "../../../assets/editing.png";
import axios from "axios";
import { UUID } from "crypto";

interface TodoCardProps {
  id: UUID;
  task: string;
  isDone: number;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  isHistoryPage: boolean;
  setChanged: () => void;
}

export const TodoCard = ({
  task,
  id,
  isDone,
  setTodos,
  isHistoryPage,
  setChanged,
}: TodoCardProps) => {
  const [checked, setChecked] = useState<boolean>(isDone === 1);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = () => {
    const newIsDone = checked ? false : true;
    setChecked(() => newIsDone);

    updateIsDone(newIsDone);
  };

  const updateIsDone = async (newIsDone: boolean) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/todos/${id.toString()}`, {
        task: task,
        isDone: newIsDone ? 1 : 0,
      });
      if (response.status == 200) {
        console.log("Atualizado com sucesso");
      }
    } catch (error) {
      console.error("Error updating isDone todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/todos/${id.toString()}`);
      if (response.status == 204) {
        console.log("Deletado com sucesso");
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.options}>
        {!isHistoryPage && (
          <div>
            <button className={styles.button} onClick={handleDelete}>
              <img src={image} className={styles.img} alt="Trash Icon" />
            </button>
            <button className={styles.button} onClick={() => setIsEditing(true)}>
              <img src={edit} className={styles.img} alt="Edit Button Icon" />
            </button>
          </div>
        )}
        <div className={styles.check}>
          <input
            type="checkbox"
            disabled={isHistoryPage ? true : false}
            id={id}
            checked={checked}
            onChange={handleChange}
            className={styles.customCheckbox}
          />
          <label htmlFor={id} className={styles.customCheckboxLabel}></label>
        </div>
      </div>
      <textarea
        disabled
        style={{ textDecoration: checked ? "line-through" : "none" }}
        value={task}
        className={styles.textarea}
        maxLength={500}
      />

      {isEditing && (
        <ExpandedTodo
          closeModal={() => setIsEditing(false)}
          initialValue={task}
          isEditing={isEditing}
          id={id}
          isDone={isDone}
          setChanged={setChanged}
        />
      )}
    </div>
  );
};
