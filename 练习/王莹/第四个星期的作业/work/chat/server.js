/**
 * Created by Administrator on 2016/3/30.
 */
var express=require('express');
var app=new express();
var users=require('./modules/users');
var mail=require('./modules/mail');

//设置静态文件夹的目录        设置静态文件夹之后，访问 / 的时候会默认选择index.html
app.use(express.static(__dirname));



//创建一个HTTP服务器
var server=require('http').createServer(app);
//创建scoket.io 服务器，附加在server上面
var io=require('socket.io')(server);

io.on('connection',function(scoket){
    var user={};
    console.log('连接成功');

    scoket.on('message',function(message){
        console.log(message);
        switch (message.type){
            case 'setName':
                user.name=message.Name;     //保存本人信息
                user.scoket=scoket;
                user.id=scoket.id;
                users.addUser(message.Name,scoket);
                mail.online(scoket);
                //scoket.send({success:true,users:users.getUsers(),type:'setName'});
                break;
            case 'word':
                mail.message(message.message,scoket.id);
                console.log('发送成功');
                break;
            default:
                scoket.send({success:false,message:'未处理'});
                break;
        }
        //在线人数
        console.log('当前在线人数：'+users.users.length);
    })
})

server.listen(80,'192.168.2.106',function(err){
    if(err)
        console.log(err);
    else
        console.log('Service is running');
})