import React, { Component } from 'react'
import pope from '../../img/pope.png';
import './styles.css';

export default function Contact(){
  
    return (
      <div className='Contact'>
            <p>
                <img src={pope} alt="pope image" height={400} width={400}/>
            </p>

            <p>
                To talk to one of ours representatives, please mail to 00120 Città del Vaticano, Vatican City
            </p>
      </div>
    )
  
}
