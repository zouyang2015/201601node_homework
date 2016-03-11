var list = [] ;
for(var i=0;i<10;i++){
    list.push(new Buffer("我")) ;
}
var all = "";
for(a in list){
   all += Buffer.concat([list[a].toString()]);

}
console.log(all.length);
