require('dotenv').config({ path: 'config.env' });
var session = require('express-session');
const moment = require("moment");
const { Configuration, PlaidApi, Products, PlaidEnvironments } = require('plaid');
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

// database setup
//require('./db');
//const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: true
  }
  
}));


// static files
const path = require("path");
const { response } = require('express');


//plaid
// Configuration for the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

//Instantiate the Plaid client with the configuration
const client = new PlaidApi(config);

// Checks whether or not the user has an access token for a financial
// institution
app.get("/api/is_user_connected", async (req, res, next) => {
  console.log(`Our access token: ${req.session.access_token}`);
  return req.session.access_token
    ? res.json({ status: true })
    : res.json({ status: false });
});

// Retrieves the name of the bank that we're connected to
app.get("/api/get_bank_name", async (req, res, next) => {
  const access_token = req.session.access_token;
  const itemResponse = await client.itemGet({ access_token });
  const configs = {
    institution_id: itemResponse.data.item.institution_id,
    country_codes: ["US"],
  };
  const instResponse = await client.institutionsGetById(configs);
  console.log(`Institution Info: ${JSON.stringify(instResponse.data)}`);
  const bankName = instResponse.data.institution.name;
  res.json({ name: bankName });
});

//Creates a Link token and returns it
app.get("/api/create_link_token", async (req, res, next) => {
  const tokenResponse = await client.linkTokenCreate({
    user:  {client_user_id: req.session.id},
    client_name: "Indulgence",
    language: "en",
    products: ["transactions"],
    country_codes: ["US"],
    //add redirect uri in production
  });
  console.log(`Token response: ${JSON.stringify(tokenResponse.data)}`);

  res.json(tokenResponse.data);
});


// Exchanges the public token from Plaid Link for an access token
app.post("/api/exchange_public_token", async (req, res, next) => {
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  // FOR DEMO PURPOSES ONLY
  // You should really store access tokens in a database that's tied to your
  // authenticated user id.
  console.log(`Exchange response: ${JSON.stringify(exchangeResponse.data)}`);
  console.log(`Our access token: ${exchangeResponse.data.access_token}`);
  req.session.access_token = exchangeResponse.data.access_token;
  req.session.item_id = exchangeResponse.data.item_id;
  res.json(exchangeResponse.data);
});
// Fetches balance data using the Node client library for Plaid
app.get("/api/transactions", async (req, res, next) => {
  const access_token = req.session.access_token;
  
  const startDate = moment().subtract(1000, "days").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  const transactionResponse = await client.transactionsGet({
    access_token: access_token,
    start_date: startDate,
    end_date: endDate,
    options: { count: 10 },
  });
  res.json(transactionResponse.data);
});



if (process.env.NODE_ENV == 'production') {
    console.log(__dirname);
    app.use(express.static(path.join(__dirname, '/front-end/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send(process.env.NODE_ENV);
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

  