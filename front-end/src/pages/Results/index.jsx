import React, {useEffect, useState} from 'react'
import axios from 'axios';
import wrath from '../../img/wrath.png';
import greed from '../../img/greed.png';
import gluttony from '../../img/gluttony.png';
import heresy from '../../img/heresy.png';
import limbo from '../../img/limbo.png';
import treachery from '../../img/treachery.png';
import lust from '../../img/lust.png';
import './styles.css';
import Button from 'react-bootstrap/Button'



export default function Results() {
  
  const [images, setImages] = useState([wrath, greed, gluttony, heresy, limbo, heresy, treachery, lust]);
  const [sins, setSins] = useState(["wrath", "greed", "gluttony", "heresy", "limbo", "heresy", "treachery", "lust"]);


  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    (async () => {
      await getTransactions();
    })();
},[]);
  
  const getTransactions = async () => {
    await axios.get('/api/is_user_connected')
      .then(function (response) {
        if (response) {
           axios.get('/api/transactions')
          .then(function (response) {
              console.log('response:' + JSON.stringify(response.data));
              setTransactions(response.data);
              console.log(transactions);
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
    sinText = "You are in Limbo, you are not going to hell or heaven, you are just floating around";
  } else if (sin === "heresy") {
    sinText = "You are going to hell for Heresy, you are a heretic";
  } else if (sin === "treachery") {
    sinText = "You are going to hell for Treachery, you are a traitor";
  } else if (sin === "lust") {
    sinText = "You are going to hell for Lust, you are a dirty dirty dog";
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
        <div id="hell">
        <h2>Enjoy your time in Hell!</h2>
        <p>
          <img src={images[parseInt(index)]} alt="hell image" height={400} width={400} />
        </p>
        <p>
          {sinText}
        </p>
        <p>
          Your Total number of transaction is {transactions["transac_ct"]}
        </p>
        <Button variant="danger" onClick={() => share()} >share</Button>
      </div>
    </div>
  )

}

