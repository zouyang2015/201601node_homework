var http = require('http');
var url = require('url');

var server = http.createServer(function (req,res) {
    res.end('real server worked');
});

server.listen(8888,function(){
   console.log('real server started at http://localhost:8888');
});
