import "./Login.css";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useLogin } from "../../hooks/useLogin";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

export default function Login() {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    errors, 
    handleSubmit, 
  } = useLogin();
  

  return (
    <div className="welcomediv">
      <h1 className="welcome">Welcome to Quizziez!</h1>
      {errors.global && <ErrorComponent message={errors.global} />}
      <div className="inputwrapper">
        <InputComponent
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <ErrorComponent message={errors.email}></ErrorComponent>}
        <InputComponent
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <ErrorComponent message={errors.password}></ErrorComponent>}
      </div>
      <ButtonComponent style={{ marginTop: "20px" }} onClick={handleSubmit}>
        Login
      </ButtonComponent>
      <Link to="/register">First Time Here? Register</Link>
    </div>
  );
}
