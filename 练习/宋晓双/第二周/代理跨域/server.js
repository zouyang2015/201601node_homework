
var http=require("http");
var fs=require("fs");
var bodyParser = require('./bodyParse.js');
var users=[];
var server=http.createServer(function(req,res){
   var result="";
    req.on("data",function(data){
        result+=data;
    });
    req.on("end",function(){
        console.log(result,"+++++");
       //users.push(result);
        //console.log(users,"---");
        res.end(JSON.stringify(users));
    });

});
server.listen(8080);