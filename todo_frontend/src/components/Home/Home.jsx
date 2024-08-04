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
        console.error("", error);
      }
    };
    loadTasks();
  }, []);


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
        console.error('Erro ao tentar deletar tarefa!', error);
      }
    }
  };

   const handleLogout = () => {
    // Remove o token do localStorage

    localStorage.removeItem('accessToken');
    // Redireciona para página de Login
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
