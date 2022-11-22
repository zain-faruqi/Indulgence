import React, {useEffect, useState} from 'react'
import axios from 'axios';
import wrath from '../../img/wrath.png';
import greed from '../../img/greed.png';
import gluttony from '../../img/gluttony.png';
import heresy from '../../img/heresy.png';
import './styles.css';
import { saveAs } from 'file-saver';
import Button from 'react-bootstrap/Button'
import html2canvas from 'html2canvas';




function Results() {
  const [images, setImages] = useState([wrath, greed, gluttony, heresy]);
  const [index, setIndex] = useState(Math.floor(Math.random() * 4));
  const [sins, setSins] = useState(["Wrath", "Greed", "Gluttony", "Heresy"]);

  const downloadImage = () => {
    
    const div = document.getElementById('hell');
    html2canvas(div)
      .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
        window.open(imgData);
      })
    
  }; 
  

  
      
    return (
      <div className='Results' >
        <div id="hell">
        <h2>Enjoy your time in Hell!</h2>
        <p>
          <img src={images[parseInt(index)]} alt="hell image" height={400} width={400} />
        </p>

        <p>
          You are going to hell for {sins[parseInt(index)]}
        </p>
          
          
      </div>
        <button onClick={downloadImage} variant="danger">share</button>
      </div>
    )

}

export default Results;