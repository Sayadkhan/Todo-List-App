import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

const Todo = ({
  todo,
  toggleComplete,
  deleteTodo,
  editTodo,
  handlePriorityChange,
}) => {
  return (
    <div className="bg-gray-900 flex flex-col gap-3 md:flex md:flex-row md:justify-between w-full mt-5 py-10 px-3">
      {/* <p>{todo?.task}</p> */}

      <div className="flex flex-col">
        {todo.completed ? (
          <div className="flex flex-col ">
            <span className=" font-bold text-lg">{todo.task}</span>
            <span className="text-sm text-green-500">Task is completed</span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="font-bold text-lg">{todo.task}</span>
            <span className="text-sm text-red-500">Task is incomplete</span>
          </div>
        )}
      </div>

      <div className=" flex gap-3 items-center  my-3">
        <button
          className={`${
            todo.priority === "Low"
              ? "w-4 h-4 object-cover border-[2px] rounded-full bg-red-500"
              : "w-4 h-4 object-cover border-[2px] rounded-full"
          }`}
          value="Low"
          onClick={(e) => handlePriorityChange(e, todo.id)}
        ></button>
        <button
          className={`${
            todo.priority === "Medium"
              ? "w-4 h-4 object-cover border-[2px] rounded-full bg-yellow-500"
              : "w-4 h-4 object-cover border-[2px] rounded-full"
          }`}
          value="Medium"
          onClick={(e) => handlePriorityChange(e, todo.id)}
        ></button>
        <button
          className={`${
            todo.priority === "High"
              ? "w-4 h-4 object-cover border-[2px] rounded-full bg-green-500"
              : "w-4 h-4 object-cover border-[2px] rounded-full"
          }`}
          value="High"
          onClick={(e) => handlePriorityChange(e, todo.id)}
        ></button>
      </div>

      <div className="flex gap-5">
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? <GrCompliance /> : <RxCross1 />}
        </button>

        <button
          className="hover:text-green-500 duration-300"
          onClick={() => editTodo(todo.id)}
        >
          <LuClipboardEdit />
        </button>
        <button
          className="hover:text-red-500 duration-300"
          onClick={() => deleteTodo(todo.id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Todo;
