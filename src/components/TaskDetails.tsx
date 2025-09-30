// src/components/TaskDetails.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";

const TaskDetails: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const id = params.id;
  const { tasks, deleteTask, toggleComplete } = useTasks();
  const navigate = useNavigate();

  // if no id param, go back to home
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  const task = id ? tasks.find((t: { id: string }) => t.id === id) : undefined;
  if (!task) {
    return <div className="card">Task not found.</div>;
  }

  return (
    <div className="card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      {task.dueDate && <p className="small">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
      <p className="small">Created: {new Date(task.createdAt).toLocaleString()}</p>
      <p>Status: {task.completed ? "Completed" : "Open"}</p>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => toggleComplete(task.id)}>
          {task.completed ? "Mark incomplete" : "Mark complete"}
        </button>
        <button className="btn secondary" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
        <button
          className="btn"
          onClick={() => {
            deleteTask(task.id);
            navigate("/");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
