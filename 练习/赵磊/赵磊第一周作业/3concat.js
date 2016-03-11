
function concat(size,length){

    var buf = new Buffer(length),num=0;
    for(var i= 0,r=size.length;i<r;i++){
        var m = size[i].length;
        if(num+m<=length){
            size[i].copy(buf,num,0,m);
            num+=m;
        }
    }
    return buf;
}

exports.concat = concat;

var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1,buf2],6);
console.log(result.toString());