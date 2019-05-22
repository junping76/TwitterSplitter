// Name: controller.js   
// Author: Jun Ping
// Description: Controller for API function calls   

var Message = require('../models/message');
var post = require('../models/postmessage');

// Simple testing for communication
exports.test = function (req, res) {
  res.send('Greetings from the Tweeter controller!');
};

// Posting a new message
exports.message_post = function (req, res) {

  if(post.processMessage(req.body) === true) {
    res.send('Message posted successfully.')
  }
  else {
    res.send('Message posting error!')
  }

};

// Get all messages from database
exports.message_getall = function (req, res) {

  var query = Message.find({ });

  // execute the query
  query.exec(function (err, result) {
    if (err) return next(err);

    res.send(result);
  });

};

