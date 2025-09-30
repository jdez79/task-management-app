// src/components/TaskList.tsx
import React from "react";
import { useTasks } from "../contexts/TaskContext";
import TaskItem from "./TaskItem";
import { Link } from "react-router-dom";

const TaskList: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <div>
      <div className="header-row" style={{ marginBottom: 12 }}>
        <h2>Your Tasks</h2>
        <Link to="/create"><button className="btn">Add Task</button></Link>
      </div>

      {tasks.length === 0 ? (
        <div className="card">No tasks yet — create your first task.</div>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
