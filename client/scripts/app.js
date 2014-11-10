// YOUR CODE HERE:


$(document).ready(function(){

var appendMessages = function(data){
  console.log(data);
  _.each(data.results, function(el){
    var tweet = $('<div>').text(el.text);
    $('.chatWindow').append(tweet);
  })
}
//post messages
  //clear any existing messages in window
  //$('.chatWindow').text('')
  //get most recent 10 from server
  //save them as var
  $.ajax({
  // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data:{'username':"jillian"},
    success: appendMessages,
    error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
  //create new HTML node for each of those messages
  //escaping the text
  //append each node to the chat window





})
