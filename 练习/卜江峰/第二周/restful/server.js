/**
 * Created by BJF on 2016/3/14.
 */
var path = require('path');
var url = require('url');
var express = require('express');   //加载express模块
var app=express();                  //获取配置对象

var fs= require('fs');
var users=[];
var user={};
app.listen("2222");
app.get('/', function(req,res){
    var rs = fs.createReadStream('index.html');
    rs.setEncoding('utf8');
    var html ='';
    rs.on('data',function(data){
        html+=data;
    });
    rs.on('end',function(){
        res.send(html);
    })
    rs.on('error',function(){
        res.send('访问成功，但是文件读取失败！');
    });
});

//add someone information
app.post('/user',function(req,res){
    user.add(req,res);
});
//search all user information
app.get('/user:name',function(req,res){
    user.list(req,res)
});
//delete someone user
app.delete('/user:name',function(req,res){
    user.delete(req,res)
});
//edit someone information
app.put('/user',function(req,res){
    user.put(req,res)
});

user={
    add:function(req,res){
        var str = '';
        req.on('data',function(data){
            str+=data.toString();
        });
        req.on('end',function(){
            users.push(JSON.parse(str));
            res.end(str);
        })

    },
    list:function(req,res){

    },
    delete:function(req,res){

    },
    put:function(req,res){

    }
}






