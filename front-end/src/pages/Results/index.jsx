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
import ChartComponent from '../../components/donut_chart/ChartComponent.js';

const baseURL = '/api/transactions';

/*
React.useEffect(() => {
  const createLinkToken = async () => {
    axios.get('/api/create_link_token')
      .then(function (response) {
        console.log(response);
        const link_token = response.data.link_token;
        setToken(link_token);
        console.log("token: " + token);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  createLinkToken();
}, []);
*/

/*
export default function Results() {
  var transactions = [];
  console.log("1")
  const getTransactions = async () => {
    axios.get('/api/transactions').then((response) => {
      consolf.log("2")
      console.log(response);
      transactions = response.data.transactions;
    });
  }

  getTransactions();
*/

  /*
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    const getTransactions = async () => {
      axios.get('/api/transactions').then((response) => {
        console.log(response);
        setPost(response.data);
      });
    }

    getTransactions();
  }, []);
  */
  /*if (!post) return null;*/

/*
  return (
    <div>
      {transactions}
    </div>
  );
}
*/

export default function Results() {
  
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

  const [transactions, setTransactions] = useState([]);

  // DATA FOR DONUT CHART
  // const [chartData, setChartData] = useState([]);

  useEffect(() => {
    (async () => {
      await getTransactions();
      await setChartData();
    })();
},[]);
  
  const getTransactions = async () => {
    await axios.get('/api/is_user_connected')
      .then(function (response) {
        if (response) {
           axios.get('/api/transactions')
          .then(function (response) {
              console.log('response:' + JSON.stringify(response.data));
              //type error
              setTransactions(response.data);
              //let transactions = response.data;
              console.log(transactions);
              //return transactions;

              // populate setChartData using transactions obj
              // includes labels
              // data = [ 
              //    { sin: 'limbo', value: 10 }, 
              //    { sin: 'lust', value: 2 },
              // ]
              /*
              let data = [];
              for (const [key, val] of Object.entries(transactions)) {
              if (typeof (val) === 'object' && val.percent != 0)
                data.push({sin: key, value: val.percent});
              }
              console.log(data)
              setChartData(data);
              console.log(chartData);
              */
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
  //getTransactions();
  
  return (
  
    <div className='Results' >
        <div id="hell">
        <h2>Enjoy your time in Hell!</h2>
        <p>
          <img src={images[parseInt(index)]} alt="hell image" height={400} width={400} />
        </p>
        <p>
          You are going to hell for {transactions["sin"]}
        </p>
        <p>
          Your Total number of transaction is {transactions["transac_ct"]}
        </p>
        <p>
          <div className="chart">
            <ChartComponent data={transactions} />
          </div>
        </p>
        <h3>
          Your Sins Breakdown:
        </h3>
        <p>
          Limbo : Nothing wrong really, but there's a place in Hell for you too.
        </p>
        <p>
          Lust : Someone's been committing adultery...
        </p>
        <p>
          Gluttony : You eat a bit too much, don't you?
        </p>
        <p>
          Greed : Money laundering? Hiding riches from family? You can't take that to hell.
        </p>
        <p>
          Wrath : Violence and moodiness won't get you anywhere but deeper.
        </p>
        <p>
          Heresy : Someone's a tad too blasphemous!
        </p>
        <p>
          Violence : Be kinder to others. And yourself. Or else...
        </p>
        <p>
          Fraud : Caught in webs of lies. Still want to expand the lore?
        </p>
        <p>
          Treachery : There's a special place in hell for backstabbers like you.
        </p>
          
      </div>
        <button onClick={downloadImage} variant="danger">share</button>
      </div>
  )

}

/*<div>{tramsaction}</div> */
/*
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
*/  
    
/*
   return (
      <div>
      {getTransactions}
        Returned
      </div>
    )

}
*/


/*
export default class Results extends React.Component {
  state = {
    transactions: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.name}</li>
            )
        }
      </ul>
    )
  }
}
*/
/*export default class Results extends React.Component{
  async getData() {
      const res = await axios("/api/transactions");
      return await res.json(); // (Or whatever)
  }
  constructor(...args) {
      super(...args);
      this.state = {data: null};
  }
  componentDidMount() {
      if (!this.state.data) {
          (async () => {
              try {
                  this.setState({data: await this.getData()});
              } catch (error) {
                  console.log("U got an error!")
              }
          })();
      }
  }
  render() {
      return (
          <div>
              {this.state.data ? <em>Loading...</em> : this.state.data}
          </div>
      );
  }
}*/