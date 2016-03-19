var bodyParser = require('./bodyParse.js');
var http = require('http');

module.exports = function(options,data,callback){
    //向真正的数据服务器发送请求 res代表服务器的响应
    var request = http.request(options,function(res){
        bodyParser(res,function(result){
            callback(result);
        });
    });
    //向服务器发送请求体
    request.end(data);
};