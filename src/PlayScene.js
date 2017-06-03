
var PlayLayer = cc.Layer.extend({
  bgSprite:null,
  scoreLabel:null,
  circleSprites1:null,
  touchx:null,
  touchy:null,
  score:null,
  paitypecn:["一万","二万","三万","四万","五万","六万","七万","八万","九万","一条","二条","三条","四条","五条","六条","七条","八条","九条","一筒","二筒","三筒","四筒","五筒","六筒","七筒","八筒","九筒","东","南","西","北","红","發","白"],
  paitype:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,33],
  player1:[],
  player2:[],
  player3:[],
  player4:[],
  player1list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  player2list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  player3list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  player4list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  player1pai:[],
  player2pai:[],
  player3pai:[],
  player4pai:[],
  isPlay:false,
  allpai:new Array(136),
  painum:0,
  Mahjongtiles_info:{  
    userID:-1,                   //对应用户ID  
    in_Pai:new Array(34),        //手里的牌序列  
    out_Pai:new Array(34),      //外面的牌序列  
    sum_Pai:new Array(34),      //总和的牌序列  
  
  },
  Mahjonggame_info:{  
    player:Array(4),            //四个用户对应的组排  
    hunPai:-1,                  //混牌  
    zhuangjia:0,               //庄家  
    PaiList:new Array(136),    //麻将队列  
  
  },

  ctor:function (stagenum) {
      this._super();
      var _this=this;
      _this.initPai();

      this.score=0;
      var timecount=0.01;//刷新频率

      var size = cc.winSize;
      
      var firstload=true;
      // add bg
      this.bgSprite = new cc.Sprite(res.p_bk);
      this.bgSprite.attr({
          x: size.width / 2,
          y: size.height / 2,
          //scale: 0.5,
          //rotation: 180
      });
      this.bgSprite.setScaleX(size.width/this.bgSprite.getContentSize().width);
      this.bgSprite.setScaleY(size.height/this.bgSprite.getContentSize().height);
      this.addChild(this.bgSprite, 0);

      this.scoreLabel = new cc.LabelTTF("0", "Arial", 70);
      this.scoreLabel.attr({
          x:136,
          y:686,
          
      });

      this.scoreLabel.setFontFillColor(cc.color(226, 39, 107, 255)); 
      this.addChild(this.scoreLabel, 35);


      // this.center = new cc.Sprite(res.p_ui_center);
      // this.center.attr({
      //    x: size.width*0.5,
      //    y: size.height *0.5,
      // });
      // this.addChild(this.center, 5);


      var centerItem = new cc.MenuItemImage(
        res.p_ui_center,
        res.p_ui_center,
        function () {
          //console.log("Menu is clicked!");
          _this.AddPai();
          
        }, this);
      centerItem.attr({
         x: size.width*0.5,
         y: size.height *0.5,
         anchorX: 0.5,
         anchorY: 0.5
      });
      var centermenu = new cc.Menu(centerItem);
      centermenu.x = 0;
      centermenu.y = 0;
      this.addChild(centermenu, 35);

  }, 

  //初始化
  initPai:function(){
    var _this=this;
    window.isPlay=false;
    window.playscene=_this;
    for (var i = 0,j=0,k=0; i <136 ; i++) {
      if (k<4) {
        k++;
        _this.allpai[i]=_this.paitype[j];
      }else{
        k=1;
        j++;
        _this.allpai[i]=_this.paitype[j];
      };
    };
    _this.allpai=_this.Arrayshuffle(_this.allpai);

    //console.log(_this.allpai.join(','));
    _this.initPlayerPai();
  },

  initPlayerPai:function(){
    var _this=this;
    for (var i = 0,j=0; i < 53; i++) { //j 玩家轮流抓牌
      if (j<4) {
        j++;
        _this["player"+j].push(_this.allpai[i]);
        _this["player"+j+"list"][_this.allpai[i]]++;
      
      }else{
        j=1;
        _this["player"+j].push(_this.allpai[i]);
        _this["player"+j+"list"][_this.allpai[i]]++;
      };
      _this.painum++;
    };
    this.initPlayer1();

  //  var test=[0,0,0,0,0,0,0,0,0,3,1,1,1,1,2,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
   // console.log(_this.CanHuPai(test));
  },

  initPlayer1:function(){
    var _this=this;
    var posx=60;
    // 以秒为单位的时间间隔
    var interval = 0.1;
     // 重复次数
    var repeat = 14;
     // 开始延时
    var delay = 0.1;
    var i=0;
    this.schedule(function() {
      // 这里的 this 指向 component
      if (i==14) {
         posx+=20;
      };
     // console.log(posx);
      var x = posx;
      posx+=90;
      _this.showPai(i,x);
      i++;
      if (i==15) {
        _this.sortPai(false,true);
        window.isPlay=true;
      };
    }, interval, repeat, delay);
  },


  sortPai:function(isout,isfirst){
    var _this=this;
    function sortNumber(a,b){
      return a - b;
    }
    _this.player1.sort(sortNumber);
    var delpailength=isout?15:15;
    console.log(_this.player1pai.length);

    for (var i =delpailength - 2; i >= 0; i--) {
      if (typeof  _this.player1pai[i] != "undefined"){
        _this.player1pai[i].removeFromParent();
        _this.player1pai[i] = undefined;
        _this.player1pai.splice(i,1);
      }
     
    };
    var posx=60;
    var pailen=isfirst?14:13;
    for (var i = 0; i < pailen; i++) {
      if (i==13) {
       posx+=20;
      };
      var x = posx;
      posx+=90;
      _this.showPai(i,x);
    };
    console.log("-------");
   
  },

  showPai:function(i,posx){
    var _this=this;
    var posy=70;
    var thing = new PaiSprite(res["p_pai"+_this.player1[i]]);
    thing.attr({
        x: posx,
        y:posy,
        paitype:_this.player1[i],
        callback:_this.outPai,
        num:i
    });
    thing.setAnchorPoint(0.5,0.5);
    thing.setScaleX(85/thing.getContentSize().width);
    thing.setScaleY(120/thing.getContentSize().height);
    _this.addChild(thing,15);
    _this.player1pai.push(thing);
    //console.log(_this.player1pai.length);

  },

  outPai:function(num){
    console.log(window.playscene.player1pai.length);
    window.playscene.player1pai[13].removeFromParent();
    window.playscene.player1pai[13] = undefined;
    window.playscene.player1pai.splice(13,1);
    window.playscene.player1.splice(num,1);
    window.playscene.sortPai(true);
  },

  AddPai:function(){
    var _this=this;
    _this.painum++;
    _this["player1"].push(_this.allpai[_this.painum]);
     _this.showPai(13,1260);
     window.isPlay=true;
    console.log(_this.player1pai.length);
  },


  CanHuPai__7pair:function (arr){
    var pairCount=0;
    /*七对*/  
    for(var k in arr) {
        var c = arr[k];
        if (c == 2) {
            pairCount++;
        }
        else if (c == 4) {
            pairCount += 2;
        }
        else if( c != 0) {  //当c不满足0,2,4情况即有单张出现，直接返回false  
          return false;
        }
    };
    if(pairCount==7){  
      return true;  
    }  
    else{ 
      return false;  
    }  
  },

  /*判断是否可以听*/  
  CanTingPai:function(arr,TingArr){  
    var ret=false;  
    var result=false;  
    for(var i = 0; i < 34; ++i)  
    {  
        // if(arr[i]<4) {             如果该牌玩家已经有4张了 是否还可以听此张 有待商榷  
             arr[i]++;  
             ret = this.CanHuPai(arr);  
             arr[i]--;  
        // }  
             if(ret)  
             {  
                 result=true;  
                 TingArr.push(i);  
             }  
    }  
   return result;  
  },

  CanHuPai:function (arr){  
    var _this=this;
    if(_this.CanHuPai__7pair(arr)){  
        return true;  
    }  
    else if(_this.CanHuPai_norm(arr)){  
        return true;  
    }
    else{  
        return false;  
    }  
  },

  Arrayshuffle:function(arr) {
    var input = arr;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
  },


  /*针对于arr[i]=2情况的剪枝处理*/  
  Cancutpair_2:function(arr,i){  
  
    if(i>26)    //如果为风牌则直接可以剔除对子  
    {  
        return true;                      //true为可以直接剔除，false为还需回溯  
    }  
  
    else if(i==0||i==9||i==18)         //一万 一饼 一条  
    {  
        if(arr[i+1]>=2&&arr[i+2]>=2) //如果对应的二与三都大等于2  
        {  
            return false;  
        }  
        else  
        {  
            return true;  
        }  
    }  
  
    else if(i==8||i==17||i==26)         //九万 九饼 九条  
    {  
        if(arr[i-1]>=2&&arr[i-2]>=2) //如果对应的七与八都大等于2  
        {  
            return false;  
        }  
        else  
        {  
            return true;  
        }  
    }  
  
    else if(i==1||i==10||i==19)         //二万 二饼 二条  
    {  
        if(arr[i-1]+arr[i+1]+arr[i+2]>=4&&arr[i+1]>=2)  //如果一+三+四大于4且三大于2  
        {  
            return false;  
        }  
        else  
        {  
            return true;  
        }  
    }  
    else if(i==7||i==16||i==25)         //八万 八饼 八条  
    {  
        if(arr[i-1]+arr[i+1]+arr[i-2]>=4&&arr[i-1]>=2)  //如果九+七+六大于4且七大于2  
        {  
            return false;  
        }  
        else  
        {  
            return true;  
        }  
    }  
  
    else if(arr[i-1]+arr[i+1]+arr[i-2]+arr[i+2]>=4)   //如果相邻的两端大于四张牌  
    {  
        return false;  
    }  
    else  
    {  
        return true;  
    }  
  },


  /*针对于arr[i]=3情况的剪枝处理，与 Cancutpair_2相反，当相邻牌数小于两张牌，则不可取*/  
  Cancutpair_3:function(arr,i){  
  
    if(i>26)    //如果为风牌则不可以成为对子  
    {  
        return false;  
    }  
  
    else if(i==0||i==9||i==18)         //一万 一饼 一条  
    {  
        if(arr[i+1]>=1&&arr[i+2]>=1) //如果对应的二与三都大等于1  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
  
    else if(i==8||i==17||i==26)         //九万 九饼 九条  
    {  
        if(arr[i-1]>=1&&arr[i-2]>=1) //如果对应的七与八都大等于1  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
  
    else if(i==1||i==10||i==19)         //二万 二饼 二条  
    {  
        if(arr[i-1]+arr[i+2]>=1&&arr[i+1]>=1)  //如果一+四大等于1且三大等于1  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
    else if(i==7||i==16||i==25)         //八万 八饼 八条  
    {  
        if(arr[i+1]+arr[i-2]>=1&&arr[i-1]>=1)  //如果九+六大等于1且七大等于1  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
  
    else if(arr[i-1]+arr[i+1]+arr[i-2]+arr[i+2]>=2)   //如果相邻的两端大于两张牌  
    {  
        return true;  
    }  
    else  
    {  
        return false;  
    }  
  },  

  /*针对于arr[i]=4情况的剪枝处理，与 Cancutpair_3相似，由于多出来两个，故当相邻牌数小于四张牌，则不可取*/  
  Cancutpair_4:function(arr,i){  
  
    if(i>26)    //如果为风牌则不可以成为对子  
    {  
        return false;  
    }  
  
    else if(i==0||i==9||i==18)         //一万 一饼 一条  
    {  
        if(arr[i+1]>=2&&arr[i+2]>=2) //如果对应的二与三都大等于2  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
  
    else if(i==8||i==17||i==26)         //九万 九饼 九条  
    {  
        if(arr[i-1]>=2&&arr[i-2]>=2) //如果对应的七与八都大等于2  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
  
    else if(i==1||i==10||i==19)         //二万 二饼 二条  
    {  
        if(arr[i-1]+arr[i+2]>=2&&arr[i+1]>=2)  //如果一+四大等于2且三大等于2  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
    else if(i==7||i==16||i==25)         //八万 八饼 八条  
    {  
        if(arr[i-2]+arr[i+1]>=2&&arr[i-1]>=2)  //如果六+九大等于2且七大等于2  
        {  
            return true;  
        }  
        else  
        {  
            return false;  
        }  
    }  
  
    else if(arr[i-1]+arr[i+1]+arr[i-2]+arr[i+2]>=4)   //如果相邻的两端大等于4  
    {  
        return true;  
    }  
    else  
    {  
        return false;  
    }  
  },

  CanHuPai_norm:function(arr){  
  
    var count =0;  //记录手牌总数  
    for(var i = 0; i < 34; ++i) {  
        count += arr[i];  
    }  
  
    /*剔除对子*/  
    var ret=false;  
    for(var i = 0; i < 34; ++i)  
    {  
        if(arr[i]==2)  
        {  
            if (this.Cancutpair_2(arr, i))  
            {  
                arr[i] -=2;     //直接剔除  
                ret = this.CanHuPai_3N_recursive(arr,count-2,0);  
                arr[i] +=2;  
                return ret;  
            }  
            else {  
                arr[i] -=2;  
                ret = this.CanHuPai_3N_recursive(arr,count-2,0);  
                arr[i] +=2;  
                if(ret)              //如果满足可以返回，不满足还需要尝试其他的对子  
                {  
                    return ret;  
                }  
            }  
        }  
        else if(arr[i]==3)  
        {  
            if (this.Cancutpair_3(arr, i))  
            {  
                arr[i] -=2;  
                ret = this.CanHuPai_3N_recursive(arr,count-2,0);  
                arr[i] +=2;  
                if(ret)  
                {  
                    return ret;  
                }  
            }  
        }  
        else if(arr[i]==4)  
        {  
            if (this.Cancutpair_4(arr, i))  
            {  
                arr[i] -=2;  
                ret = this.CanHuPai_3N_recursive(arr,count-2,0);  
                arr[i] +=2;  
                if(ret)  
                {  
                    return ret;  
                }  
            }  
        }  
  
    }  
   return ret;  
  },  

  CanHuPai_3N_recursive:function(arr,count,P) {  
  
  //  process.stdout.write(arr +'\n'+count+'\n'+P+'\n');  
  
    var ret=false;  
    if(count==0)  
    {  
        return true;  
    }  
    if(P>26)        // 风牌只能组成碰  
    {  
        if(arr[P]==3)  
        {  
            ret=this.CanHuPai_3N_recursive(arr,count-3,P+1);  
            return  ret;  
        }  
        else if(arr[P]==0)  
        {  
            ret=this.CanHuPai_3N_recursive(arr,count,P+1);  
            return  ret;  
        }  
        else  
        {  
            return false;  
        }  
    }  
        if(arr[P]==0){                                                //如果没有该牌，直接跳过进行下一张  
             ret=this.CanHuPai_3N_recursive(arr,count,P+1);  
        }  
        if(arr[P]==1){  
            if(P%9>6)                                                  //如果该牌是八或者九，则无法组合顺，不能胡  
            {  
                return false;  
            }  
            else if(arr[P+1]>0&&arr[P+2]>0)                         //能组合成顺  
            {  
                arr[P]--;  
                arr[P+1]--;  
                arr[P+2]--;  
                ret=this.CanHuPai_3N_recursive(arr,count-3,P+1);  
                arr[P]++;  
                arr[P+1]++;  
                arr[P+2]++;  
            }  
            else                                                    //无法组合顺，不能胡  
            {  
                return false;  
            }  
        }  
        if(arr[P]==2){                                              //与1同理，组成两对顺  
            if(P%9>6)  
            {  
                return false;  
            }  
            else if(arr[P+1]>1&&arr[P+2]>1)  
            {  
                arr[P]-=2;  
                arr[P+1]-=2;  
                arr[P+2]-=2;  
                ret=this.CanHuPai_3N_recursive(arr,count-6,P+1);  
                arr[P]+=2;  
                arr[P+1]+=2;  
                arr[P+2]+=2;  
            }  
            else  
            {  
                return false;  
            }  
        }  
        if(arr[P]==3){  
  
            ret=this.CanHuPai_3N_recursive(arr,count-3,P+1);             //当前需求 三对顺等同于三对碰  
            /* 
            if(P%9>6) 
            { 
                ret=CanHuPai_3N_recursive(arr,count-3,P+1); 
            } 
            else if(arr[P+1]>2&&arr[P+2]>2) 
            { 
                arr[P]-=3; 
                arr[P+1]-=3; 
                arr[P+2]-=3; 
                ret=CanHuPai_3N_recursive(arr,count-9,P+1); 
                arr[P]+=3; 
                arr[P+1]+=3; 
                arr[P+2]+=3; 
                if(!ret) 
                { 
                    arr[P + 1] += 3; 
                    arr[P + 2] += 3; 
                    ret=CanHuPai_3N_recursive(arr,count-3,P+1); 
                    arr[P + 1] -= 3; 
                    arr[P + 2] -= 3; 
                } 
            } 
            else 
            { 
                ret=CanHuPai_3N_recursive(arr,count-3,P+1); 
            } 
            */  
        }  
        if(arr[P]==4) {                                       //如果为四张，则至少有一张与后面组成为顺，剩下的递归，P不变  
            if(P%9>6)  
            {  
                return false;  
            }  
            else if (arr[P + 1] > 0 && arr[P + 2] > 0) {  
                arr[P]--;  
                arr[P + 1]--;  
                arr[P + 2]--;  
                ret = this.CanHuPai_3N_recursive(arr, count - 3, P );  
                arr[P]++;  
                arr[P + 1]++;  
                arr[P + 2]++;  
            }  
            else  
            {  
                return false;  
            }  
        }  
    //console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'); 
    //console.log(arr +'\n');       
    return ret;  
  },

  //吃牌
  CheckChiPai : function() {

  },
  //吃牌 
  DoChiPai : function() {

  },
  //碰牌
  CheckPengPai : function() {

  },
  //碰牌
  DoPengPai : function() {

  },
  //杠牌 
  CheckGangPai : function() {

  },
  //杠牌 
  DoGangPai : function() {

  },

  //对可吃的组合进行输出
  PrintChiChosePai : function() {

  },



 

  addCircle : function(circleteam,radius,posx,posy,colors) {
  },


  addThing:function(posx,posy,color,cache){
    var _cache=cache?true:false;
    var image=_cache?("tmpsweet"+color+"_png"):("sweet"+color+"_png");
    var thing = new cc.Sprite(res[image]);
    var x = posx;
    var y = posy;
    
    thing.attr({
      x: x,
      y:y,
      _color:color,
      cache:cache
    });
    thing.setAnchorPoint(0.5,0.5);
    thing.setScaleX(this.sweetWidth/thing.getContentSize().width);
    thing.setScaleY(this.sweetWidth/thing.getContentSize().height);
    this.addChild(thing,15);
    this.thingSprites.push(thing);
  },

  update : function() {
    var size = cc.winSize;
    var posx=this.touchx;
    var posy=this.touchy;


    this.checkGame();
  },
 
  checkGame:function(){
  
    
  },
 
  winGame:function(){

    var size = cc.winSize;
    var winbg = new cc.MenuItemImage(
      res.win_bg,
      res.win_bg,
      function () {
        cc.director.runScene( new StageScene());
      }, this);
    winbg.attr({
       x:size.width*0.5,
       y:size.height*0.5
    });
    var winMenu = new cc.Menu(winbg);
    winMenu.x = 0;
    winMenu.y = 0;
    this.addChild(winMenu, 150);

  },
});

   

var PlayScene = cc.Scene.extend(
{
   ctor:function (data) 
    {
      this._super();
      this.init(data);
    },

    init:function (data) 
    {
      var layer = new PlayLayer(data);
        this.addChild(layer);
    }

});

