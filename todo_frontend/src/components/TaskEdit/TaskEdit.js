import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { performGetTask, performUpdateTask } from "./TaskEditAction"; 

function TaskEdit() {
  const { id } = useParams(); // Obtém o ID da tarefa da URL
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Hook para navegação programática

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await performGetTask(id); // Função para obter dados da tarefa
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
      } catch (error) {
        console.error("", error);
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
        <button type="submit" className="btn btn__primary btn__lg">
          atualizar
        </button>
      </form>
    </div>
  );
}

export default TaskEdit;