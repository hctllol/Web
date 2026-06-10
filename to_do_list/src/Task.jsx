const ToDo = ({ todo, toggleTask, removeTask }) => {
  return (
    <div className="list-row">
      <div className="checkbox-wrap">
        <input 
          type="checkbox" 
          checked={todo.complete} 
          onChange={() => toggleTask(todo.id)} 
        />
        <span className={todo.complete ? "task-done" : ""}>
          {todo.task}
        </span>
      </div>
      <button className="del-btn" onClick={() => removeTask(todo.id)}>
        Очистить
      </button>
    </div>
  );
};

export default ToDo;