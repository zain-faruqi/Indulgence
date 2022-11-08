import React, {useEffect} from 'react'
import axios from 'axios';




function Results() {
  const transactions = [];
  
  /*
  const getTransactions = async () => {
    axios.get('/api/is_user_connected')
      .then(function (response) {
        if (response) {
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
     
      }
    )
      .catch((error) => {
        console.log(error);
      }
    );
  }
  getTransactions();
  */
      
    return (
      <div>{transactions}</div>
    )

}

export default Results;