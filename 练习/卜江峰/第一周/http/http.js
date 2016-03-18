/**
 * Created by BJF on 2016/3/9.
 */

var fs=require('fs');
var path = require('path');
var url=require('url');
var http= require('http');
var user=[];
http.createServer(function(request,response){
    var urlObject= url.parse(request.url,true);
    if(urlObject.pathname == "/"){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./index.html',function(err,data){
            response.end(data);
        })
    }else if(urlObject.pathname == "/reg"){
        var str = '';
        request.on('data',function(data){
           str+=data.toString();
        });
        request.on('end',function(){
            user.push(JSON.parse(str));
            //console.log(str);
            response.end(str);
        })
    }else if(urlObject.pathname=="/list"){
        var str = '';
        var curUser;
        request.on('data',function(data){
            str+=data.toString();
        });
        request.on('end',function(){
            var tem=JSON.parse(str);
            console.log(JSON.parse(str));
            for(var i =0; i<user.length;i++){
                //console.log(user);
                if(user[i].username==tem.username){
                    console.log(user[i]);
                    curUser=user[i];
                    //response.end(str);
                    response.end(JSON.stringify(user[i]));
                    return false;
                }
            }
        })
    }

}).listen(1111);