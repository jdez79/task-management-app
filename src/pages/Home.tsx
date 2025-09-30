// src/pages/Home.tsx
import React from "react";
import TaskList from "../components/TaskList";
import { useTasks } from "../contexts/TaskContext";

const Home: React.FC = () => {
  const { tasks } = useTasks();
  const completed = tasks.filter(t => t.completed).length;
  const open = tasks.length - completed;

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <div className="card" style={{ flex: 1 }}>
          <h4>Total tasks</h4>
          <h2>{tasks.length}</h2>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h4>Open</h4>
          <h2>{open}</h2>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h4>Completed</h4>
          <h2>{completed}</h2>
        </div>
      </div>

      <TaskList />
    </div>
  );
};

export default Home;
