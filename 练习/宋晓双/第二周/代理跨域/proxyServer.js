var http = require("http");
var fs = require("fs");
var bodyParse = require("./bodyParse.js");//文件模块
var proxy = require("./rquest.js");//文件模块
var users = [];
var server = http.createServer(function (req, res) {
    if (req.url == "/") {
        fs.createReadStream("./index.html").pipe(res);
    } else if (req.url == '/reg') {
        bodyParse(req, function (result) {
            proxy({
                lost: 'localhost',
                port: 8080,
                path: '/',
                method: 'post'
            },result,function(response){
                console.log(result,"======");
               res.end(response);
            });
        });
    }

});
server.listen(9090);
