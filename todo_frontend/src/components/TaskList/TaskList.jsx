import React, { useState, useEffect } from "react";
import { performTaskList } from "./TaskListAction";
import TaskItem from "../TaskItem/TaskItem";

function TaskList({ onEdit, onDelete, onViewDetails }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await performTaskList();
        setTasks(tasksData);
      } catch (error) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul
      className="tasklist"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task.title}
          onViewDetails={() => onViewDetails(task.id)}
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}          
        />
      ))}
    </ul>
  );
}

export default TaskList;
