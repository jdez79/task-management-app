// src/components/TaskForm.tsx
import React, { useEffect, useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

type Props = { mode?: "create" | "edit" };

const TaskForm: React.FC<Props> = ({ mode = "create" }) => {
  const { tasks, createTask, updateTask } = useTasks();
  const params = useParams<{ id?: string }>();
  const id = params.id;
  const editing = mode === "edit" ? tasks.find(t => t.id === id) : undefined;

  // initialize to empty — we'll populate if editing becomes available
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // populate form when editing becomes available (or when id changes)
  useEffect(() => {
    if (mode === "edit") {
      if (editing) {
        setTitle(editing.title ?? "");
        setDescription(editing.description ?? "");
        setDueDate(editing.dueDate ? editing.dueDate.split("T")[0] : "");
        setError(null);
      } else {
        // optionally set an error until the task is found
        setError("Task not found");
      }
    } else {
      // create mode: reset fields
      setTitle("");
      setDescription("");
      setDueDate("");
      setError(null);
    }
  }, [mode, editing, id]);

  const validate = (): string | null => {
    if (!title.trim()) return "Title is required.";
    if (title.length > 200) return "Title must be under 200 characters.";
    if (description.length > 1000) return "Description too long.";
    return null;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);

    if (mode === "create") {
      createTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      });
      navigate("/");
    } else if (mode === "edit") {
      if (!editing) {
        setError("Can't save: task not found.");
        return;
      }
      updateTask(editing.id, {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      });
      navigate(`/task/${editing.id}`);
    }
  };

  return (
    <div className="card">
      <h2>{mode === "create" ? "Create Task" : "Edit Task"}</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <label>
          Title
          <input
            className="input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </label>

        <label>
          Description
          <textarea
            className="input"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </label>

        <label>
          Due date
          <input
            className="input"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="submit">{mode === "create" ? "Create" : "Save"}</button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
