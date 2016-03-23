
function eventEmiter(){
    this._event={};
}

eventEmiter.prototype.once=function(type,listener){
    if(type!=null&&type!=undefined){
        if(isFunction(listener)){
            if(!this._event[type]){
                this._event[type]=[listener];
                // console.log(this._event);
            }
        }else{
            console.log("不是一个函数");
        }
    }else{
        console.log("事件为空");
    }
};