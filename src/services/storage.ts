// src/services/storage.ts
import { type Task } from "../types";

const PREFIX = "task-manager:";

export function storageKey(userId?: string) {
  return `${PREFIX}${userId ?? "anon"}`;
}

export function loadTasks(userId?: string): Task[] {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch (err) {
    console.error("loadTasks error", err);
    return [];
  }
}

export function saveTasks(tasks: Task[], userId?: string) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(tasks));
  } catch (err) {
    console.error("saveTasks error", err);
  }
}
