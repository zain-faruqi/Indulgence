import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from '../../pages/Home';
import Privacy from '../../pages/Privacy';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Results from '../../pages/Results';
import Login from '../../pages/Login';
import { Component } from 'react';

export default class NavBar extends Component {
  render() {
    return (
      <Router>
      <div>
      
        <Navbar
          fixedTop
          style={{backgroundSize: "0", backgroundColor: "#A92117"}}
        >
          <Container>
            <Navbar.Brand as = {Link} to = {'/'}>Indulgence</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as = {Link} to = {'/About'}>About</Nav.Link>
              <Nav.Link as = {Link} to = {'/Contact'}>Contact</Nav.Link>
              <Nav.Link as = {Link} to = {'/Privacy'}>Privacy</Nav.Link>
              <Nav.Link as={Link} to={'/Results'}>Results</Nav.Link>
              <Nav.Link as = {Link} to = {'/Login'}>Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/About" element={<About/>}/>
          <Route exact path="/Privacy" element={<Privacy/>}/>
          <Route exact path="/Contact" element={<Contact/>}/>
            <Route exact path="/Results" element={<Results />} />
            <Route exact path="/Login" element={<Login />} />
        </Routes>
      </div>
      </Router>
    );
  }
}
