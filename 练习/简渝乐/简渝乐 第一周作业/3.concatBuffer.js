/**
 * Created by Jian on 2016-03-10.
 */
function concat (size,length){//size为Buffer组成的数组，length为要返回的Buffer的长度
    var str='';
    if(arguments.length>=1 &&  Array.isArray(arguments[0]) && size.length>0) {
        for(var i=0;i<size.length;i++){
            if(Buffer.isBuffer(size[i])){
                str+=size[i].toString();
            }else{
                throw err("Array is not all the Buffer");
            }
        }
        str=str.slice(0,length/3);//默认都是传的中文，此暂不做中文格式判定。
        var buf=new Buffer(str,'utf-8');
        return buf;
    }else{
        throw err("Parameter is not valid.");
    }
}

var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1,buf2],6);
console.log(result.toString());//控制台应该输出 "珠峰"