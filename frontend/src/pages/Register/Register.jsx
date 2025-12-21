import "../Login/Login.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister.jsx";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

export default function Register() {
  const { 
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    errors,
  } = useRegister();
  
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
        {errors.email && <ErrorComponent message={errors.email}></ErrorComponent>}
        <InputComponent
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        {errors.password && <ErrorComponent message="Password need to have at least 6 characters, capital letter, number and special character"></ErrorComponent>}
      </div>
      <ButtonComponent style={{ marginTop: "20px" }} onClick={handleSubmit}>
        Register
      </ButtonComponent>
      <Link to="/">Already have an account? Login</Link>
    </div>
  );
}
