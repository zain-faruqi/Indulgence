import React, { useEffect, useState } from 'react'
import axios from 'axios';
import wrath from '../../img/wrath.png';
import greed from '../../img/greed.png';
import gluttony from '../../img/gluttony.png';
import heresy from '../../img/heresy.png';
import fraud from '../../img/fraud.png';
import limbo from '../../img/limbo.png';
import treachery from '../../img/treachery.png';
import lust from '../../img/lust.png';
import './styles.css';
import Button from 'react-bootstrap/Button'
import html2canvas from 'html2canvas';
import { PieChart } from 'react-minimal-pie-chart';


export default function Results() {

  const [images, setImages] = useState([wrath, greed, gluttony, heresy, limbo, heresy, treachery, lust, fraud]);
  const [sins, setSins] = useState(["wrath", "greed", "gluttony", "heresy", "limbo", "heresy", "treachery", "lust", "fraud"]);

  const downloadImage = () => {

    const div = document.getElementById('hell');
    html2canvas(div)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        window.open(imgData);
      })
  };

  const [transactions, setTransactions] = useState([]);

  // DATA FOR DONUT CHART
  const [chartData, setChartData] = useState();

  // PROCESSES DATA FOR THE DONUT CHART]
  const getChartData = (data) => {
    console.log(`processing inside getChartData: ${data}`);
    // populate setChartData using response.data obj
    // includes labels
    // res = [ 
    //    { title: 'limbo', value: 10, color: '#ffffff' }, 
    //    { title: 'lust', value: 2, color: '#ffffff' },
    // ]
    let res = [];
    let colors = {
      'limbo': '#f1b0b0', 'lust': '#ea9999', 'gluttony': '#e06666',
      'greed': '#df3333', 'wrath': '#cc0000', 'heresy': '#be0505',
      'violence': '#990000', 'fraud': '#660000', 'treachery': '#510000'
    };
    for (const [key, val] of Object.entries(data)) {
      if (typeof (val) === 'object' && val.score != 0)
        res.push({title: key, value: val.score, color: colors[key]});
      console.log(`Chart Data: ${res}`);
    }
    return res;
  }

  useEffect(() => {
    (async () => {
      await getTransactions();
    })();
  }, []);

  const getTransactions = async () => {
    await axios.get('/api/is_user_connected')
      .then(function (response) {
        if (response) {
          axios.get('/api/transactions')
            .then(function (response) {
              console.log('response:' + JSON.stringify(response.data));
              setTransactions(response.data);
              console.log(transactions);
              //return transactions;

              // CHART 
              console.log(`passing ${response.data} to setChartData...`);
              let res = getChartData(response.data);
              setChartData(res);
              console.log(chartData);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      )
      .catch((error) => {
        console.error(error);
      }
      );
  }

  const sin = transactions["sin"];
  const index = sins.indexOf(sin);

  let sinText;
  if (sin === "limbo") {
    sinText = "You are in Limbo. Nothing wrong really, neither heaven nor hell.";
  } else if (sin === "heresy") {
    sinText = "You are going to hell for Heresy. Someone's a tad too blasphemous!";
  } else if (sin === "treachery") {
    sinText = "You are going to hell for Treachery. There's a special place in hell for backstabbers like you.";
  } else if (sin === "lust") {
    sinText = "You are going to hell for Lust. Someone's been committing adultery...";
  } else if (sin === "gluttony") {
    sinText = "You are going to hell for Gluttony. You eat a bit too much, don't you?";
  } else if (sin === "greed") {
    sinText = "You are going to hell for Greed. Money laundering? Hiding riches from family? You can't take that to hell.";
  } else if (sin === "wrath") {
    sinText = "You are going to hell for Wrath. Violence and moodiness won't get you anywhere but deeper.";
  } else if (sin === "violence") {
    sinText = "You are going to hell for Violence. Be kinder to others. And yourself. Or else...";
  } else if (sin === "fraud") {
    sinText = "You are going to hell for Fraud. Caught in webs of lies. Still want to expand the lore?";
  } else {
    sinText = "You are going to hell for " + sin;
  }

  const share = () => {
    console.log("share");
    if (navigator.share) {
      navigator.share({
        title: 'Your Hell',
        text: `I am going to hell for ${sin}!}`,
        url: images[parseInt(index)],
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  return (
    <div className='Results' >
      <h2>Enjoy your time in Hell!</h2>
      <div className='hell_chart_container'>
        <div className="hell">
          <p>
            <img id='img_result' src={images[parseInt(index)]} alt="hell image" height={400} width={400} />
          </p>
        </div>
        <div className="chart">
          <div id='chart_container'>
            <PieChart
              data={chartData}
              lineWidth={15}
              paddingAngle={5}
              rounded
              labelPosition={45}
              viewBoxSize={[100, 100]}
              radius={45}
              label={({dataEntry}) => `${dataEntry.title} (${dataEntry.value})`}
              labelStyle={(index) => ({
                fill: chartData[index].color,
                fontSize: '4px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
              })} 
            />
          </div>
        </div>
      <h4>{sinText}</h4>
      <p>Your total number of transactions is <b>{transactions["transac_ct"]}.</b></p>
      <Button variant="danger" onClick={() => share()} >share</Button>
    </div>
  )
}
