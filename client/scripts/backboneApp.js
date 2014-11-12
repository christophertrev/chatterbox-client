

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


//render messages from server

//post user-generated messages
