import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { performGetTask } from "../TaskEdit/TaskEditAction";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null); // Adiciona estado para erros

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await performGetTask(id); // Chama a função para obter dados da tarefa
        setTask(taskData); // Atualiza o estado com os dados da tarefa
      } catch (error) {
        console.error("Failed to fetch task", error);
        setError("Failed to fetch task"); // Atualiza o estado com a mensagem de erro
      }
    };

    fetchTask();
  }, [id]);

  if (error) {
    return <div>{error}</div>; // Exibe a mensagem de erro se ocorrer um erro
  }

  if (!task) {
    return <div>Loading...</div>; // Exibe mensagem de carregamento enquanto a tarefa está sendo buscada
  }

  return (
    <div className="getDetails">
      <h2>{task.title}</h2>
      <p>Descrição: {task.description}</p>
      <p>Status: {task.completed}</p>
    </div>
  );
}

export default TaskDetails;
