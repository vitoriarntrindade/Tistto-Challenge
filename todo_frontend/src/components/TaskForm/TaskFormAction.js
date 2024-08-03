import axios from "axios";

const URL = "http://127.0.0.1:8000/api/tasks";

export const performCreateTask = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Retorna os dados da tarefa criada
  } catch (error) {
    console.error("Failed to create task", error.response || error.message);
    throw error; // Repassa o erro para que possa ser tratado no componente
  }
};
