import { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: Date.now(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  return (
    <div className="flex flex-col items-center justify-center bg-black p-10">
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TodoWrapper;
