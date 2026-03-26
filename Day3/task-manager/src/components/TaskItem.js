import React, { useRef } from "react";

const TaskItem = React.memo(({ task, toggleTask, deleteTask }) => {
  const renderCount = useRef(0);
  renderCount.current++;

  console.log("TaskItem rendered:", task.text);

  return (
    <div>
      <span
        onClick={() => toggleTask(task.id)}
        style={{ textDecoration: task.done ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <small> renders: {renderCount.current}</small>
    </div>
  );
});

export default TaskItem;