import axios from "axios";

const URL = "http://127.0.0.1:8000/api/tasks";
const token = localStorage.getItem("accessToken");

export const performGetTask = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Retorna os dados da tarefa
  } catch (error) {
    console.error("Failed to fetch task", error);
    throw error; // Repassa o erro para que possa ser tratado no componente
  }
};

export const performUpdateTask = async (id, data) => {
  try {
    const response = await axios.put(`${URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Retorna os dados atualizados da tarefa
  } catch (error) {
    console.error("Failed to update task", error);
    throw error; // Repassa o erro para que possa ser tratado no componente
  }
};
