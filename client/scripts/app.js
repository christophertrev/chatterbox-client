// YOUR CODE HERE:


$(document).ready(function(){

var messagesPosted = {};

var appendMessages = function(data){
  console.log(data);
  _.each(data.results, function(el){
    if (!messagesPosted[el.objectId]){
      var tweet = $('<div>').text(el.text);
      $('.chatWindow').append(tweet);
      messagesPosted[el.objectId]=true;
    }
  })
}

// var fetchMessages = function(){
  console.log('aquiring New BroTexts');
  $.ajax({
  // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data:{'results.username':'jillian'},
    success: appendMessages,
    error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
// };

// setInterval(fetchMessages,1000)

})
