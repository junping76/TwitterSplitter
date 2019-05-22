// Name: app.js   
// Author: Jun Ping
// Description: Basic setup and entry point    

// Setup
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/router'); // Imports routes for messages
var cors = require('cors');
var app = express();
const path = require('path');

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', router);
app.use(cors());

// Default path setup
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  
// Database setup
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TweetDB', { useNewUrlParser: true });

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log("TweetDB connection alive");
});

// Listening to port 80
const port = 80;

app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});