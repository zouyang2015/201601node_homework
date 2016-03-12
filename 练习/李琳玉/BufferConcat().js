/*list 是一个数组，里边为要合并的buffer
 * length 合并后buffer的长度
 * 1.如果buffer为new Buffer("珠")
 * 2.buffer为new Buffer（1）*/

function myConcat(list,length){
    if(!Array.isArray(list)){  //判断参数list是否为数组
        return 'list argument must be an Array of Buffers'
    }
    if(length==0){  //如果length为0，则表示最后合并后buffer的长度为0；
        return new Buffer(0)
    }
    var str='';
    list.forEach(function(item){  //循环每一个要合并的buffer，
        if(Buffer.isBuffer(item)){   //判断要合并的部分是否为buffer类型，如果是，则将每一项内容进行合并
            str+=item;
        }else{
            return 'list argument must be an Array of Buffers'
        }
    })
    var bufferOne=new Buffer(str);  //将合并的内容变为buffer类型

    var oneLength=  Buffer.byteLength(bufferOne); //得出合并内容后的buffer的长度
    if(length<=oneLength){ //合并后的内容长度大于我们要得到的长度，将内容进行截取
        bufferOne=bufferOne.slice(0,length)
        return bufferOne;
    }else if(length>oneLength){// 合并后的内容长度小于我们要得到的长度
        var curBuffer=new Buffer(length);
        bufferOne.copy(curBuffer,0,0,oneLength)
        return curBuffer
    }
}
var bf1=new Buffer('李');
var bf2=new Buffer('琳');
var bf3=new Buffer('玉');
var cur=myConcat([bf1,bf2,bf3],9)
console.log(cur.toString('utf8'))