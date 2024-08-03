import React, { useState } from "react";

function TaskForm({ onSubmit }) {
  // Definindo estados locais para os campos do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  

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
      default:
        break;
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    if (title.trim() && description.trim()) {
      onSubmit(title, description); // Chama a função onSubmit passada via props
      // Reseta os campos do formulário após o envio
      setTitle("");
      setDescription("");
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
      <button type="submit" className="btn btn__primary btn__lg">
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;
