var express=require("express"),app=express(),http=require("http").Server(app),io=require("socket.io")(http);app.get("/",function(e,s){s.sendFile(__dirname+"/index.html")}),app.use("/styles",express.static(__dirname+"/styles")),app.use("/scripts",express.static(__dirname+"/scripts")),io.on("connection",function(e){console.log("a user connected"),e.on("chat message",function(e){io.emit("chat message",e)}),e.on("disconnect",function(){console.log("user disconnect")})}),http.listen(3e3,function(){console.log("listening on *:3000")});var redis=require("redis"),client=redis.createClient();client.on("error",function(e){console.log("Error "+e)}),client.set("string key","string val",redis.print),client.hset("hash key","hashtest 1","some value",redis.print),client.hset(["hash key","hashtest 2","some other value"],redis.print),client.hkeys("hash key",function(e,s){console.log(s.length+" replies:"),s.forEach(function(e,s){console.log("    "+s+": "+e)}),client.quit()});