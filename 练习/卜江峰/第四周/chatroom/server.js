/**
 * Created by Administrator on 2016/3/30.
 */
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});
var server = require('http').createServer(app);
server.listen('8080');
var io = require('socket.io')(server);

var clients = {};

io.on('connection', function(socket) {
    var username;
    socket.on('message', function(msg) {
        console.log(msg);
    	// if(username){
     //          //把客户端发过来的消息广播给所有的客户端
     //          for(var s in clients){
     //              clients[s].send({user:username,content:msg});
     //          }
     //      }else{
     //          username = msg;
     //          //属性名是用户名，值为对应的socket对象
     //          clients[username] = socket;
     //          socket.send({user:'系统',content:'你的用户名已经修改为'+username});
     //      }
        // socket.send('server:' + msg);
    });
});
