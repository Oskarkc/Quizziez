import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.jsx";
import MyQuiz from "./pages/MyQuiz/MyQuiz.jsx";
import Play from "./pages/Play/Play.jsx";
import Game from "./pages/Game/Game.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myquizzes" element={<MyQuiz />} />
          <Route path="/play" element={<Play />} />
          <Route path="/play/:quizId" element={<Game />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
