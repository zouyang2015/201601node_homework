var http = require('http');
var fs = require('fs');
var url = require('url');
var arr=[];
var server = http.createServer(function(request,response){
    delete require.cache;
       var urlObj = url.parse(request.url),
           pathname = urlObj.pathname;
           if(pathname =='/'){
               pathname = '/index.html';
           }
           if(pathname == '/favicon.ico'){
               return 404;
           }
           if(pathname == '/index.html'){
               response.setHeader('Content-Type','text/html;charset=utf-8');
               fs.readFile('./index.html',function(err,data){
                   if(err){
                       throw err;
                   } else {
                       response.end(data);
                   }

               })
           } else if(pathname =='/index.css'){
               response.setHeader('Content-Type','text/css;charset=utf-8');
               fs.readFile('./index.css',function(err,data){
                   if(err){
                       throw err;
                   } else {
                       response.end(data);
                   }
                   response.end();
               })
           } else if(pathname == '/reg'){
               var str="";
              request.on('data',function(data){
                  str+=data.toString();

              })
              request.on('end',function(){
                  arr.push(JSON.parse(str));

                  fs.writeFile('user.txt',JSON.stringify(arr),function(err){
                      if(err){
                          throw "数据未写入文件";
                      }else {
                          fs.readFile('./user.txt',function(err,data){
                              if(err){
                                  throw "未读取到数据";
                              }else {
                                  response.end(data);
                              }
                          })
                      }
                  })
              })
           }


});
server.listen(70,function(){
    console.log('ok');
})