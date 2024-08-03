import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { performGetTask, performUpdateTask } from "./TaskEditAction"; 

function TaskEdit() {
  const { id } = useParams(); // Obtém o ID da tarefa da URL
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate(); // Hook para navegação programática

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await performGetTask(id); // Função para obter dados da tarefa
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
        setStatus(taskData.completed ? "completed" : "pending");
      } catch (error) {
        console.error("Failed to fetch task", error);
      }
    };

    fetchTask();
  }, [id]);

 const handleChange = (event) => {
   const { name, value } = event.target;
   switch (name) {
     case "title":
       setTitle(value);
       break;
     case "description":
       setDescription(value);
       break;
     case "status":
       setStatus(value);
       break;
     default:
       break;
   }
 };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await performUpdateTask(id, {
        title,
        description,
        completed: status === "completed",
      });
      navigate("/"); // Redireciona para a página inicial após a atualização
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="label-wrapper">Editar tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title-input" className="label__lg">
            Nome da Tarefa
          </label>
          <input
            type="text"
            id="title-input"
            className="input input__lg"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description-input" className="label__lg">
            Descrição da Tarefa
          </label>
          <textarea
            id="description-input"
            className="input input__lg"
            name="description"
            autoComplete="off"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status-input" className="label__lg">
            Status
          </label>
          <select
            id="status-input"
            className="input input__lg"
            name="status"
            value={status}
            onChange={handleChange}
          >
            <option value="pending">Pendente</option>
            <option value="in-progress">Em progresso</option>
            <option value="completed">Completa</option>
          </select>
        </div>
        <button type="submit" className="btn btn__primary btn__lg">
          atualizar
        </button>
      </form>
    </div>
  );
}

export default TaskEdit;