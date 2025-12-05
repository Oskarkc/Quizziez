import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="welcomediv">
      <h1 className="welcome" style={{ fontSize: "48px" }}>
        Create your account to get started with Quizziez!
      </h1>
      <InputComponent type="email" placeholder="Email" />
      <InputComponent type="password" placeholder="Password" />
      <ButtonComponent onClick={() => navigate("/home")}>
        Register
      </ButtonComponent>
      <a href="/">Already have an account? Login</a>
    </div>
  );
}
