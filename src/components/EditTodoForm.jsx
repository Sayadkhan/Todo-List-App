import { useState } from "react";

const EditTodoForm = ({ editTask, todo }) => {
  const [value, setValue] = useState(todo.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(value, todo.id);

    setValue("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 container mx-auto flex justify-between p-10 mt-5"
    >
      <input
        required
        type="text"
        onChange={(e) => setValue(e.target.value)}
        // value={formData.name}
        value={value}
        className="bg-transparent outline-none border-b-2 border-gray-400 py-2 px-5 focus:border-teal-600 text-white"
        placeholder="What things to do?"
      />

      <button
        type="submit"
        className="bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;
