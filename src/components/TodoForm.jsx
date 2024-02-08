import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);

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
        placeholder="আপনার নাম লিখুন"
      />

      <button
        type="submit"
        className="p-4 w-full rounded-md bg-red-600 hover:bg-[#3A3A3A]  text-white duration-300 flex items-center justify-center gap-5"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
