const PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.set('view engine', 'hbs');

// logs all requests
app.use(function(req,res,next){
	console.log(`Method: ${req.method}\nPath: ${req.path}\n${req.query}`);
	next();
});

// render home page
app.get('/', function(req,res) {
	res.render('index.html');
});

app.listen(process.env.PORT || PORT, (err) => {
    console.log('Server started (ctrl + c to shut down)');
  });
  