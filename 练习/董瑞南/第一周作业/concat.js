/**
 * 1. list 一个由Buffer组成的数组
 * 2. 最后返回的Buffer的长度
 */
function concat(List,length){
    if (!Array.isArray(List)) {
        throw 'list argument must be an Array of Buffers';
    }
    if (!Number(length) && length !== undefined) {
        return new Buffer(0);
    }
    var str = '';
    List.forEach(function (bufferObj) {
        if (Buffer.isBuffer(bufferObj)) {
            str += bufferObj;
        } else {
            throw 'list argument must be an Array of Buffers';
        }
    });
    var buffer = new Buffer(str);
    if (length >= 0 || length == undefined) {
        buffer = buffer.slice(0, length);
        if (buffer.length < length) {
            var buf = buffer;
            buffer = new Buffer(length);
            buf.copy(buffer, 0, 0, buf.length)
        }
    } else {
        throw 'Invalid typed array length';
    }
    return buffer;
}

var buf1 = new Buffer("珠峰");
var buf2 = new Buffer("培训");
var result = concat([buf1,buf2],12);
console.log(result.toString());