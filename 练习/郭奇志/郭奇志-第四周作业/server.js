/**
 * Created by dell on 2016/3/28.
 */
var express=require('express');
var app=express();
var path=require('path');
app.use(express.static(__dirname));
app.get('/',function(req,res){
    //res.sendfile('index.html');
    res.sendFile(path.join(__dirname,'index.html'));
})
//创建htto服务器
var server=require('http').createServer(app);
//创建socket。io服务器
var io=require('socket.io')(server);
//scket代表与某个客户端的链接对象
var clients={};
io.on('connection',function(socket){
    var user;
    socket.send({user:'系统',content:'请输入用户名'})
    //clients.push(socket);
    socket.on('message',function(msg){
        var result=msg.match(/^@(.+)\s(.+)$/);
        if(result){
            var toUser=result[1];
            var content=result[2];//match,返回1匹配的字符串2第一个分组3第二个分组
            if(clients[toUser]){
                clients[toUser].send({user:user,content:['私聊']+content})
            }else{
                socket.send({user:'系统',content:'你想私聊的人不在线 '+user});
            }
        }else{
            if(user){
                for(var s in clients){
                    clients[s].send({user:user,content:msg});
                }
            }else{
                user=msg;
                clients[user]=socket;
                socket.send({user:'系统',content:'你的用户名已经修改为: '+user});
            }
        }

    })
});

server.listen(80);