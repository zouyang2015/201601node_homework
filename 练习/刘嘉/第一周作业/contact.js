var buf1=new Buffer("珠");
var buf2=new Buffer("峰");

function concat(size,length){
    var newBuffer=new Buffer(length);
    var newStart=0;
    for(var i=0,l=size.length;i<l;i++){
        size[i].copy(newBuffer,newStart,0,size[i].length);
        newStart=size[i].length;
    }
    return newBuffer;
}

var result=concat([buf1,buf2],6);

console.log(result.toString());