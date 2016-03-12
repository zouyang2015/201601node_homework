function myConcat(list,length){
    if(!length){
        length=0;
        for(var t=0;t<list.length;t++){
            for(var a=0;a<list[t].length;a++){
                length++;
            }
        }
    }
    if(list.length==1){
        return list[0];
    }else{
        var buffer=new Buffer(length);
        var total=-1;
        for(var i= 0,len=list.length;i<len;i++){
            var cur=list[i];
            for(var j= 0,lenInner=cur.length;j<lenInner;j++){
                total++;
                buffer[total]=cur[j];
            }
        }
        return buffer;
    }
}
