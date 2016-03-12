/**
 * Created by DELL on 2016/3/10.
 */
var http = require('http');
var fs= require('fs');
var mime  = require('mime');
var path = require('path');
//node 亲生模块 帮助我们解析请求中的url
var url = require('url');
var users = [];

var server = http.createServer(function(request,response){
    //把url转成url对象
    var urlObj = url.parse(request.url,true);
    // console.log(urlObj);


    //pathname 指的是路径名 问号和端口号中间的那一部分
    if(urlObj.pathname == '/'){
        response.writeHead(200,{'content-type':'text/html;charset=utf-8'})
        //query 查询字符串 ，true,则转成对象
        fs.readFile('./reg.html',function(err,data){
            response.end(data);
        })
    }else if(urlObj.pathname == '/reg'){
        response.writeHead(200,{'content-type':'text/html;charset=utf-8'})
        //每当服务器收到客户端发过来的一段数据的时候就会触发data事件
        var str = '';
        request.on('data',function(data){
            str+=data.toString();
        });
        //当所有的数据全部接收完毕的时候会触发end事件，这是请求体的数据就接收完整
        request.on('end',function(){
            console.log(str);
            //转成对象追加到用户列表里
            users.push(JSON.parse(str));

            //最后返回用户列表
            response.end("添加成功");
        });
    }else if(urlObj.pathname == '/find') {
        //最后返回用户列表
        response.end(JSON.stringify({"data": users}));
    }

});
server.listen(8080,'localhost');