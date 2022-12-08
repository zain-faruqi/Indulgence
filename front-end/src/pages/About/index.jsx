import React from 'react'
import './styles.css';

export default function About() {
  return (
    <div class='About'>
      <div id='container'>
        <div class='title'>
          <img src="https://see.fontimg.com/api/renderfont4/4a4x/eyJyIjoiZnMiLCJoIjo1MCwidyI6MjAwMCwiZnMiOjI1LCJmZ2MiOiIjRkZGNkY2IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/QUJPVVQgSU5EVUxHRU5DRS4/straighttohell-bb.png" alt="Ancient fonts"></img>
        </div>
        <h2>On judgement day, where will your transactions take you?<br></br>Indulgence can tell you.</h2>
        <br></br>
        <p><b>Indulgence.</b> is a semester final project web application created by CSCI-UA 071 Collaborating Remotely
          (Fall 2022) students Zain Faruqi, Songmao (Matthew) Li, and Kei Cooney. This project was inspired by Dante's Inferno.<br></br>
          <br></br>Using PLAID technology to collect your transaction history, <b>Indulgence.</b> will reveal your fate.</p>
        <p>______________________________________________</p>
        <div class='title'>
          <img src="https://see.fontimg.com/api/renderfont4/4a4x/eyJyIjoiZnMiLCJoIjo1MCwidyI6MjAwMCwiZnMiOjI1LCJmZ2MiOiIjRkZGNkY2IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/T1VSIFRFQ0ggU1RBQ0s/straighttohell-bb.png" alt="Ancient fonts"></img>
        </div>
        <p>Indulgence. runs on MERN stack and is hosted by Heroku.<br></br>This web application uses PLAID API, react-minimal-pie-chart, axios, bootstrap, htlm2canvas, and AI-generated images to represent each sin.</p>
        <p>Users can easily view Indulgence. documentation on <a href="https://indulgence.atlassian.net/wiki">Confluence </a>
          and our <a href="https://github.com/Kei-KC/Indulgence">Github</a>.</p>
      </div>
    </div>
  )
}