// src/types.ts
export type ID = string;

export interface Task {
  id: ID;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO string
  dueDate?: string; // ISO date string
  owner?: string; // auth0 sub or "anon"
}
