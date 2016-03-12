/**
 * Created by lijl on 2016/3/12.
 */
function myConcat(bufArray, length){

    //异常处理
    if (arguments.length === 0) {
        throw new error("需要buffer 数组");
    }

    if (!Array.isArray(arguments[0])) {
        throw new error("参数1必须是buffer数组");
    }

    bufArray.forEach(function(bufObj){
        if(!Buffer.isBuffer(bufObj))
        throw new error('必须是buffer');
    });

    //程序主逻辑
    if(length === undefined){
        length = 0;
        bufArray.forEach(function(bufObj){
            length +=bufObj.length;
        });
    }

    var buffer = new Buffer(length);
    var curIndex = 0;
    bufArray.forEach(function(bufObj){
        bufObj.copy(buffer,curIndex);
        curIndex += bufObj.length;
    });
    return buffer;
}
