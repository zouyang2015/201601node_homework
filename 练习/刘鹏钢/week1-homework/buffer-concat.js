var util = require('util');
var bconcat = function (bufferArr, length) {
    var allBuffer=new Buffer(length);
    var preBufferLength=0;
    for (var i=0;i<bufferArr.length;i++){
        var thisbuf = bufferArr[i];
        thisbuf.copy(allBuffer,preBufferLength,0,thisbuf.length);
        preBufferLength += thisbuf.length;
    }
    return allBuffer;
}
var bf1 = new Buffer('珠峰');
var bf2 = new Buffer('培训');
console.log(bconcat([bf1,bf2],12).toString());