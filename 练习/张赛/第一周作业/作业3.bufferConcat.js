var buf1 = new Buffer("NAME");
var buf2 = new Buffer("zs");
Buffer.concat = function(bufferAry, length) {
    var totalBuffer = new Buffer(length);
    var preBufferLength = 0;
    for (var i = 0; i < bufferAry.length; i++) {
        var buffer = bufferAry[i];
        buffer.copy(totalBuffer, preBufferLength, 0, buffer.length);
        preBufferLength += buffer.length;
    }
    return totalBuffer;
}

var result = Buffer.concat([buf1, buf2], 6);
console.log(result.toString('utf8'));
