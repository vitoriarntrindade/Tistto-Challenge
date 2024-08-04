import React, { useState, useEffect } from "react";
import { performTaskList } from "./TaskListAction";
import TaskItem from "../TaskItem/TaskItem";
import { performDelete } from "../TaskItem/TaskItemAction";
import { performCreateTask } from "../TaskForm/TaskFormAction"
import TaskForm from "../TaskForm/TaskForm"

function TaskList({ onEdit, onViewDetails }) {
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

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar essa tarefa?");
    if (confirmDelete) {
      try {
        await performDelete(id);
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('There was an error deleting the task!', error);
      }
    }
  };

  const addTask = async (title, description) => {
    try {
      const newTask = await performCreateTask({ title, description });
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('There was an error adding the task!', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <TaskForm onSubmit={addTask} />
      <ul className="tasklist">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onViewDetails={() => onViewDetails(task.id)}
              onEdit={() => onEdit(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;