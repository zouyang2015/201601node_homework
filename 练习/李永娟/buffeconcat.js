/**
 * Created by Administrator on 2016/3/9.
 */

    function concat(size,length){
    var buf =new Buffer(length);
    var arr = [];
    for(var i=0;i<size.length;i++){
            size[i].copy(buf,arr);
        arr +=size[i].length;
    }
    return buf;
}
var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1, buf2], 6);
console.log(result.toString());