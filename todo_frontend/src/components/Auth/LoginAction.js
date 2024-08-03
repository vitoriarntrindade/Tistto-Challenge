import axios from "axios";

// URLs para as rotas de login e obtenção de token
const LOGIN_URL = "http://127.0.0.1:8000/accounts/login";
const REGISTER_URL = "http://127.0.0.1:8000/accounts/register";
const TOKEN_URL = "http://127.0.0.1:8000/token";

// Função para realizar login
export const performLogin = async (user, password) => {
  console.log("chamando api", user); // Log para depuração

  try {
    // Faz a requisição POST para a URL de login
    const response = await axios.post(
      LOGIN_URL,
      {
        username: user, // Nome de usuário
        password: password, // Senha
      },
      {
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo JSON
        },
      }
    );

    // Extrai os tokens de acesso e refresh da resposta
    const { access, refresh } = response.data;
    console.log("Access Token:", access); // Log do token de acesso
    console.log("Refresh Token:", refresh); // Log do token de refresh

    // Armazena os tokens no localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    // Retorna a ação de sucesso de login
    return {
      type: "LOGIN",
      payload: { access, refresh },
    };
  } catch (error) {
    console.error("Error:", error); // Log do erro
    // Retorna a ação de erro de login
    return {
      type: "LOGIN_ERROR",
      payload: error,
    };
  }
};

// Função para obter o token
async function getToken(user, password) {
  // Faz a requisição POST para a URL de token
  try {
    const response = axios.post(
      TOKEN_URL,
      {
        username: user, // Nome de usuário
        password: password, // Senha
      },
      {
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo JSON
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
}

export const performRegister = async (user, password) => {
  console.log("chamando api", user); // Log para depuração

  try {
    // Faz a requisição POST para a URL de registro
    const response = await axios.post(
      REGISTER_URL,
      {
        username: user, // Nome de usuário
        password: password, // Senha
      },
      {
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo JSON
        },
      }
    );

    // Se o registro for bem-sucedido, obtém o token
    const data = await getToken(user, password);
    console.log("oieee", data);
    console.log("finalmente", data.data);

    // Extrai os tokens de acesso e refresh da resposta
    const { access, refresh } = data.data;
    console.log("Access Token:", access); // Log do token de acesso
    console.log("Refresh Token:", refresh); // Log do token de refresh

    // Armazena os tokens no localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    // Retorna a ação de sucesso de registro
    return {
      type: "REGISTER",
      payload: { access, refresh },
    };
  } catch (error) {
    // Trata qualquer erro que possa ter ocorrido
    console.error("Erro:", error);
    return {
      type: "REGISTER_ERROR",
      payload: error,
    };
  }
};
