//用于保存所有连接聊天室的用户信息
var users=[];
//变量结构
//{
//    id:scoket.id， 用户ID对应的用户scoket.id
//    scoket:scoket, 用户连接产生的scoket对象
//    name:""        保存用户名
//}

addUser=function(name,scoket){
    users.push({
        id:scoket.id,
        scoket:scoket,
        name:name
    })
};

findUser=function(name,id){
    return users.filter(function(user){
        return user.name==name||user.id==id;
    })
};

removeUser=function(id){
    users.forEach(function(user,index){
        if(user.id==id)
            users.slice(index,1);
    })
}

getUsers=function(){
    return users.map(function(user){
        return {name:user.name,id:user.id};
    })
}

//所有用户的信息
module.exports.users=users;
//保存用户信息
module.exports.addUser=addUser;
//查找用户
module.exports.findUser=findUser;
//删除用户
module.exports.removeUse=removeUser;
//查询用户信息
module.exports.getUsers=getUsers;