import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Question from './pages/Question'
import Home from './pages/Home'
import Login from './pages/Login';

function App() {
  const isAuthenticated = localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/question"
          element={
            isAuthenticated ? <Question /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
