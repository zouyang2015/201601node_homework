
function concat(size,length){
    var buffer = new Buffer(length);
    var index = 0;
    for(i=0; i<size.length; i++)
    {
        var temp = size[i];
        temp.copy(buffer, index);
        index = index + temp.length;
    }
    return buffer;
}
console.log(concat([new Buffer("您"),new Buffer("好"),new Buffer("吗")],6).toString());

