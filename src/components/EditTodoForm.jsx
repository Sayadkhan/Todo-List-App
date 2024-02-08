import { useState } from "react";

const EditTodoForm = ({ editTask, todo }) => {
  const [value, setValue] = useState(todo.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(value, todo.id);

    setValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        required
        type="text"
        onChange={(e) => setValue(e.target.value)}
        // value={formData.name}
        value={value}
        className="px-3 py-2 w-full  rounded-md outline-none border focus:border-[#96680e] duration-300"
        placeholder="Edit you name"
      />

      <button
        type="submit"
        className="p-4 w-full rounded-md bg-red-600 hover:bg-[#3A3A3A]  text-white duration-300 flex items-center justify-center gap-5"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;
