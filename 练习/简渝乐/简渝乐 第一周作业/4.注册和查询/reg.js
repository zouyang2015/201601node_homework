/**
 * Created by ll on 2016/3/11.
 */
var fs= require('fs');
var http= require('http');
var url = require('url');
var user=[];
var server= http.createServer(function(req,res){
    var urlObj= url.parse(req.url,true);
    res.setHeader('Content-Type','text/html;charset=utf8');
    if(urlObj.path == "/"){
        fs.readFile('./reg.html',function(err,data){
            res.end(data);
        })
    }else if(urlObj.path == '/reg'){
        var str="";
        req.on('data',function(data){
            str+=data.toString();
        });
        req.on('end',function(data){
            user.push(JSON.parse(str));
            if(JSON.parse(str).name=="" && JSON.parse(str).age==""){
                res.end("0");
            }else{
                res.end("1");
            }
        });

    }else if(urlObj.path == '/reg?query=true'){
        res.end(JSON.stringify(user));
    }
});
server.listen(8088,'localhost');