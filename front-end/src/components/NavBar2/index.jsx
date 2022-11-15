import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo_whitetxt.png';
import './styles.css';

export default function NavBar() {
  return (
    <>
          <nav className="nav-container">
              <Link to="/">
                    <img src={logo} alt="logo" height={30} width={180}/>
              </Link>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/about">ABOUT</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact">CONTACT</Link>
                </li>
                <li className="nav-item">
                    <Link to="/privacy">PRIVACY</Link>
                </li>
                <li className="nav-item">   
                    <Link to="/results">RESULTS</Link>
                </li>
            </ul>
        </nav>
    </>
  )
}
