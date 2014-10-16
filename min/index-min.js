var express=require("express"),app=express(),http=require("http").Server(app),io=require("socket.io")(http),redis=require("redis"),client=redis.createClient();app.get("/",function(e,s){s.sendFile(__dirname+"/index.html")}),app.use("/styles",express.static(__dirname+"/styles")),app.use("/scripts",express.static(__dirname+"/scripts")),io.on("connection",function(e){console.log("a user connected"),client.lrange(["mes1",0,-1],function(e,s){io.emit("past messages",s)},redis.print),e.on("chat message",function(e){client.rpush("mes1",e,redis.print),io.emit("chat message",e)}),e.on("disconnect",function(){console.log("user disconnect")})}),http.listen(3e3,function(){console.log("listening on *:3000")});