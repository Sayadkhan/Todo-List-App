import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState(todos);

  useEffect(() => setFilterTodos(todos), [todos]);
  const [isCompletedSceen, setIsCompletedSceen] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const completedTask = todos.filter((todo) => todo.completed === true);
  const inCompletedTask = todos.filter((todo) => todo.completed === false);

  // function for add todo
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        task: todo,
        completed: false,
        isEditing: false,
      },
    ];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // function for todo complete or incomplete
  const toggleComplete = (id) => {
    const newTodos = todos?.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handlePriorityChange = (e, id) => {
    const newTodos = todos?.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            priority: e.target.value,
          }
        : todo
    );

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // function for open edittodo form
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // function for edit todo task

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // function for remove todo
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handlefilterTodo = (e) => {
    console.log(e.target.value);
    const { value, checked } = e.target;

    if (checked) {
      setFilterTodos((prevState) => {
        return prevState.filter((todo) => todo.priority === value);
      });
    } else {
      setFilterTodos(todos);
    }
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
      {/* Form for add todo task */}
      <TodoForm addTodo={addTodo} />

      {/* Buttons for checking Task is complete or incompleted */}
      <div className=" flex flex-col  md:flex md:flex-row  items-center justify-center gap-5 mt-5">
        <button
          className={`${
            isCompletedSceen === null
              ? `active bg-teal-500 text-gray-900 py-2 px-5  w-full`
              : `bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300 w-full`
          }`}
          onClick={() => setIsCompletedSceen(null)}
        >
          All Todo
        </button>
        <button
          className={`${
            isCompletedSceen === false
              ? `active bg-teal-500 text-gray-900 py-2 px-5  w-full`
              : `bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300 w-full`
          }`}
          onClick={() => setIsCompletedSceen(false)}
        >
          Incomplete Task
        </button>
        <button
          className={`${
            isCompletedSceen === true
              ? `active bg-teal-500 text-gray-900 py-2 px-5  w-full`
              : `bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300 w-full`
          }`}
          onClick={() => setIsCompletedSceen(true)}
        >
          Completed Task
        </button>
      </div>

      {/* Rendaring data Base on complete and incompleted  */}
      {isCompletedSceen === null ? (
        <div>
          {filterTodos.length > 0 ? (
            filterTodos.map((todo) =>
              todo.isEditing ? (
                <EditTodoForm key={todo.id} editTask={editTask} todo={todo} />
              ) : (
                <Todo
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                  handlePriorityChange={handlePriorityChange}
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
        <div>
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
                      handlePriorityChange={handlePriorityChange}
                    />
                  )
                )
              ) : (
                <div className="flex items-center justify-center my-5">
                  <p>There is no Incomplete task </p>
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
                      handlePriorityChange={handlePriorityChange}
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
        </div>
      )}

      {/* Filtering Opstion for Poirotiy */}
      <div className="flex gap-5">
        <div className="low">
          <label>Low</label>
          <input
            onChange={(e) => handlefilterTodo(e)}
            type="checkbox"
            value={"Low"}
          />
        </div>
        <div className="medium">
          <label>Medium</label>
          <input
            onChange={(e) => handlefilterTodo(e)}
            type="checkbox"
            value={"Medium"}
          />
        </div>
        <div className="high">
          <label>High</label>
          <input
            onChange={(e) => handlefilterTodo(e)}
            type="checkbox"
            value={"High"}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoWrapper;
