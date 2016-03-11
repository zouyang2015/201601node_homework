var http = require('http');
var fs = require('fs');
var mime = require('mime');
var url = require('url');
var path = require('path');
var users = [];
var server = http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true);

    if(urlObj.pathname == '/'){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        fs.readFile('./reg.html',function(err,data){
            response.end(data);
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
});
server.listen(8080,'localhost');