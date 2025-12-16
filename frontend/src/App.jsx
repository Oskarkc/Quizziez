import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import Register from './pages/Register/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider.jsx';
import MyQuiz from './pages/MyQuiz/MyQuiz.jsx';

function App() {

  return (
    <AuthProvider>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myquizzes" element={<MyQuiz />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
