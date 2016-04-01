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
    $scope.word='';
    $scope.message={
        word:'',
        id:'',
        name:'',
        type:''
    };
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
        if($scope.word.indexOf('@')==0 && $scope.word.indexOf(':')>0){
            //对单个用户发言
            if($scope.word.indexOf(':')==$scope.word.length-1){
                alert('请输入内容');
                return;
            }else {
                var word=$scope.word.split('@'+$scope.message.name+':')[1];
                if(word)
                    $scope.message.word=word;
                socket.send($scope.message);
                $scope.word='';
            }

        }else{
            if($scope.word.length==0){
                alert('请输入内容');
                return;
            }else{
                socket.send({
                    word:$scope.word,
                    id:'',
                    name:'',
                    type:'word'
                });
                $scope.word='';
            }
        }
    }

    //向单个用户发言
    $scope.sendOne=function(user){
        $scope.word='';
        $scope.word="@"+user.name+":";

        $scope.message={
            word:$scope.word,
            id:user.id,
            name:user.name,
            type:'one'
        }
    }

    //用户注册用户名
    $scope.setName=function(){
        socket.send({
            word:'',
            id:'',
            name:$scope.username,
            type:'setName'
        });
        //隐藏显示用户名窗口
        $scope.showReg='none';
    }

    //服务器响应
    socket.on('message',function(res){
        switch (res.type){
            case 'setName':
                //设置失败的时候清空用户名
                $scope.$apply(function(){
                    $scope.users=res.users;
                    console.log($scope.users);
                });
                break;
            case 'word':
                $scope.$apply(function(){
                    $scope.contents.push(res);
                    console.log(res);
                });
                break;
            default:
                alert(res.word);
                break;
        }
    })
})