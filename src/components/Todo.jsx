import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="bg-gray-900 flex justify-between w-full mt-5 py-10 px-3">
      {/* <p>{todo?.task}</p> */}
      <div className="flex gap-5">
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? <GrCompliance /> : <RxCross1 />}
        </button>

        <div className="flex flex-col">
          {todo.completed ? (
            <div className="flex flex-col ">
              <span className="line-through decoration-[3px] decoration-red-500 font-bold text-lg">
                {todo.task}
              </span>
              <span className="text-sm text-green-500">Task is completed</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="font-bold text-lg">{todo.task}</span>
              <span className="text-sm text-red-500">Task is incomplete</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-5">
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
