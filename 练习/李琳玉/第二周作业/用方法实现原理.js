function event(){
    this._event={};
}

event.prototype.on=function(type,listen){
    if(this._event.type){
        this._event.type.push(listen)
    }else{
        this._event.type=[listen]
    }
}
event.prototype.emit=function(type){
    if(this._event.type){
        for(var i=0;i<this._event.type.length;){
            if(this._event.type[i]==g){
                this._event.type[i].apply(this);
                i--;
            }else{
                this._event.type[i].apply(this);
                i++;
            }
        }

    }
}
event.prototype.remove=function(type,listen){
    if(this._event.type){
        this._event.type.forEach(function(item,num){
            if(item==listen){
                this._event.type.splice(num,1)
            }
        })
    }
};
event.prototype.once=function(type,listen){
  function g(){
      listen.apply(this);
      this.remove(type,listen)
  }
    if(this._event.type){
        this._event.type.push(g)
    }else{
        this._event.type=[g]
    }

}
