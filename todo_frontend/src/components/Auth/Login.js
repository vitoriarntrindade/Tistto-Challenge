import { performLogin } from "./LoginAction";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await performLogin(username, password);

      if (result.type === "LOGIN") {
        // Redireciona para a TaskList após o login bem-sucedido
        navigate("/");
      } else {
        console.error("Login error:", result.payload);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegisterClick = () => {
    // Redireciona para a página de registro
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Login</span>
        </div>
        <form onSubmit={handleSubmit} method="post">
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
            <input type="submit" value="Login" />
          </div>
          <div className="row">
            <p>
              Registre-se clicando{" "}
              <span className="register-link" onClick={handleRegisterClick}>
                aqui
              </span>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
