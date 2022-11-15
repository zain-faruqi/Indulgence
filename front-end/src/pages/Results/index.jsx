import React, {useEffect} from 'react'
import axios from 'axios';



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

export default function Results() {

  const getTransactions = async () => {
    axios.get('/api/transactions').then((response) => {
      console.log(response);
    });
  }
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

  return (
    <div>
      {getTransactions}
    </div>
  );
}
/*function Results() {
  console.log("HERE");
  var transactions = [];

  const getTransactions = async () => {
    
    axios.get('/api/transactions')
      .then(function (response) {
        console.log(response);
        transactions = response.data.transactions;
        console.log("transactions: " + transactions);
      })
      .catch((error) => {
        console.log(error);
      });
        }
  getTransactions();

  return (
    <div>{transactions}</div>
  )
}*/
  
      
 /*   return (
      <div>
      {getTransactions}
        Returned
      </div>
    )

}*/



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