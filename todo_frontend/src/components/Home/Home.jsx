import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import { useNavigate } from "react-router-dom";
import { fetchTasks, performDelete } from "../TaskItem/TaskItemAction"
import { performCreateTask } from "../TaskForm/TaskFormAction"

function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    loadTasks();
  }, []);

  const addTask = async (title, description) => {
    try {
      const newTask = await performCreateTask({
        title,
        description,
      });
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('There was an error adding the task!', error);
    }
  };

  const editTask = (id) => {
    navigate(`/edit/${id}`);
  };

  const getDetails = (id) => {
    navigate(`/tasks/${id}`);
  };

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

   const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('accessToken');
    // Redirect to login page
    navigate('/login');
  };


  return (
    <div className="todoapp stack-large">
        <button className="logout" type="button" onClick={handleLogout}>sair</button>
      <h1 className="todo_title">ToDo List</h1>
      <TaskList 
        tasks={tasks} 
        onEdit={editTask} 
        onDelete={deleteTask}
        onViewDetails={getDetails}
      />
    </div>
  );
}

export default Home;
