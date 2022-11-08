import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App= props => {
  return (
    <div>
      <NavBar/>
    </div>
  );
}

export default App
