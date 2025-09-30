// src/components/TaskItem.tsx
import React from "react";
import type { Task } from "../types";
import { useTasks } from "../contexts/TaskContext";
import { Link } from "react-router-dom";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleComplete, deleteTask } = useTasks();

  return (
    <div className="card task-row">
      <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <Link to={`/task/${task.id}`} style={{ fontWeight: 600 }}>{task.title}</Link>
          <small className="small">{new Date(task.createdAt).toLocaleString()}</small>
        </div>
        <div className="small" style={{ marginTop: 6 }}>{task.description}</div>
        {task.dueDate && <div className="small">Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Link to={`/edit/${task.id}`}><button className="btn secondary">Edit</button></Link>
        <button className="btn" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
