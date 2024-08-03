import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Auth/Login";
import TaskList from "./components/TaskList/TaskList";
import Home from "./components/Home/Home"
import "./styles.css";
import TaskDetails from "./components/TaskDetails/TaskDetails"
import TaskEdit from "./components/TaskEdit/TaskEdit"
import RegisterForm from "./components/Auth/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<TaskEdit />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
