import './styles.css';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import plaid_api from '../../img/plaid_logo.png'

export default class Home extends Component {
  render() {
    return (
      <div className='HOME'>
        <h1>Which Hell is your Home? </h1>
        
        <Button variant="danger">Find Out</Button>
        <br></br>
        Blessed with Plaid API
        <img src={plaid_api} alt="plaid_api" height={50} width={100}/>
      </div>
    )
  }
}
