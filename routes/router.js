// Name: router.js   
// Author: Jun Ping
// Description: Router path setup for REST API    

var express = require('express');
var router = express.Router();

// Require the controllers
var message_controller = require('../controllers/controller');


// Simple test to check communication
router.get('/v1/test', message_controller.test);

// User posts new message
router.post('/v1/post', message_controller.message_post);

// Get all the messages saved in the database
router.get('/v1/getall', message_controller.message_getall);


module.exports = router;