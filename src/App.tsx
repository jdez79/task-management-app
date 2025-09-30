// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { TaskProvider } from "./contexts/TaskContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <TaskProvider>
        <div>
          <Navbar />
          <main style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/task/:id" element={<TaskDetails />} />
              <Route path="/create" element={<TaskForm mode="create" />} />
              <Route path="/edit/:id" element={<TaskForm mode="edit" />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </Auth0ProviderWithHistory>
  );
}

export default App;
