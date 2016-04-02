var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname));
app.get('/',function(req,res){
	res.renderFile(path.join(__dirname,'index.html'));
});

//线创建一个http服务器
var http = require('http').createServer(app);
//再创建一个socket 服务器
var io = require('socket.io')(http);
//新建客户端对象
var clients = {};
io.on('connection',function(socket){
	var username ;
	socket.send({user:'系统',content:'请输入用户名'});
	socket.on('message',function(msg){
		var result = msg.match(/^@(.+)\s(.+)$/);
		if(result){
			var toUser = result[1];
			var content = result[2];
			if(clients[toUser]){//通过用户名把对应的socket取出来
				clients[toUser].send({user:username,content:'[私聊]'+content});
			}else{
				socket.send({user:'系统',content:'你想私聊的人不在线'});
			}
		}else{
			if(username){
				for(var s in clients){
					clients[s].send({user:username,content:msg});
				}
			}else{
				username = msg;
				clients[username] = socket;
				socket.send({user:'系统',content:'您已经把用用户名设置为'+username});
			}
		}
		console.log(msg);
	});
});



http.listen(80);

