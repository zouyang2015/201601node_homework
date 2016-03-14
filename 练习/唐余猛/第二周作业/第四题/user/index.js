var express = require('express');
var app = express();

app.set('view engine','ejs');
app.set('views',__dirname + '/views');

app.get('/',function(req,res){
    res.render('index.ejs',{content:'首页'});
});

app.get('/reg',function(req,res){
    res.render('reg.ejs',{content:'注册'});
});

app.post('/reg',function(req,res){
    res.render('reg.ejs',{content:'注册'});
});

app.listen(8080);