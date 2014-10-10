var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/scripts", express.static(__dirname + '/scripts'));

//for OG: image
//app.use("/chat.png", express.static(__dirname + '/chat.png'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("chat message", function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect',function(){
    console.log('user disconnect');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
