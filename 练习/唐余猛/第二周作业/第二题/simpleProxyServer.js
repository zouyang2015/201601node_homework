var http = require('http');
var proxy = require('./request');
var url = require('url');

// 获取请求的headers，去掉host和connection
var getHeader = function (req) {
    var ret = {};
    for (var i in req.headers) {
        if (!/host|connection/i.test(i)) {
            ret[i] = req.headers[i];
        }
    }
    return ret;
};
http.createServer(function (req, res) {
    console.log(req.headers);

    var path = url.parse(req.url).path;
    var method = req.method;

    var options = {
        host:req.headers.realhost? req.headers.realhost : 'localhost',
        port:req.headers.port ?req.headers.port : 8888,
        path: path,
        method: method,
        headers:  getHeader(req)
    }
    proxy(options, function (response) {
        res.end(response);
    });
}).listen(9090);

