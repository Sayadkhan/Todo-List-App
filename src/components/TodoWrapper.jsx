import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  // const [completeTask, setCompleteTask] = useState([]);
  // console.log(completeTask);

  const [isCompletedSceen, setIsCompletedSceen] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // const combinedData = todos.map((todo) => ({
  //   ...todo,
  //   completeTask: todo.filter((product) => product.category_id === category.id),
  // }));

  const completedTask = todos.filter((todo) => todo.completed === true);
  const inCompletedTask = todos.filter((todo) => todo.completed === false);

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
        <div className="flex gap-3 my-5">
          <span>Total Task : </span>
          <span>{todos.length}</span>
        </div>
        <div className="flex gap-3 my-5">
          <span>Completed Task : </span>
          <span>{completedTask.length}</span>
        </div>
      </div>
      <TodoForm addTodo={addTodo} />
      <div className=" flex flex-col  md:flex md:flex-row  items-center justify-center gap-5 mt-5">
        <button
          className={`bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300 w-full ${
            isCompletedSceen === null && "active bg-teal-500 text-gray-900"
          }`}
          onClick={() => setIsCompletedSceen(null)}
        >
          All Todo
        </button>
        <button
          className={`bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300 w-full ${
            isCompletedSceen === false && "active bg-teal-500 text-gray-900"
          }`}
          onClick={() => setIsCompletedSceen(false)}
        >
          incomplete Task
        </button>
        <button
          className={`bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300 w-full ${
            isCompletedSceen === true &&
            "active active bg-teal-500 text-gray-900"
          }`}
          onClick={() => setIsCompletedSceen(true)}
        >
          Completed Task
        </button>
      </div>

      {isCompletedSceen === null ? (
        <div>
          {todos.length > 0 ? (
            todos.map((todo) =>
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
            )
          ) : (
            <div className="flex items-center justify-center my-5">
              <p>There is no todo</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {!isCompletedSceen ? (
            <div>
              {inCompletedTask.length > 0 ? (
                inCompletedTask.map((todo) =>
                  todo.isEditing ? (
                    <EditTodoForm
                      key={todo.id}
                      editTask={editTask}
                      todo={todo}
                    />
                  ) : (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                      toggleComplete={toggleComplete}
                    />
                  )
                )
              ) : (
                <div className="flex items-center justify-center my-5">
                  <p>There is no incomplete task </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {completedTask.length > 0 ? (
                completedTask.map((todo) =>
                  todo.isEditing ? (
                    <EditTodoForm
                      key={todo.id}
                      editTask={editTask}
                      todo={todo}
                    />
                  ) : (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                      toggleComplete={toggleComplete}
                    />
                  )
                )
              ) : (
                <div className="flex items-center justify-center my-5">
                  <p>There is no complete task </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoWrapper;
