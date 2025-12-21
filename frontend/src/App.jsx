import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.jsx";
import MyQuiz from "./pages/MyQuiz/MyQuiz.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myquizzes" element={<MyQuiz />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
