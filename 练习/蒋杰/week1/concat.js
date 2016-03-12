/**
* 1. list 一个由Buffer组成的数组
* 2. 最后返回的Buffer的长度
*/
// function concat(size,length){}

function concat(size,length){
  var str = "";
  size.forEach(function(el){
    str += el;
  })

  return new buffer(str, length);
}
