// Name: message.js   
// Author: Jun Ping
// Description: Mongoose schema for messages   

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    Tweet: String,
    Name: String,
}, 
{ 
    versionKey: false 
});


// Export the model
module.exports = mongoose.model('messages', MessageSchema);