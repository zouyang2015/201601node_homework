/**
 * Created by Administrator on 2016/3/9.
 */
var buf=new Buffer('我');
var buf1=new Buffer('喜');
var buf2=new Buffer('欢');
var Buff=Buffer.concat([buf,buf1,buf2],9);
console.log(Buff.toString());