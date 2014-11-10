
var colorCycle = function(){
  this.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
};

var discoTime = function(){
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    setInterval(colorCycle.bind(elements[i]),50+i);
  }
};

discoTime();
