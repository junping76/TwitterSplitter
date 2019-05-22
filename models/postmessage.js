// Name: postmessage.js   
// Author: Jun Ping
// Description: Process new message posting

var Message = require('./message');
const MAX_CHAR = 50; // Maximum 50 characters

// Insert message into database
function createNew(newMessage) {
  var newMsg = new Message(newMessage);

  newMsg.save(function (err) {
    if (err) return next(err);
  })
}

// Check maximum span of non-whitespace characters, return false if exceed limit
function checkCharacterSpan(checkMessage) {
  let span = 0;

  for(let i=0; i<checkMessage.length; i++) {
    // Check whitespace in message string
    if(checkMessage.charAt(i) === ' ') {
      // Reset span to 0 if whitespace found
      span = 0;
    }
    else {
      span++;
    }
    
    // Exceed maximum limit
    if(span > MAX_CHAR-4) {
      return false;    
    }
  }

  return true;
}

// Split long message that exceed character limit 
exports.splitMessage = function(inputString) {
  let arString = []; // Result array of splitted chunks
  let index = 0;     // Index of result array
  let split;         // Split position

  while(inputString.length > MAX_CHAR-4) {
    // Initialize position
    split = MAX_CHAR-4;
    
    // Check whitespace for split position
    while((inputString.charAt(split) != ' ')&&(split > 0)) {
      split--;
    }
    
    // Record a chunk into array
    arString[index] = inputString.substring(0,split);
    index++;
    
    // Remaining message after splitting
    inputString = inputString.substring(split);
  }

  // Last chunk of the message
  arString[index] = inputString;

  // Add "part indicator" to each chunk
  for(let i=0; i<=index; i++) {
    let temp = (i+1) + '/' + arString.length + ' ';
    arString[i] = arString[i].padStart(4+arString[i].length, temp);
  }

  return arString;
}

exports.processMessage = function(newPost) {
  // Check message total length
  if(newPost['Tweet'].length > MAX_CHAR) {
    // Check span of non-whitespace characters
    if(checkCharacterSpan(newPost['Tweet']) === true) {
      // Split long message into chunks
      let arResult = splitMessage(newPost['Tweet']);

      // Create database records for each chunk
      arResult.forEach(function(item){
        createNew({ Tweet: item, Name: newPost['Name']});  
      });
    }
    else {
      // Character span exceed limit
      return false;
    }
  }
  else
  {
    // Create record directly for message equal or less than 50 characters
    createNew(newPost);  
  }

  // Post new message successfully
  return true;
};
  