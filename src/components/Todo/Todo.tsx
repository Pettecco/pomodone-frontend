import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Todo.module.css";
import image from "../../assets/to-do-list.png";
import addButton from "../../assets/add-button.png";
import { TodoCard } from "./TodoCard/TodoCard";
import { UUID } from "crypto";
import { ExpandedTodo } from "./ExpandedTodo/ExpandedTodo";

interface Todo {
  id: UUID;
  task: string;
  isDone: number;
}

interface TodoProps {
  isHistoryPage: boolean;
}

export const Todo = ({ isHistoryPage }: TodoProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [openExpandedTodo, setOpenExpandedTodo] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    setTodos([]);
    if (isHistoryPage) {
      fetchDeletedTodos();
    } else {
      fetchTodos();
    }
  }, [isHistoryPage, openExpandedTodo, isChanged]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/todos");
      setTodos(response.data as Todo[]);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const fetchDeletedTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/todos/deleted");
      setTodos(response.data as Todo[]);
    } catch (error) {
      console.error("Error fetching deleted todos:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={image} className={styles.img} alt="To-do List Image" />
        <h1 className={styles.h1}>To-Do List</h1>
        {!isHistoryPage && (
          <button className={styles.button} onClick={() => setOpenExpandedTodo(true)}>
            <img src={addButton} className={styles.img} alt="Add Button Icon" />
          </button>
        )}
      </div>

      <div>
        {todos.map((todo) => (
          <TodoCard
            isHistoryPage={isHistoryPage}
            key={todo.id}
            id={todo.id}
            task={todo.task}
            isDone={todo.isDone}
            setTodos={setTodos}
            setChanged={() => setIsChanged(!isChanged)}
          />
        ))}
      </div>
      {openExpandedTodo && (
        <ExpandedTodo
          closeModal={() => setOpenExpandedTodo(false)}
          initialValue=""
          isEditing={false}
        />
      )}
    </div>
  );
};
