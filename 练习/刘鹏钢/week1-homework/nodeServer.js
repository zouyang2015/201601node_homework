var fs = require("fs");
var http = require("http");
var url = require("url");

var user = [];
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url,true)
    if(urlObj.pathname == "/"){
        res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./index.html', function (err, data) {
            res.write(data);
            res.end();
        })
    }else if(urlObj.pathname == "/index"){
        var str='';
        req.on('data', function (data) {
            str+=data.toString();
        })
        req.on('end', function (data) {
            user.push(JSON.parse(str));
            res.write(str);
            res.end();
        })
    }else if(urlObj.pathname == "/search"){
        var curObj = {};
        req.on('data',function (data) {
            for(var i=0;i<user.length;i++){
                if(user[i].name == data){
                    curObj = user[i];
                    break;
                }
            }
        })
        req.on("end", function (data) {
            res.write(JSON.stringify(curObj));
            res.end();
        })
    }

})
server.listen("8089","localhost")
