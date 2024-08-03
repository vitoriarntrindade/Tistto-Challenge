import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { performRegister } from "./LoginAction";


function RegisterForm() {
  // Define o estado para armazenar os valores dos campos do formulário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  // Função para lidar com mudanças nos campos do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await performRegister(username, password);
      console.log("result", result);

      if (result.type === "REGISTER") {
        // Redireciona para a TaskList após o login bem-sucedido
        navigate("/");
      } else {
        console.error("Login error:", result.payload);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Registrar</span>
        </div>
        <form onSubmit={handleSubmit} method="post">
          {" "}
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row button">
            <input type="submit" value="Entrar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
