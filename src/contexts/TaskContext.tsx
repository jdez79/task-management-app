// src/contexts/TaskContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Task } from "../types";
import { loadTasks, saveTasks } from "../services/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";

type CreateTaskDto = Omit<Task, "id" | "createdAt">;

interface TaskContextValue {
  tasks: Task[];
  createTask: (payload: CreateTaskDto) => Task;
  updateTask: (id: string, patch: Partial<Task>) => Task | undefined;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  reload: () => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

// THIS is the exported hook consumers should import:
export const useTasks = (): TaskContextValue => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside a TaskProvider");
  return ctx;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const userId = isAuthenticated ? user?.sub ?? undefined : undefined;
  const storageKeyOwner = userId ?? "anon";

  const [tasks, setTasks] = useState<Task[]>(() => loadTasks(storageKeyOwner));

  useEffect(() => {
    setTasks(loadTasks(storageKeyOwner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKeyOwner]);

  useEffect(() => {
    saveTasks(tasks, storageKeyOwner);
  }, [tasks, storageKeyOwner]);

  const createTask = (payload: CreateTaskDto) => {
    const task: Task = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...payload,
    };
    setTasks(prev => [task, ...prev]);
    return task;
  };

  const updateTask = (id: string, patch: Partial<Task>) => {
    let updated: Task | undefined;
    setTasks(prev => prev.map(t => (t.id === id ? (updated = { ...t, ...patch })! : t)));
    return updated;
  };

  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));
  const toggleComplete = (id: string) => setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const reload = () => setTasks(loadTasks(storageKeyOwner));

  const value = useMemo(() => ({ tasks, createTask, updateTask, deleteTask, toggleComplete, reload }), [tasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
