import React from "react";
import TaskItem from "./TaskItem";

const TaskList = React.memo(({ tasks, toggleTask, deleteTask }) => {
  console.log("TaskList rendered");

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
});

export default TaskList;