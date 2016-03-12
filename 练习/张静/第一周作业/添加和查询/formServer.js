/**
 * Created by Administrator on 2016/3/12.
 */
var fs=require('fs');
var http=require('http');
var url=require('url');
var ary=[];
http.createServer(function(req,res){

    var urlObj=url.parse(req.url);
    var pathname=urlObj.pathname;
    if(pathname=='/'){
        fs.readFile('./form.html','utf8',function(err,data){
            res.end(data);
        });
    }else if(pathname=='/add'){
        var str="";

        req.on('data',function(data){
            data=data.toString();
            str+=data;
        });
        req.on('end',function(){
            ary.push(str);
            console.log(ary);
        });
        console.log(ary);
        res.end("添加数据成功！");
    }else if(pathname=='/get'){
        //console.log(ary.toString());
        res.end(JSON.stringify(ary));
    }

}).listen(8080,'localhost');
