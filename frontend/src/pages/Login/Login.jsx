import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const handleSubmit = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/home");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };
  return (
    <div className="welcomediv">
      <h1 className="welcome">Welcome to Quizziez!</h1>
      <div className="inputwrapper">
        <InputComponent
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputComponent
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ButtonComponent style={{ marginTop: "20px" }} onClick={handleSubmit}>
        Login
      </ButtonComponent>
      <Link to="/register">First Time Here? Register</Link>
    </div>
  );
}
