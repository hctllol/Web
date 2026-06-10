import { useState } from "react";

const ToDoForm = ({ addTask }) => {
  const [val, setVal] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
    addTask(val);
    setVal("");
  };

  return (
    <form onSubmit={submitHandle} className="add-task-form">
      <input
        value={val}
        type="text"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Что нужно сделать?"
        className="text-input"
      />
      <button className="submit-btn">+</button>
    </form>
  );
};

export default ToDoForm;
