import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // const combinedData = todos.map((todo) => ({
  //   ...todo,
  //   completeTask: todo.filter((product) => product.category_id === category.id),
  // }));

  const completedTask = todos.filter((todo) => todo.completed === true);
  console.log(completedTask);

  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: Date.now(), task: todo, completed: false, isEditing: false },
    ];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="flex flex-col  justify-center  p-10">
      <div className="flex justify-between">
        <div className="flex gap-5 my-5">
          <span>Total Task : </span>
          <span>{todos.length}</span>
        </div>
        <div className="flex gap-5 my-5">
          <span>Completed Task : </span>
          <span>{completedTask.length}</span>
        </div>
      </div>
      <TodoForm addTodo={addTodo} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTask={editTask} todo={todo} />
        ) : (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
