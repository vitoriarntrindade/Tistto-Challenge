import axios from "axios";

const URL = "http://127.0.0.1:8000/api/tasks";

// Obtém o token de acesso armazenado no localStorage
const token = localStorage.getItem("accessToken");

// Função para atualizar uma tarefa por ID
export const performUpdate = async (id, data) => {
  try {
    // Faz a requisição PUT para atualizar a tarefa
    const response = await axios.put(`${URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Cabeçalho de autorização com o token JWT
        "Content-Type": "application/json", // Tipo de conteúdo JSON
      },
    });
    return response.data; // Retorna os dados da tarefa atualizada
  } catch (error) {
    console.error("Falha ao atualizar a tarefa", error);
    throw error; // Repassa o erro para que possa ser tratado no componente
  }
};

// Função para deletar uma tarefa por ID
export const performDelete = async (id) => {
  try {
    // Faz a requisição DELETE para remover a tarefa
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Cabeçalho de autorização com o token JWT
        "Content-Type": "application/json", // Tipo de conteúdo JSON
      },
    });
    return response.data; // Retorna os dados da tarefa deletada
  } catch (error) {
    console.error("Falha ao deletar a tarefa", error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Retorna a lista de tarefas
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    throw error;
  }
};