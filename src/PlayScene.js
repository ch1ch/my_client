var SocketIO = SocketIO || io;
var PlayLayer = cc.Layer.extend({
  _statusLabel:null,
  _broadcastLabel:null,
  _sioClient:null,
  bgSprite:null,
  scoreLabel:null,
  circleSprites1:null,
  touchx:null,
  touchy:null,
  score:null,
  choose:null,
  paitypecn:["一万","二万","三万","四万","五万","六万","七万","八万","九万","一条","二条","三条","四条","五条","六条","七条","八条","九条","一筒","二筒","三筒","四筒","五筒","六筒","七筒","八筒","九筒","东","南","西","北","红","發","白"],
  paitype:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,33],
  player1:[],
  player1list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  player1pai:[],
  player2pai:[],
  player3pai:[],
  player4pai:[],
  player1outpai:[],
  player2outpai:[],
  player3outpai:[],
  player4outpai:[],
  isPlay:false,
  allpai:new Array(136),
  painum:0,
  roomid:0,
  playerid:0,
  ctor:function (stagenum) {
      this._super();
      var _this=this;
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

      // this.scoreLabel = new cc.LabelTTF("0", "Arial", 70);
      // this.scoreLabel.attr({
      //     x:136,
      //     y:686,
      // });
      // this.scoreLabel.setFontFillColor(cc.color(226, 39, 107, 255)); 
      // this.addChild(this.scoreLabel, 35);
     
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

      var backItem = new cc.MenuItemImage(
        res.p_ui_back,
        res.p_ui_back,
        function () {
          console.log("back is clicked!");
          
        }, this);
      backItem.attr({
         x: size.width*0.93,
         y: size.height *0.93,
         anchorX: 0.5,
         anchorY: 0.5
      });
      var backmenu = new cc.Menu(backItem);
      backmenu.x = 0;
      backmenu.y = 0;
      this.addChild(backmenu, 35);


      var infoItem = new cc.MenuItemImage(
        res.p_ui_info,
        res.p_ui_info,
        function () {
          console.log("back is clicked!");
          
        }, this);
      infoItem.attr({
         x: 0,
         y: size.height ,
         anchorX: 0,
         anchorY: 1
      });
      var infomenu = new cc.Menu(infoItem);
      infomenu.x = 0;
      infomenu.y = 0;
      this.addChild(infomenu, 35);


     //玩家信息
      _this.initPlayerinfo();
      // _this.initPai();
      _this.initLayer();
  },

    onExit: function() {
        if(this._sioEndpoint) this._sioEndpoint.disconnect();
        if(this._sioClient) this._sioClient.disconnect();

        this._super();
    },
   initLayer:function() {
      var size = cc.winSize;

        var menuRequest = new cc.Menu();
        menuRequest.setPosition(cc.p(0, 0));
        this.addChild(menuRequest,50);
        var winSize = cc.director.getWinSize();
        MARGIN = 46;
        var SPACE = 46;
        var vspace = 80;

          // Test to create basic client in the default namespace
        var labelSIOClient = new cc.LabelTTF("Open SocketIO Client", "Arial", 38);
        labelSIOClient.setAnchorPoint(cc.p(0,0));
        var itemSIOClient = new cc.MenuItemLabel(labelSIOClient, this.onMenuSIOClientClicked, this);
        itemSIOClient.setPosition(cc.p(labelSIOClient.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - SPACE));
        menuRequest.addChild(itemSIOClient,50);

        // Test sending message to default namespace
        var labelTestMessage = new cc.LabelTTF("Send Test Message", "Arial", 38);
        labelTestMessage.setAnchorPoint(cc.p(0,0));
        var itemTestMessage = new cc.MenuItemLabel(labelTestMessage, this.onMenuTestMessageClicked, this);
        itemTestMessage.setPosition(cc.p(labelTestMessage.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - 2 * SPACE));
        menuRequest.addChild(itemTestMessage);

        // Test sending event 'echotest' to default namespace
        var labelTestEvent = new cc.LabelTTF("test ajax", "Arial", 38);
        labelTestEvent.setAnchorPoint(cc.p(0,0));
        var itemTestEvent = new cc.MenuItemLabel(labelTestEvent, this.testAjaxClicked, this);
        itemTestEvent.setPosition(cc.p(labelTestEvent.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - 3 * SPACE));
        menuRequest.addChild(itemTestEvent);


        var labelSIOEndpoint = new cc.LabelTTF("creat game", "Arial", 38);
        labelSIOEndpoint.setAnchorPoint(cc.p(0,0));
        var itemSIOEndpoint = new cc.MenuItemLabel(labelSIOEndpoint, this.gamestartClicked, this);
        itemSIOEndpoint.setPosition(cc.p(labelSIOEndpoint.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - 4 * SPACE));
        menuRequest.addChild(itemSIOEndpoint);     


        var label5 = new cc.LabelTTF("out 1", "Arial", 38);
        label5.setAnchorPoint(cc.p(0,0));
        var label5l = new cc.MenuItemLabel(label5, this._outPai, this);
        label5l.setPosition(cc.p(label5.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - 5 * SPACE));
        menuRequest.addChild(label5l);       


        this.sockt_server="ws://127.0.0.1:3010/12345";
        this.roomID=35503;
        this.openid=4567897789;
    },

    testevent: function(data) {
        var msg = this.tag + " says 'testevent' with data: " + data;
        console.log(msg);
    },

    message: function(data) {
        var msg = this.tag + " received message: " + data;
        console.log(msg);
    },

    disconnection: function() {
        var msg = this.tag + " disconnected!";
        console.log(msg);
    },
    onMenuSIOClientClicked: function(sender) {
      var _this=this;
      var sioclient = SocketIO.connect("ws://127.0.0.1:3010", {"force new connection" : true});
      var roomID=355033;
      var playerID='778899';
      this.roomid=roomID;
      this.playerid=playerID;
        sioclient.on("connect", function() {
            // var msg = " Connected!";
            // var roominfo={type:'room',roomid:'12345'};
            // sioclient.send(roominfo);
            console.log('Connected!');
            sioclient.emit('join', playerID,roomID);
        });
      this._sioClient = sioclient;
      this.socketinit();
    },

    creatRoomSocket: function(userid,roomid) {
      console.log(roomid,userid);
      var _this=this;
      var sioclient = SocketIO.connect("ws://127.0.0.1:3010", {"force new connection" : true});      
      sioclient.on("connect", function() {
            // var msg = " Connected!";
            // var roominfo={type:'room',roomid:'12345'};
            // sioclient.send(roominfo);
            console.log('Connected!');
            sioclient.emit('join', userid,roomid);
        });
      this._sioClient = sioclient;
      this.socketinit();
    },


    socketinit:function(){
      var _this=this;
      var sioclient= _this._sioClient ;
      sioclient.on("message", this.message);


      sioclient.on("disconnect", this.disconnection);

      sioclient.on('sys', function (sysMsg, users) {
        console.log('sys',sysMsg,users);
      });  

      sioclient.on('msg', function (userName, msg) {
        console.log('msg',userName,msg);
      });

      sioclient.on('roominfo', function (userName, msg) {
        console.log('roominfo',userName,msg);
        //code 2 人齐了可以开始
        if (msg.code==2) {
          sioclient.emit('gameinfo',msg.roomid,{code:1});
        };            
      });

      sioclient.on('gameinfo', function (userName, msg) {
        console.log('gameinfo',userName,msg);
        if (msg.code==3) {
          for (var i = 0; i < msg.pais.length; i++) {
            _this.player1list[msg.pais[i]]++;
          }
          _this.player1=msg.pais;
          console.log(_this.player1list);
          _this.initPlayer();
        }       
      });

      
    },

    onMenuTestMessageClicked: function(sender) {

        if(this._sioClient != null) {
          this._sioClient.send("Hello Socket.IO!");
        }
    },    

    gamestartClicked: function(sender) {
      var _this=this;
       // Utils.get("http://localhost:3010/api/getuser.api",{id:12345},function(res){
      //   console.log(res);
      // });
      var time=Date.now();
        var gametype=1;
        var rule='123';
        var openid='121177';
        this.playerid=openid;
        Utils.post("http://localhost:3010/api/addroom.api",{time:time,hoster:openid,gametype:gametype,rule:rule},function(res){
          console.log(res);
          if (res.code==1) {
            _this.roomid=res.data.roomid;
            _this.creatRoomSocket(openid,res.data.roomid);
          }

        });      
       
    },

    _outPai: function(sender) {

       
    },    

  initPlayerinfo:function(){
    var _this=this;
    var header1="res/play/ui/header.png";
    var name1="张三";
    var header2="res/play/ui/header.png";
    var name2="张si";
    var header3="res/play/ui/header.png";
    var name3="张wu";
    var header4="res/play/ui/header.png";
    var name4="张liu";
    var size = cc.winSize;
    //player1
    var player1head = new cc.Sprite(header1);
    player1head.attr({
       x: 140,
       y: 190,
    });
    player1head.setScaleX(90/player1head.getContentSize().width);
    player1head.setScaleY(90/player1head.getContentSize().height);
    this.addChild(player1head, 5);


    this.player1nameLabel = new cc.LabelTTF(name1, "Arial", 24);
    this.player1nameLabel.attr({
        x:90,
        y:190,
        anchorX: 1,
        anchorY: 0.5
    });
    this.player1nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player1nameLabel, 35);

    //player2
    var player2head = new cc.Sprite(header2);
    player2head.attr({
       x: 60,
       y: 480,
       anchorX: 0,
    });
    player2head.setScaleX(90/player2head.getContentSize().width);
    player2head.setScaleY(90/player2head.getContentSize().height);
    this.addChild(player2head, 5);

    this.player2nameLabel = new cc.LabelTTF(name2, "Arial", 24);
    this.player2nameLabel.attr({
        x:60,
        y:410,
        anchorX: 0,
        anchorY: 0.5
    });
    this.player2nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player2nameLabel, 35);

    //player3
    var player3head = new cc.Sprite(header3);
    player3head.attr({
      x: size.width*0.26,
      y: size.height *0.9,
       anchorX: 0,
    });
    player3head.setScaleX(90/player3head.getContentSize().width);
    player3head.setScaleY(90/player3head.getContentSize().height);
    this.addChild(player3head, 5);

    this.player3nameLabel = new cc.LabelTTF(name3, "Arial", 24);
    this.player3nameLabel.attr({
      x: size.width*0.26,
      y: size.height *0.81,
      anchorX: 0,
      anchorY: 0.5
    });
    this.player3nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player3nameLabel, 35);

    //player4
    var player4head = new cc.Sprite(header4);
    player4head.attr({
      x: size.width*0.9,
      y: size.height *0.65,
       anchorX: 0,
    });
    player4head.setScaleX(90/player4head.getContentSize().width);
    player4head.setScaleY(90/player4head.getContentSize().height);
    this.addChild(player4head, 5);

    this.player4nameLabel = new cc.LabelTTF(name4, "Arial", 24);
    this.player4nameLabel.attr({
      x: size.width*0.9,
      y: size.height *0.56,
      anchorX: 0,
      anchorY: 0.5
    });
    this.player4nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player4nameLabel, 35);
  },


  initPlayer:function(){
    var _this=this;
    window.isPlay=false;
    window.playscene=_this;
    var _this=this;
    var p1_posx=60;
    var p2_posy=660;
    var p3_posx=420;
    var p4_posy=690;
    // 以秒为单位的时间间隔
    var interval = 0.1;
     // 重复次数
    var repeat = 14;
     // 开始延时
    var delay = 0.1;
    var i=0;
    var ishost=_this.player1list.length==14?true:false;
    console.log(ishost);
    this.schedule(function() {
      // 这里的 this 指向 component
      if (i==14) {
        p1_posx+=20;
      }else if (i!=13){
        p2_posy-=37;
        _this.initPlayer2(p2_posy);
        p3_posx+=41;
        _this.initPlayer3(p3_posx);
        p4_posy-=37;
        _this.initPlayer4(p4_posy);

      };
      var p1_x = p1_posx;
      p1_posx+=90;
      _this.showPai(i,p1_x);
      i++;
      if (i==15) {
        _this.sortPai(false,ishost);
        window.isPlay=true;
      };
    }, interval, repeat, delay);
  },

  initPlayer2:function(posy){
    var _this=this;
    var posx=230;
    // var posy=660;
    // for (var i = 0; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_rightpai);
     
      thing.attr({
        x: posx,
        y:posy,
        anchorX: 0,
        anchorY: 0.5,
        rotation: 180
      });
      thing.setScaleX(24/thing.getContentSize().width);
      thing.setScaleY(36/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player2pai.push(thing);
    // };
  },

  initPlayer3:function(posx){
    var _this=this;
    // var posx=420;
    var posy=670;
    // for (var i = 0; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_backpai);
      
      thing.attr({
        x: posx,
        y:posy,
        anchorX: 0,
        anchorY: 0.5,
      });
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player3pai.push(thing);
    // };
  },

  initPlayer4:function(posy){
    var _this=this;
    var posx=1090;
    // var posy=690;
    // for (var i = 0; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_rightpai);
      // posy-=37;
      thing.attr({
        x: posx,
        y:posy,
        anchorX: 0,
        anchorY: 0.5
      });
      thing.setScaleX(24/thing.getContentSize().width);
      thing.setScaleY(36/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player4pai.push(thing);
    // };
  
  },

  showChoose:function(){
    this.choose = new cc.Sprite(res.p_ui_choose);
    var size = cc.winSize;
    this.choose.attr({
       x: size.width*0.5,
       y: size.height *0.3,
    });
    this.addChild(this.choose, 15);
  },

  checkChoose:function(paitype){
    var _this=this;
     var size = cc.winSize;
    var ishu=_this.CanHuPai(_this.player1list);
    console.log(_this.player1list);
    var isgang=_this.player1list[paitype]>3?true:false;
    var ispeng=_this.player1list[paitype]>2?true:false;
    console.log(paitype,_this.player1list[paitype],ishu,isgang,ispeng);
     ishu=true;
     isgang=true;
     ispeng=true;
    if (ishu || isgang || ispeng) {
    }else{
      return false;
    };
    
    if (ishu) {
       var hu = new cc.MenuItemImage(
        res.p_ui_chooseview_hu,
        res.p_ui_chooseview_hu,
        function () {
          _this.doHu(paitype);
        }, this);
      hu.attr({
        x: size.width*0.95,
        y: size.height *0.0,
        anchorX: 0.5,
         anchorY: 1.4
      });
      var _hu = new cc.Menu(hu);
      _hu.x = size.width*0.1;
      _hu.y = 0;
      _hu.setScaleX(146/hu.getContentSize().width);
      _hu.setScaleY(90/hu.getContentSize().height);
      this.addChild(_hu, 35,'gang');

      // var hu = new cc.Sprite(res.p_ui_chooseview_hu);
      // hu.attr({
      //    x: size.width*0.75,
      //    y: size.height *0.23,
      // });
      // hu.setScaleX(146/hu.getContentSize().width);
      // hu.setScaleY(90/hu.getContentSize().height);
      // this.addChild(hu, 25,'hu');
    }

    if (isgang) {
      // var gang = new cc.Sprite(res.p_ui_chooseview_gang);
      // gang.attr({
      //    x: size.width*0.66,
      //    y: size.height *0.22,
      // });
      // gang.setScaleX(136/gang.getContentSize().width);
      // gang.setScaleY(120/gang.getContentSize().height);
      // this.addChild(gang, 25,'gang');

      var gang = new cc.MenuItemImage(
        res.p_ui_chooseview_gang,
        res.p_ui_chooseview_gang,
        function () {
          _this.doGang(paitype);
        }, this);
      gang.attr({
        x: size.width*0.84,
        y: size.height *0.07,
        anchorX: 0.5,
         anchorY: 1
      });
      var _gang = new cc.Menu(gang);
      _gang.x = 0;
      _gang.y = 0;
      _gang.setScaleX(136/gang.getContentSize().width);
      _gang.setScaleY(120/gang.getContentSize().height);
      this.addChild(_gang, 35,'gang');
    }

    if (ispeng) {
      var peng = new cc.MenuItemImage(
        res.p_ui_chooseview_peng,
        res.p_ui_chooseview_peng,
        function () {
          _this.doPeng(paitype);
        }, this);
      peng.attr({
        x: size.width*0.64,
        y: size.height *0.07,
        anchorX: 0.5,
         anchorY: 1
      });
      var _peng = new cc.Menu(peng);
      _peng.x = 0;
      _peng.y = 0;
      _peng.setScaleX(136/peng.getContentSize().width);
      _peng.setScaleY(120/peng.getContentSize().height);
      this.addChild(_peng, 35,'gang');

      //   var peng =  new cc.Sprite(res.p_ui_chooseview_peng);
      //   peng.setAnchorPoint(cc.p(0,0));
      //   var _peng = new cc.MenuItemLabel(peng, this.doPeng(paitype), this);
      //   _peng.setPosition( size.width*0.57,size.height *0.23);
      //   _peng.setScaleX(136/_peng.getContentSize().width);
      // _peng.setScaleY(120/_peng.getContentSize().height);
      //  this.addChild(_peng,25,'gang');
    }

    return true;
     
  },

  doPeng:function(paitype){
    console.log('peng',paitype);
  },
  doGang:function(paitype){
    console.log('gang',paitype);
  },
  doHu:function(paitype){
    console.log('hu',paitype);
  },
  sortPai:function(isout,isfirst){
    var _this=this;
    function sortNumber(a,b){
      return a - b;
    }
    _this.player1.sort(sortNumber);
    
    //console.log(_this.player1pai.length);

    for (var i =13; i >= 0; i--) {
      if (typeof  _this.player1pai[i] != "undefined"){
        _this.player1pai[i].removeFromParent();
        _this.player1pai[i] = undefined;
        _this.player1pai.splice(i,1);
      }
     
    };
    console.log(_this.player1pai);
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
    //console.log("-------");
   
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

  outPai:function(num,paitype){
    // console.log(window.playscene.player1pai.length);
    console.log(window.playscene.player1pai);
    window.playscene.player1pai[13].removeFromParent();
    window.playscene.player1pai[13] = undefined;
    window.playscene.player1pai.splice(13,1);
    window.playscene.player1.splice(num,1);
    window.playscene.show_P1outPai(paitype);
    window.playscene.player1list[paitype]--;
    window.playscene.sortPai(true);
  },

  AddPai:function(){
    var _this=this;
    _this.painum++;
    _this["player1"].push(_this.allpai[_this.painum]);
     _this.showPai(13,1260);
     window.isPlay=true;
    _this.player1list[this.allpai[_this.painum]]++;
    console.log(_this.player1list);
    _this.checkChoose(_this.allpai[_this.painum]);
  },

  show_P1outPai:function(paitype){
    console.log(paitype);
    var _this=this;
    var outlength=_this.player1outpai.length;
    var posy=250;
    var posx=420+outlength*46;
    var thing = new cc.Sprite(res["p_pai"+paitype]);
    thing.attr({
        x: posx,
        y:posy
    });
    thing.setAnchorPoint(0.5,0.5);
    thing.setScaleX(45/thing.getContentSize().width);
    thing.setScaleY(64/thing.getContentSize().height);
    _this.addChild(thing,5);
    _this.player1outpai.push(thing);
    _this._sioClient.emit('gameinfo',_this.roomid,{code:4,playerid:this.playerid,paitype:paitype});
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

