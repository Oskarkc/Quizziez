import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider.jsx";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, api } = useAuth();
  const handleSubmit = async () => {
    try {
      const response = await api.post("/auth/register", {
        Email: email,
        Password: password,
      });
      console.log("Register data:", { email, password });
      setToken(response.data.accessToken);
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
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
