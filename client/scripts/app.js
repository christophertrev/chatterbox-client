// YOUR CODE HERE:


$(document).ready(function(){

  //Global Variables
  var messagesPosted = {};
  var userName = window.location.search.split('=')[1];
  var roomFilter = null;
  //var lastFetchTime = "2012-11-11T00:19:14.089Z";

  var postMessage = function(string) {
    var message = {
    'username': userName,
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

  var fetchMessagesByRoom = function(roomName,successCallback){
    fetchMessages(null, roomName, successCallback || appendMessages);
  }

  var fetchMessagesByUser = function(userName, successCallback){
    fetchMessages(userName, null, successCallback || appendMessages);
  } ;

  var appendMessages = function(data){
    console.log(data)
    _.each(data.results.reverse(), function(el){
      if (!messagesPosted[el.objectId] && el.username!== 'MOOSE' && el.roomname!=='4chan'){
        var tweet = $('<div>').text(el.createdAt + " " + el.username + ": " + el.text + "   ---" + el.roomname);
        tweet.addClass('message')
        $('.chatWindow').prepend(tweet);
        messagesPosted[el.objectId]=true;
      }
    })
  }

  var addRoomButtons = function(){
    var buttons = {}
    fetchMessages(null,null,function(data){
      _.each(data.results,function(el){
        if(!buttons[el.roomname] && el.roomname){
          var $button = $('<button>')
            .val(el.roomname)
            .text(el.roomname)
            .addClass('filterButton')
            .on('click',filterByRoom);
          $('.roomButtons').append($button);
          buttons[el.roomname]=true;
        }
      })
    })
  };

  var filterByRoom = function(){
    var roomName = $(this).val();
    $('.message').remove();
    messagesPosted = {};
    roomFilter = roomName;
    fetchMessagesByRoom(roomName);
    console.log(roomName===null);
    // intervalID = setInterval(fetchMessages.bind(null,null,roomname,appendMessages),5000)
  };



  //add event listeners
  $('.newMessage').on('click',function(){
    postMessage($('input').val());
    $('input').val('');
  })

  $('#theOneButton').on('click',filterByRoom);

  //create initial room buttons
  addRoomButtons();

  //get messages and set up automatic message fetching
  fetchMessages(null,null,appendMessages);
  setInterval(function(){
    fetchMessagesByRoom(roomFilter)
  },2000);



})


