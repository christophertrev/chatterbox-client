

//get msgs from server
var Message = Backbone.Model.extend({});

var Messages = Backbone.Collection.extend( {
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  parse: function(response,options){
    return response.results},
  fetchMessages: function(){
    this.fetch({data:{ order: '-createdAt' }});
  }
});

var MessagesView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('sync',this.render,this)
  },

  render: function(){
    this.collection.forEach(this.renderMessages,this);
    return this.$el;
  },


  renderMessages: function(message){
    var message = new MessageView({model:message})
    this.$el.prepend(message.render());
  },

})

var MessageView = Backbone.View.extend({
  template: _.template('<div class="message"><span class="timeStamp">9:55:02 PM</span>: \
    <span class="username"><%= username %></span> s --     \
    <span class="roomName"><%= roomname %></span></div>'),
  render: function(){
    debugger;
    this.$el.html(this.template(this.model.attributes))
    return this.$el
  }

});

//render messages from server

//post user-generated messages
