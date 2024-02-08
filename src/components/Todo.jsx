import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

const Todo = ({ todo, toggleComplete, deleteTodo, editTask }) => {
  const [completeStatus, setCompletStatus] = useState("");

  return (
    <div className="bg-white flex justify-between w-full mt-5 py-10 px-3">
      {/* <p>{todo?.task}</p> */}
      <div className="flex gap-5">
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? <GrCompliance /> : <RxCross1 />}
        </button>

        <div className="flex flex-col">
          {todo.completed ? (
            <div className="flex flex-col ">
              <span className="line-through font-bold text-lg">
                {todo.task}
              </span>
              <span>Task is completed</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="font-bold text-lg">{todo.task}</span>
              <span>Task is incomplete</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <button onClick={() => editTask(todo.id)}>
          <LuClipboardEdit />
        </button>
        <button onClick={() => deleteTodo(todo.id)}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Todo;