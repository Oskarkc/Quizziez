import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="welcomediv">
      <h1 className="welcome">Welcome to Quizziez!</h1>
      <div className="inputwrapper">
        <InputComponent type="email" placeholder="Email" />
        <InputComponent type="password" placeholder="Password" />
      </div>
      <ButtonComponent
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/home")}
      >
        Login
      </ButtonComponent>
      <Link to="/register">First Time Here? Register</Link>
    </div>
  );
}
