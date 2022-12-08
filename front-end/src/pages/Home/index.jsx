import './styles.css';
//import React from 'react';
import Button from 'react-bootstrap/Button'
import plaid_api from '../../img/plaid_logo_white.png'
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import axios from 'axios';

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';

const Home = () => {
  const [token, setToken] = useState(null);

  // get a link_token from your API when component mounts
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

   const onSuccess = useCallback((public_token, metadata) => {
    // log and save metadata
    console.log('onSuccess', metadata);
    // exchange public token
     axios.post('/api/exchange_public_token', {
       public_token: public_token
     })
       .then(function (response) {
         console.log(response);
         window.location.href = '/loading';
       })
       .catch((error) => {
         console.log(error);
        });
  },
  [],
);
  const onEvent = useCallback((eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback((error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata);
  }, []);

  
  const config = {
    token,
    onSuccess,
    onEvent,
    onExit,
  };

  const {
    open,
    ready,
    // error,
    // exit
  } = usePlaidLink(config);

//function Home() {


    
    return (
      <div className='HOME'>
        <div class='title'>
        <img src="https://see.fontimg.com/api/renderfont4/4a4x/eyJyIjoiZnMiLCJoIjoxMDAsInciOjIwMDAsImZzIjo1MCwiZmdjIjoiI0ZGRjZGNiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/SU5EVUxHRU5DRS4/straighttohell-bb.png" alt="Ancient fonts"></img>
        </div>
        <h2>Which Hell is your Home?</h2>
        <br></br>
        <Button variant="danger" onClick={() => open()} disabled={!ready}>FIND OUT WITH <img src={plaid_api} alt="plaid_api" height={50} width={100}/></Button> 
      </div>
    )
}

export default Home;