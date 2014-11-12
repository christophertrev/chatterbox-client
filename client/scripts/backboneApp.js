

//get msgs from server
var Message = Backbone.Model.extend({});

var Messages = Backbone.Collection.extend( {
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  parse: function(response,options){
    return response.results};
  fetchMessages: function(){
    this.fetch({data:{ order: '-createdAt' }});
  }
} );

var messages = new Messages();
messages.fetchMessages();

//render messages from server

//post user-generated messages
