import './styles.css';
import React from 'react';
import Button from 'react-bootstrap/Button'
import plaid_api from '../../img/plaid_logo.png'
import { Link } from 'react-router-dom';


function Home() {


    
    return (
      <div className='HOME'>
        <h2>Which Hell is your Home? </h2>
        <Link to="/loading">
          <Button variant="danger">FIND OUT WITH <img src={plaid_api} alt="plaid_api" height={50} width={100}/></Button>
        </Link>
      </div>
    )

}

export default Home;