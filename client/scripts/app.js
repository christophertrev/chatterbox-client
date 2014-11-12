// YOUR CODE HERE:


$(document).ready(function(){

  //session Variables
  var messagesPosted = {};
  var userName = window.location.search.split('=')[1];
  var roomFilter = null;
  var friends = {};

  var scrubString = function(string){
    if(string){
      return string.replace(/[^a-z 0-9\?,.!@#$%^&*]/gi,'__');
    }
    return 'undefined';
  }

  var scrubMsgObj = function(obj){
    obj.username = scrubString(obj.username);
    obj.roomname = scrubString(obj.roomname);
    obj.text  = scrubString(obj.text);
    return obj;
  }

  var postMessage = function(string) {
    var message = {
    'username': userName,
    'text': string,
    'roomname': $('.roomName').val()
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

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      //data:'where={"createdAt":{"$gt":'+lastFetchTime+'}}',
  //    data:'order=-createdAt&where={"username":"brian"}',
      data:dataString,
      success: successCallback,
      error: function (data) {
        console.error('chatterbox: Failed to get message');
      }
    });
   };

  var fetchMessagesByRoom = function(roomName,successCallback){
    fetchMessages(null, roomName, successCallback || appendMessages);
  };

  var fetchMessagesByUser = function(userName, successCallback){
    fetchMessages(userName, null, successCallback || appendMessages);
  };

  var appendMessages = function(data){
    _.each(data.results.reverse(), function(el){
      if (!messagesPosted[el.objectId] && el.username!== 'MOOSE' && el.roomname!=='4chan'){
        el = scrubMsgObj(el);
        var $message = getMessageNode(el);
        $('.chatWindow').prepend($message);
        messagesPosted[el.objectId]=true;
      }
    })
  }

  var toggleHighlightFriend = function(userName){
    if(!friends[userName]){
      friends[userName] = true;
    }else{
      friends[userName] = false;
    }
    $('.userName:contains('+userName+')').toggleClass('friend')
  }
  var getMessageNode = function(msgObject){
    var $message = $('<div>').addClass('message');
    var $userName = $('<span>').text(msgObject.username)
            .addClass('userName').on('click',toggleHighlightFriend.bind(null,msgObject.username)); // this could be refactored out for clarity?
    var $timeStamp = $('<span>').text((new Date(msgObject.createdAt).toLocaleTimeString())) //this could also be refatored out for clarity
            .addClass('timeStamp');
    var $roomName = $('<span>').text(msgObject.roomname)
            .addClass('roomName');

    if(friends[$userName.text()]){
      $userName.addClass('friend');
    }

    $message
        .append($timeStamp)
        .append(':  ')
        .append($userName)
        .append(' ')
        .append(msgObject.text)
        .append(' --')
        .append($roomName);
    return $message;
  };

  var addRoomButtons = function(){
    var buttons = {};
    fetchMessages(null,null,function(data){
      _.each(data.results,function(el){
        if(!buttons[el.roomname] && el.roomname){
          var $button = $('<button>')
            .val(el.roomname)///// this might enable xss attacks if we are not careful
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
  };



  //add event listeners
  $('.newMessage').on('click',function(){
    postMessage($('.input').val());
    $('.input').val('');
  })

  $('#allRoomsButton').on('click',filterByRoom);

  //create initial room buttons
  addRoomButtons();

  //get messages and set up automatic message fetching
  fetchMessages(null,null,appendMessages);
  setInterval(function(){
    fetchMessagesByRoom(roomFilter)
  },2000);



})


