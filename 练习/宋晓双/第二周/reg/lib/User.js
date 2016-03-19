

var redis=require("redis");
//var bcrypt=require("bcrypt");
var db=redis.createClient();
module.exports=User;
function User(obj){
   for(var key in obj){
       this[key]=obj[key];
   }
}

//保存用户
User.prototype.sava=function(fn){
    if(this.id){
     this.update(fn);
    }else{
        var user=this;
        db.incr("user:ids",function(err){
            if(err){
                return fn(err)
            }
            user.id=id;
           // user.hashPassword(function(err){
              //  if(err) return fn(err);
                 user.update(fn);
            //})
        })
    }
};

//修改
User.prototype.update=function(fn){
    var user=this;
    var id=user.id;
    //根据用户名查询ID
    db.set("user:ids"+user.name,id,function(err){
        if(err){
            return fn(err)
        }
        //把修改之后的值存入数据库
        db.hmset("user"+id,user,function(err){
         fn(err);
        });
    });
};

//给密码加密
User.prototype.hashPassword=function(fn){
    var user=this;
    bcrypt.genSalt(12,function(err,salt){
        if(err) return fn(err);
        user.salt=salt;
        bcrypt.hash(user.pass,salt,function(err,hash){
            if(err) return fn(err);
            user.pass=hash;
            fn();
        });
    });
};

var user={
    name:"candy",
    pass:123456,
    age:2
};
user.sava(function(err){
    if(err) throw err;
    console.log('user id %d',user.id);
});