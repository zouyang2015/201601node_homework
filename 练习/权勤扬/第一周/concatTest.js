/**
 * Created by quan on 16/3/9.
 */
//这是一个Buffer concat的功能实现

function concat(list){
    if (!(list instanceof Array)) {
        alert("请输入正确的数组");
        return;
    }
    var buffer = new Buffer(length);
    var totalLength = 0;
    list.forEach(function(obj){
        obj.copy(buffer,totalLength);
        console.log("test===="+obj.toString());
        totalLength += obj.length;
    });
    return buffer;
}

//方法调用
 const buf1 = new Buffer("我爱");
 const buf2 = new Buffer("nodejs");
 const resultBuffer = concat([buf1,buf2]);
 console.log(resultBuffer.toString());