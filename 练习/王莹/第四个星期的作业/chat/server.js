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
                user.name=message.name;     //保存本人信息
                user.scoket=scoket;
                user.id=scoket.id;
                users.addUser(message.name,scoket);
                mail.online(scoket);
                break;
            case 'word':
                mail.message(message.word,scoket);
                console.log('发送成功');
                break;
            case 'one':
                mail.message(message.word,scoket,message.id);
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

server.listen(80,'127.0.0.1',function(err){
    if(err)
        console.log(err);
    else
        console.log('Service is running');
})