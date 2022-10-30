import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

const App = props => {
  return (
    <Router>
      <Routes>
        {/* a route for the home page */}
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App
