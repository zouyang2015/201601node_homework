/**
 * Created by lijl on 2016/3/12.
 */
var fs = require('fs');
var http = require('http');
var mime = require('mime');
var path = require('path');
var url = require('url');
var users = [];


var server = http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true);
    if(urlObj.pathname == '/'){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./index.html',function(err,data){
            if (err){
            }else{
                response.end(data);
            }
        })
    }else if(urlObj.pathname == '/reg'){
        var str = '';
        request.on('data',function(data){
            str+=data.toString();
        });
        request.on('end',function(){
            users.push(JSON.parse(str));
            response.end(str);
        })
    }
    else if(urlObj.pathname === '/list'){
        response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
        response.end(JSON.stringify(users));
    }
    else{
        var requesturl = request.url;
        response.setHeader('Content-Type',mime.lookup(requesturl)+';charset=utf-8');
        fs.exists('.'+requesturl,function(exists){
            if(exists){
                fs.readFile('.'+requesturl,function(err,data){
                    if(err){
                        response.statusCode = 404;
                        response.end();
                    }else{
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }
                });
            }else{
                response.statusCode = 404;
                response.end();
            }
        });

    }
}).listen(8080,function(){
    console.log('server started on http://localhost:8080');
});