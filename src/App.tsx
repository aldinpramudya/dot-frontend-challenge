import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Question from './pages/Question'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/question' element={<Question />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
