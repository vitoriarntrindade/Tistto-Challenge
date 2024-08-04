
import axios from "axios";

const URL = "http://127.0.0.1:8000/api/tasks";

const token = localStorage.getItem("accessToken");


export const performTaskList = async () => {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    console.log(response.data)
    
    return response.data; // Retorna os dados das tarefas
    
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    throw error; // Repassa o erro para que possa ser tratado no componente
  }
};
