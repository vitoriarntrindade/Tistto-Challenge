import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { performGetTask } from "../TaskEdit/TaskEditAction";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await performGetTask(id); // Chama a função para obter dados da tarefa
        setTask(taskData); // Atualiza o estado com os dados da tarefa
      } catch (error) {
        console.error("Failed to fetch task", error);
        setError(
          <div className="getDetails">
            <span>Não foi possível encontrar a tarefa</span>
          </div>); // Atualiza o estado com a mensagem de erro
      }
    };

    fetchTask();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!task) {
    return <div>Loading...</div>; // Exibe mensagem de carregamento enquanto a tarefa está sendo buscada
  }
  console.log(task.completed)
  return (
    <div className="getDetails">
      <h2>Tarefa {task.title}</h2>
      <p>Descrição: </p> <br></br>
      <p className="description">{task.description}</p>
    </div>
  );
}

export default TaskDetails;
