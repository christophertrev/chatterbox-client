// YOUR CODE HERE:

var username = window.location.search.split('=')[1];

$(document).ready(function(){


//Global Variables
var messagesPosted = {};
//var lastFetchTime = "2012-11-11T00:19:14.089Z";

var appendMessages = function(data){
  console.log(data)
  _.each(data.results.reverse(), function(el){
    if (!messagesPosted[el.objectId]){
       var tweet = $('<div>').text(el.createdAt + " " + el.username + ": " + el.text);
       $('.chatWindow').prepend(tweet);
      messagesPosted[el.objectId]=true;
    }
  })
}

 var fetchMessages = function(){
  console.log('fetching Massages')
  $.ajax({
  // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data:'where={"createdAt":{"$gt":'+lastFetchTime+'}}',
    data:'order=-createdAt',
    success: appendMessages,
    error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
  //lastFetchTime= (new Date()).toJSON();
 };

fetchMessages();
setInterval(fetchMessages,5000)

})


var postMessage = function(string) {
  var message = {
  'username': username,
  'text': string,
  'roomname': 'bouncyCastle 2.0'
  };

  $.ajax({
    url:'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(){
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to post message');
    }
  });
};
