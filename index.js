var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");
var client = redis.createClient();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/scripts", express.static(__dirname + '/scripts'));


io.on('connection', function(socket){
  console.log('a user connected');

  //Send user a list of stuff
  //holdingArry = getPast(client);
  socket.on("send past", function(msg){
    client.lrange(['mes1',0,-1], function (err, reply) {
      io.emit('past messages', reply);
    }, redis.print);
  }


  socket.on("chat message", function(msg){
    //Print message to db
    client.rpush('mes1', msg, redis.print);
    io.emit('chat message', msg);
  });
  socket.on('disconnect',function(){
    console.log('user disconnect');
  });
});


http.listen(80, function(){
  console.log('listening on *:80');
});
