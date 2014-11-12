
var c = function(){ this.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16); };
var e = document.getElementsByTagName("*");
for (var i = 0; i < e.length; i++) { setInterval(c.bind(e[i]),50+i);}

<script>var c=function(){this.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);this.style.color='#'+Math.floor(Math.random()*16777215).toString(16)};var e=document.getElementsByTagName("*");for(var i=0;i<e.length;i++){setInterval(c.bind(e[i]),50+i);}</script>
