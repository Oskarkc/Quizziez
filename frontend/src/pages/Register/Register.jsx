import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider.jsx";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, api } = useAuth();
  const registerUser = useRegister  ();
  const handleSubmit = async () => {
    registerUser.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setToken(data.accessToken);
          navigate("/home");
        },
        onError: (error) => {
          console.error("Registration failed:", error);
        },
      }
    );
  };
  return (
    <div className="welcomediv">
      <h1 className="welcome" style={{ fontSize: "48px" }}>
        Create your account to get started with Quizziez!
      </h1>
      <div className="inputwrapper">
        <InputComponent
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <InputComponent
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>
      <ButtonComponent style={{ marginTop: "20px" }} onClick={handleSubmit}>
        Register
      </ButtonComponent>
      <Link to="/">Already have an account? Login</Link>
    </div>
  );
}
