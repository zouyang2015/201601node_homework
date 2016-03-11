/**
 * Created by Tanxu on 16/3/7.
 */
var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var buf3 = new Buffer("培");
var buf4 = new Buffer("训");
var result1 = concat([buf1,buf2],6);
var result2 = concat([buf1,buf2],3);
var result3 = concat([buf1,buf2,buf3],9);
var result4 = concat([buf1,buf2,buf3,buf4],12);
console.log(result1);//控制台应该输出 珠峰
console.log(result2);//控制台应该输出 珠峰
console.log(result3);//控制台应该输出 珠峰
console.log(result4);//控制台应该输出 珠峰

function concat(size,length){
    var str = '';
    size.forEach(function(ele){
        str+=ele;
    });
    var buf = new Buffer(str);
    return buf.toString('utf8',0,length);
}