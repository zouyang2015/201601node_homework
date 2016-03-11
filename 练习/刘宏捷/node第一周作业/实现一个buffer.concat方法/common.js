/**
 * Created by DELL on 2016/3/9.
 */
var buf11 = new Buffer('刘');
var buf22 = new Buffer('宏');
var buf33 = new Buffer('捷');


function concat(bufs, length) {
    var buffer = new Buffer(length);
    // 记录copy时的起点坐标
    var index = 0;
    // 遍历所有要
    for (var i = 0, len = bufs.length; i < len; i++) {
        // 把传入的buf数据copy到buffer
        bufs[i].copy(buffer, index, 0, bufs[i].length);
        // 重新计算下次copy的起点坐标
        index += bufs[i].length;
    }
    return buffer;
}

var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1,buf2],6);
console.log(result.toString());//控制台应该输出 珠峰

console.log((concat([buf11, buf22, buf33], 9)).toString());


