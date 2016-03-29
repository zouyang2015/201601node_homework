var http=require('http');
var fs=require('fs');
var options={
    host:'localhost',
    port:8080,
    path:'/post',
    method:'POST',
    headers:{'Content-Type':'application/json'}
}
var server=http.createServer(function(req,res){
    if(req.url=='/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(req.url=='/reg'){
        var result="";
        req.on('data',function(data){
            result+=data;
        });
        req.on('end',function(){
            var request=http.request(options,function(str){
                var str="";
                res1.on('data',function(data){
                    str+=data;
                });
                res1.on('end',function(){
                    res.end(str);
                });
            });
            request.write(result);
            request.end();
        });
    }
}).listen(8082);
