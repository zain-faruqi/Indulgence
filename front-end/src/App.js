import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Contact from './pages/Contact';
import Results from './pages/Results';
import Login from './pages/Login';
import LoadingScreen from './pages/LoadingScreen';

const App= props => {
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
          <Route path="/results" element={<Results />} />
          <Route path="/loading" element={<LoadingScreen />} />
        </Routes>
      </Router>
    </>

  );
}

export default App
