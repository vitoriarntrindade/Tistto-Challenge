import axios from "axios";

// URL base da API de tarefas
const URL = "http://127.0.0.1:8000/api/tasks";

// Obtém o token de acesso armazenado no localStorage
const token = localStorage.getItem("accessToken");

// Função para atualizar uma tarefa por ID
export const taskDetails = async (id) => {
  try {
    // Faz a requisição PUT para atualizar a tarefa
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Cabeçalho de autorização com o token JWT
        "Content-Type": "application/json", // Tipo de conteúdo JSON
      },
    });
    return response.data; // Retorna os dados da tarefa atualizada
  } catch (error) {
    console.error("Falha ao atualizar a tarefa", error);
    throw error;
  }
};
