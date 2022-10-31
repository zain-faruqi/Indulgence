import './styles.css';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export default class Home extends Component {
  render() {
    return (
      <div className='HOME'>
        <h1>Which Hell is your Home? </h1>
        <body>
        <Button variant="danger">Find Out</Button>
        </body>
      </div>
    )
  }
}
