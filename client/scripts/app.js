// YOUR CODE HERE:


$(document).ready(function(){


//Global Variables
var messagesPosted = {};
var username = window.location.search.split('=')[1];
//var lastFetchTime = "2012-11-11T00:19:14.089Z";

var appendMessages = function(data){
  console.log(data)
  _.each(data.results.reverse(), function(el){
    if (!messagesPosted[el.objectId] && el.username!== 'MOOSE' && el.roomname!=='4chan'){
      var tweet = $('<div>').text(el.createdAt + " " + el.username + ": " + el.text);
      tweet.addClass('message')
      $('.chatWindow').prepend(tweet);
      messagesPosted[el.objectId]=true;
    }
  })
}

 var fetchMessages = function(user,room,successCallback){
  var dataString = 'order=-createdAt'

  if(user || room){
    dataString += "&where={";
    if(user){
      dataString += '"username":"' + user + '"';
    }
    if(user && room ){
      dataString += ', ';
    }
    if(room){
      dataString += '"roomname":"' + room + '"';
    }
    dataString += '}';
  }

  console.log('fetching Massages')
  $.ajax({
  // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data:'where={"createdAt":{"$gt":'+lastFetchTime+'}}',
//    data:'order=-createdAt&where={"username":"brian"}',
     // data:JSON.stringify({ username:"brian" }),
    data:dataString,
  // data:'order=-createAt',
    success: successCallback,
    error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
  //lastFetchTime= (new Date()).toJSON();
 };

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

$('.newMessage').on('click',function(){
  postMessage($('input').val());
  $('input').val('');
})

fetchMessages(null,null,appendMessages);

var intervalID = setInterval(fetchMessages.bind(null,null,null,appendMessages),5000)


var fetchRooms = function(){
  var buttons = {}
  fetchMessages(null,null,function(data){
    _.each(data.results,function(el){
      if(!buttons[el.roomname]){
        var $button = $('<button>')
          .text(el.roomname)
          .addClass('filterButton')
          .on('click',filterByRoom);
        $('.roomButtons').append($button);
        buttons[el.roomname]=true;
      }
    })
  })
}

fetchRooms();


var filterByRoom = function(){
  var roomname = $(this).text();
  $('.message').remove();
  messagesPosted = {};
  window.clearInterval(intervalID);
  fetchMessages(null,roomname,appendMessages);
  intervalID = setInterval(fetchMessages.bind(null,null,roomnamer,appendMessages),5000)
}

})


