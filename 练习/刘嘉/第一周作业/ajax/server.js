var http = require('http');
var fs = require('fs')
var querystring = require('querystring');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'test'
});
connection.connect();
http.createServer(function(req,res){
	if(req.url=='/'){
		fs.createReadStream('./index.html').pipe(res);
	}else if(req.url=='/jquery.js'){
		fs.createReadStream('./jquery.js').pipe(res);
	}else if(req.url=='/add'){
		 var formData = '';
		 req.on('data',function(chunk){
		 	formData += chunk;
		 });
		 req.on('end',function(){
		 	//username=xx&password=xx
		 	// console.log(formData);
		 	var formObj = querystring.parse(formData);
		 	var sql = 'insert into user(username,password,email) values(?,?,?)';
		 	connection.query(sql,[formObj.username,formObj.password,formObj.email],function(err,result){
		 		//res.end(JSON.stringify(result));
		 		if(err)
		 			console.log(err);
		 		else{
		 			connection.query('select * from user order by id asc',[],function(err,result){
		 				res.end(JSON.stringify(result));
		 			})
		 		}
		 	})
		 	// res.end(JSON.stringify(formObj));
		 })
	}else if(req.url=='/delete'){
		 var formData = '';
		 req.on('data',function(chunk){
		 	formData += chunk;
		 });
		 req.on('end',function(){
		 	var formObj = querystring.parse(formData);
		 	var sql = 'delete from user where id in ('+formObj.userIds+')';
		 	connection.query(sql,[],function(err,result){
		 		if(err)
		 			console.log(err);
		 		else{
		 			connection.query('select * from user order by id asc',[],function(err,result){
		 				res.end(JSON.stringify(result));
		 			})
		 		}
		 	})
		 	// res.end(JSON.stringify(formObj));
		 })	
	}else{
		res.write('else');
		res.end();		
	}

}).listen(8081);