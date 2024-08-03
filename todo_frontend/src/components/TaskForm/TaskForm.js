import React, { useState } from "react";

function TaskForm({ onSubmit }) {
  // Definindo estados locais para os campos do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Atualiza o estado correspondente com base no nome do campo
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

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    if (title.trim() && description.trim()) {
      onSubmit(title, description, status); // Chama a função onSubmit passada via props
      // Reseta os campos do formulário após o envio
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="title-input" className="label__lg">
          Nome da Tarefa
        </label>
      </h2>
      <input
        type="text"
        id="title-input"
        className="input input__lg"
        name="title"
        autoComplete="off"
        value={title}
        onChange={handleChange}
      />
      <h2 className="label-wrapper">
        <label htmlFor="description-input" className="label__lg">
          Descrição
        </label>
      </h2>
      <textarea
        id="description-input"
        className="input input__lg"
        name="description"
        autoComplete="off"
        value={description}
        onChange={handleChange}
      />
      <h2 className="label-wrapper">
        <label htmlFor="status-input" className="label__lg">
          Status
        </label>
      </h2>
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
      <button type="submit" className="btn btn__primary btn__lg">
        Adicionar nova tarefa
      </button>
    </form>
  );
}

export default TaskForm;
