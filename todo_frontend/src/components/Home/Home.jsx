import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchTasks } from "../TaskItem/TaskItemAction";
import { performCreateTask } from "../TaskForm/TaskFormAction";
import { performDelete } from "../TaskItem/TaskItemAction";

function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const addTask = async (title, description, status) => {
    try {
      const response = await performCreateTask({
        title: title,
        description: description,
        completed: status === 'completed',
      });
      
      const newTask = response;
      setTasks((prevTasks) => [
        ...prevTasks,
        newTask,
      ]);
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
        // Atualize a lista de tarefas após a exclusão
        const updatedTasks = await fetchTasks();  
        setTasks(updatedTasks);
      } catch (error) {
        console.error('There was an error deleting the task!', error);
      }
    }
  };

  return (
    <div className="todoapp stack-large">
      <h1>Tarefas</h1>
      <TaskForm onSubmit={addTask} />
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