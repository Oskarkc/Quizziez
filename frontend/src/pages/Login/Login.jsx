import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="welcomediv">
            <h1 className="welcome">Welcome to Quizziez!</h1>
            <InputComponent type="email" placeholder="Email" />
            <InputComponent type="password" placeholder="Password" />
            <ButtonComponent onClick={() => navigate("/home")}>Login</ButtonComponent>
            <Link to="/register">First Time Here? Register</Link>
        </div>
    )
}