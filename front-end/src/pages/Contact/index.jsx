import React, { Component } from 'react'
import pope from '../../img/pope.png';
import './styles.css';

export default function Contact(){
  
    return (
        <div class='Contact'>
            <div id='container'>
                <div class='title'>
                    <img src="https://see.fontimg.com/api/renderfont4/4a4x/eyJyIjoiZnMiLCJoIjo1MCwidyI6MjAwMCwiZnMiOjI1LCJmZ2MiOiIjRkZGNkY2IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Q09OVEFDVCBVUw/straighttohell-bb.png" alt='Ancient fonts'></img>
                </div>
                <p><img src={pope} alt="pope image" height={300} width={300}/></p>
                <p>To talk to one of our representatives, please address letters to The Pope at 00120 Città del Vaticano, Vatican City.</p>
            </div>
        </div>
    )
  
}
