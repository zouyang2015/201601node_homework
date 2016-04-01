/**
 * Created by Administrator on 2016/3/30.
 */
angular.module('chat',[]);
angular.module('chat').controller('chatController',function($scope){
    //显示输入用户名窗口
    $scope.showReg='block';
    //默认输入的用户名为Leo
    $scope.username="Leo";
    //用户的输入框值
    $scope.word="";
    //聊天框内容
    $scope.contents=[];
    //在线的聊天人数
    $scope.users=[];

    var socket = io.connect('/');
    socket.on('connect',function(err){
        if(err) console.log('连接服务器失败');
        else console.log('连接成功');
    })

    //用户集体发言
    $scope.sendWord=function(){
        socket.send({
            type:'word',
            message:$scope.word
        })
    }

    //用户注册用户名
    $scope.setName=function(){
        socket.send({
            type:'setName',
            Name:$scope.username
        });
        //隐藏显示用户名窗口
        $scope.showReg='none';
    }

    //服务器响应
    socket.on('message',function(res){
        switch (res.type){
            case 'setName':
                if(res.success==false)
                //设置失败的时候清空用户名
                console.log(res.users);
                $scope.$apply(function(){
                    $scope.users=res.users;
                });
                break;
            case 'word':
                $scope.$apply(function(){
                    $scope.contents.push(res);
                });
                break;
            default:
                alert(res.word);
                break;
        }
    })
})