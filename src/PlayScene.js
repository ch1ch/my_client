var SocketIO = SocketIO || io;
var PlayLayer = cc.Layer.extend({
  _statusLabel:null,
  _broadcastLabel:null,
  _sioClient:null,
  bgSprite:null,
  timeLabel:null,
  furtruepaiLabel:null,
  circleSprites1:null,
  touchx:null,
  touchy:null,
  score:null,
  winboard:null,
  winpailist:[],
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
  player1peng:0,
  player2peng:0,
  player3peng:0,
  player4peng:0,
  player1pengpai:[],
  player2pengpai:[],
  player3pengpai:[],
  player4pengpai:[],
  player1penglist:[],
  player1gang:0,
  player2gang:0,
  player3gang:0,
  player4gang:0,
  player1gangpai:[],
  player2gangpai:[],
  player3gangpai:[],
  player4gangpai:[],
  player1ganglist:[],
  showscore:false,
  isPlay:false,
  isGangHua:false,
  allpai:new Array(136),
  painum:0,
  roomid:0,
  playerid:0,
  seat:null,
  turncountdown:200,
  waitcountdown:3,
  sockt_server:"ws://127.0.0.1:3010",
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

      this.timeLabel = new cc.LabelTTF("0", "Arial", 60);
      this.timeLabel.attr({
         x: size.width*0.65,
         y: size.height *0.5,
      });
      this.timeLabel.setFontFillColor(cc.color(226, 39, 107, 255)); 
      this.addChild(this.timeLabel, 3500);
      this.timeLabel.setString('');

      this.furtruepaiLabel = new cc.LabelTTF("0", "Arial", 26);
      this.furtruepaiLabel.attr({
         x: size.width*0.5,
         y: size.height *0.4,
      });
      this.furtruepaiLabel.setFontFillColor(cc.color(239, 252, 97, 255)); 
      this.addChild(this.furtruepaiLabel, 45);
      this.furtruepaiLabel.setString('');
     
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

      if (stagenum==1) {
        this.gamestartClicked()
      }else  if (stagenum==2) {
        this.onMenuSIOClientClicked();
      }
     //玩家信息
      //_this.initLayer();
     // _this.showhuscore();
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
      var labelSIOClient = new cc.LabelTTF("join game", "Arial", 38);
      labelSIOClient.setAnchorPoint(cc.p(0,0));
      var itemSIOClient = new cc.MenuItemLabel(labelSIOClient, this.onMenuSIOClientClicked, this);
      itemSIOClient.setPosition(cc.p(labelSIOClient.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - SPACE));
      menuRequest.addChild(itemSIOClient,50);

      // Test sending message to default namespace
      var labelTestMessage = new cc.LabelTTF("clean user", "Arial", 38);
      labelTestMessage.setAnchorPoint(cc.p(0,0));
      var itemTestMessage = new cc.MenuItemLabel(labelTestMessage, this.onMenuTestMessageClicked, this);
      itemTestMessage.setPosition(cc.p(labelTestMessage.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - 2 * SPACE));
      menuRequest.addChild(itemTestMessage);

      // Test sending event 'echotest' to default namespace
      var labelTestEvent = new cc.LabelTTF("new game", "Arial", 38);
      labelTestEvent.setAnchorPoint(cc.p(0,0));
      var itemTestEvent = new cc.MenuItemLabel(labelTestEvent, this.newGame, this);
      itemTestEvent.setPosition(cc.p(labelTestEvent.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - 3 * SPACE));
      menuRequest.addChild(itemTestEvent);


      var labelSIOEndpoint = new cc.LabelTTF("creat game", "Arial", 45);
      labelSIOEndpoint.setAnchorPoint(cc.p(0,0));
      var itemSIOEndpoint = new cc.MenuItemLabel(labelSIOEndpoint, this.gamestartClicked, this);
      itemSIOEndpoint.setPosition(cc.p(labelSIOEndpoint.getContentSize().width / 2 + MARGIN, winSize.height - MARGIN - 4 * SPACE));
      menuRequest.addChild(itemSIOEndpoint);          
     
  },
 
  socketinit:function(){
    var _this=this;
    var sioclient= _this._sioClient ;
    var size = cc.winSize;

    sioclient.on("message", this.message);

    sioclient.on("disconnect", this.disconnection);

    sioclient.on('sys', function (sysMsg, users) {
      console.log('sys',sysMsg,users);
    });  

    sioclient.on('msg', function (userName, msg) {
      console.log('msg',userName,msg);
    });

    sioclient.on('roominfo', function (userName, msg) {
      //console.log('roominfo',userName,msg);
      //code 2 人齐了可以开始
      if (msg.code==1){
       
        if (_this.seat!==null) {
          var showseat=(Number(msg.roomseat) +(4-_this.seat))%4;
          console.log(_this.seat,showseat,msg.roomseat,msg.playerinfo[msg.roomseat].playname);
          switch(showseat)
            {
            case 0:
              _this.initPlayer1info(msg.playerinfo[msg.roomseat].imghead,msg.playerinfo[msg.roomseat].playername);
              break;
            case 1:
              _this.initPlayer2info(msg.playerinfo[msg.roomseat].imghead,msg.playerinfo[msg.roomseat].playername);
              break;
            case 2:
              _this.initPlayer3info(msg.playerinfo[msg.roomseat].imghead,msg.playerinfo[msg.roomseat].playername);
              break;
            case 3:
              _this.initPlayer4info(msg.playerinfo[msg.roomseat].imghead,msg.playerinfo[msg.roomseat].playername);
              break;
            }
        }else{
          _this.seat=msg.roomseat;
          if (msg.roomseat!=0) {
            for (var i = 0; i < msg.playerinfo.length; i++) {
              var showseat=(msg.playerinfo[i].seat+(4-_this.seat))%4;
              switch(showseat)
                {
                case 0:
                  _this.initPlayer1info(msg.playerinfo[i].imghead,msg.playerinfo[i].playername);
                  break;
                case 1:
                  _this.initPlayer2info(msg.playerinfo[i].imghead,msg.playerinfo[i].playername);
                  break;
                case 2:
                  _this.initPlayer3info(msg.playerinfo[i].imghead,msg.playerinfo[i].playername);
                  break;
                case 3:
                  _this.initPlayer4info(msg.playerinfo[i].imghead,msg.playerinfo[i].playername);
                  break;
                }
              }
          }
        }

      }
      else if (msg.code==2) {
        console.log("game start");
        _this.playerinfo=msg.playerinfo;

        sioclient.emit('gameinfo',msg.roomid,{code:1,player:_this.playerid});
      };            
    });

    sioclient.on('gameinfo', function (userName, msg) {
      console.log('gameinfo',userName,msg);
      if (msg.code==3) {//code 3游戏开始
        if (_this.player1.length>0) {
          return false;
        }
        for (var i = 0; i < msg.pais.length; i++) {
          _this.player1list[msg.pais[i]]++;
        }
        if (msg.turnseat== _this.seat) {window.isPlay==true;};
        //console.log(msg.scorelist);
        _this.player1=msg.pais;
        _this.seat=msg.seat;
        console.log(_this.player1list);

        _this.furtruepaiLabel.setString('剩余83张');
        _this.scorelist=msg.scorelist;
        if (!_this.showscore) {
          _this.showplayerscore(msg.scorelist);
        };

        _this.initPlayer(msg.turnseat);
      }else if (msg.code==5){ //code 5 出牌
        var theseat=msg.seat;
        var paitype=msg.outpaitype;
        window.isGangHua=false;
        if (theseat!=_this.seat) {
          var showseat=(theseat+(4-_this.seat))%4;
          // console.log(showseat);
          switch(showseat)
          {
          case 1:
            _this.show_P2outPai(paitype);
            break;
          case 2:
            _this.show_P3outPai(paitype);
            break;
          case 3:
            _this.show_P4outPai(paitype);
            break;
          }
          _this.checkChoose(paitype,false,theseat)
        }else{
          // _this.checkChoose(paitype,true)
        }

        var nextseat=msg.nextseat;
        _this.showCountDown(_this.waitcountdown,function(){

            _this.hideChoose();
          if (nextseat==_this.seat) {
             sioclient.emit('gameinfo',msg.roomid,{code:6,seat:_this.seat,playerid:_this.playerid});
            // _this.AddPai(msg.);
          }
        })
      }else if (msg.code==7){ //抓牌
        window.isGangHua=false;
        _this.AddPai(msg.nextpai);
        window.isPlay=true;
      }else if (msg.code==9){ //别人碰牌
        var paitype=msg.paitype;
        var showseat=(msg.seat+(4-_this.seat))%4;
        var fromseat=(msg.fromseat+(4-_this.seat))%4;

        switch(showseat)
          {
          case 1:
            _this.showP2Peng(paitype,fromseat);
            break;
          case 2:
            _this.showP3Peng(paitype,fromseat);
            break;
          case 3:
            _this.showP4Peng(paitype,fromseat);
            break;
        }
      }else if (msg.code==11){ //别人gang牌
        var paitype=msg.paitype;
        var showseat=(msg.seat+(4-_this.seat))%4;
        var fromseat=(msg.fromseat+(4-_this.seat))%4;

        switch(showseat)
          {
          case 1:
            _this.showP2Gang(paitype,fromseat);
            break;
          case 2:
            _this.showP3Gang(paitype,fromseat);
            break;
          case 3:
            _this.showP4Gang(paitype,fromseat);
            break;
        }
      }else if (msg.code==111){ //gangshanghua
         _this.AddPai(msg.nextpai,msg.fromseat);
         window.isPlay=true;
         window.isGangHua=true;
      }else if (msg.code==13){ //有人虎牌

        _this.hideChoose();
        var hubig = new cc.MenuItemImage(
          res.p_ui_chooseview_hu_b,
          res.p_ui_chooseview_hu_b,
          function () {
            //cc.director.runScene( new StageScene());
          }, _this);
        hubig.attr({
           x:size.width*0.5,
           y:size.height*0.5
        });
        var hubig_menu = new cc.Menu(hubig);
        hubig_menu.x = 0;
        hubig_menu.y = 0;
        _this.addChild(hubig_menu, 150,'hubig_menu');


        _this.showCountDown(2,function(){
          var winMenu = _this.getChildByName("winMenu");
          _this.removeChild(winMenu); 
          _this.showhuscore(msg);
        })
      }else if (msg.code==15){//剩余牌倒计时
        _this.furtruepaiLabel.setString('剩余'+msg.furturepai+'张');

      }
    });
  },

  showCountDown:function(count,backcall){
    // 以秒为单位的时间间隔
    var interval = 1;
    // 重复次数
    var repeat = count;
    // 开始延时
    var delay = 0.1;
    var i=count;
    this.schedule(function() {
      this.timeLabel.setString(i);
     
      if (i<=0) {
        this.timeLabel.setString('');
        backcall();
      }
      i--;
    }, interval, repeat, delay);
   
  },


  onMenuTestMessageClicked: function(sender) {
    var _this=this;
    _this._sioClient.emit('gameinfo',_this.roomid,{code:14});
  },    

  gamestartClicked: function(sender) {
    var _this=this;
     // Utils.get("http://localhost:3010/api/getuser.api",{id:12345},function(res){
    //   console.log(res);
    // });
      var time=Date.now();

      var imghead="res/play/ui/header.png";
      var playername="张三";
      var gametype=1;
      var rule='123';
      var playernum=4;
      var openid='121177';
      this.playerid=openid;
      Utils.post("http://localhost:3010/api/addroom.api",{time:time,hoster:openid,gametype:gametype,rule:rule},function(res){
        console.log(res);
        if (res.code==1) {
          _this.roomid=res.data.roomid;
          _this.creatRoomSocket(openid,res.data.roomid,gametype,rule,playernum,imghead,playername);
        }
      });      
  },

  creatRoomSocket: function(userid,roomid,gametype,rule,playernum,imghead,playername) {
    //console.log(roomid,userid);
    var _this=this;
    var sioclient = SocketIO.connect(_this.sockt_server, {"force new connection" : true});     
    this.initPlayer1info(imghead,playername); 
    sioclient.on("connect", function() {
          console.log('Connected!');
          sioclient.emit('roominfo',_this.roomid,{code:2,gametype:gametype,rule:rule,playernum:playernum,userid:userid,imghead:imghead});
          sioclient.emit('join',roomid,{playerid:userid,imghead:imghead,playername:playername});
      });
    this._sioClient = sioclient;
    this.socketinit();
  },

  onMenuSIOClientClicked: function(sender) {
    var _this=this;
    var sioclient = SocketIO.connect(_this.sockt_server, {"force new connection" : true});
    var roomID=355033;
    var playerID='778899';
    var imghead="res/play/ui/header.png";
    var playername="张si";
    this.roomid=roomID;
    this.playerid=playerID;
    this.initPlayer1info(imghead,playername);
    sioclient.on("connect", function() {
      console.log('Connected!');
      sioclient.emit('join', roomID,{playerid:playerID,imghead:imghead,playername:playername});
    });
    this._sioClient = sioclient;
    this.socketinit();
  },

  initPlayer1info:function(imghead,name){
    var _this=this;
    var size = cc.winSize;
    var player1head = new cc.Sprite(imghead);
    player1head.attr({
       x: 140,
       y: 190,
    });
    player1head.setScaleX(90/player1head.getContentSize().width);
    player1head.setScaleY(90/player1head.getContentSize().height);
    this.addChild(player1head, 5);


    this.player1nameLabel = new cc.LabelTTF(name, "Arial", 24);
    this.player1nameLabel.attr({
        x:90,
        y:190,
        anchorX: 1,
        anchorY: 0.5
    });
    this.player1nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player1nameLabel, 35);

  },

  initPlayer2info:function(imghead,name){
    var _this=this;
    var size = cc.winSize;

    //player2
    var player2head = new cc.Sprite(imghead);
    player2head.attr({
       x: 60,
       y: 480,
       anchorX: 0,
    });
    player2head.setScaleX(90/player2head.getContentSize().width);
    player2head.setScaleY(90/player2head.getContentSize().height);
    this.addChild(player2head, 5);

    this.player2nameLabel = new cc.LabelTTF(name, "Arial", 24);
    this.player2nameLabel.attr({
        x:60,
        y:410,
        anchorX: 0,
        anchorY: 0.5
    });
    this.player2nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player2nameLabel, 35);

  },

  initPlayer3info:function(imghead,name){
    var _this=this;
    var size = cc.winSize;

    //player3
    var player3head = new cc.Sprite(imghead);
    player3head.attr({
      x: size.width*0.26,
      y: size.height *0.9,
       anchorX: 0,
    });
    player3head.setScaleX(90/player3head.getContentSize().width);
    player3head.setScaleY(90/player3head.getContentSize().height);
    this.addChild(player3head, 5);

    this.player3nameLabel = new cc.LabelTTF(name, "Arial", 24);
    this.player3nameLabel.attr({
      x: size.width*0.26,
      y: size.height *0.81,
      anchorX: 0,
      anchorY: 0.5
    });
    this.player3nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player3nameLabel, 35);
  },

  initPlayer4info:function(imghead,name){
    var _this=this;
    var size = cc.winSize;

    //player4
    var player4head = new cc.Sprite(imghead);
    player4head.attr({
      x: size.width*0.9,
      y: size.height *0.65,
       anchorX: 0,
    });
    player4head.setScaleX(90/player4head.getContentSize().width);
    player4head.setScaleY(90/player4head.getContentSize().height);
    this.addChild(player4head, 5);

    this.player4nameLabel = new cc.LabelTTF(name, "Arial", 24);
    this.player4nameLabel.attr({
      x: size.width*0.9,
      y: size.height *0.56,
      anchorX: 0,
      anchorY: 0.5
    });
    this.player4nameLabel.setFontFillColor(cc.color(255,255,255, 255)); 
    this.addChild(this.player4nameLabel, 35);
  },


  showplayerscore:function(scorelist){
    var size = cc.winSize;
    var _this=this;
    if (this.showscore) {
      _this.player1scoreLabel.setString(scorelist[0]);
      _this.player2scoreLabel.setString(scorelist[1]);
      _this.player3scoreLabel.setString(scorelist[2]);
      _this.player4scoreLabel.setString(scorelist[3]);
    }else{


      this.player1scoreLabel = new cc.LabelTTF(scorelist[0], "Arial", 24);
      this.player1scoreLabel.attr({
          x:70,
          y:160,
          anchorX: 0.5,
          anchorY: 0.5
      });
      this.player1scoreLabel.setFontFillColor(cc.color(255,255,255, 255)); 
      this.addChild(this.player1scoreLabel, 35);


      this.player2scoreLabel = new cc.LabelTTF(scorelist[1], "Arial", 24);
      this.player2scoreLabel.attr({
          x:80,
          y:380,
          anchorX: 0.5,
          anchorY: 0.5
      });
      this.player2scoreLabel.setFontFillColor(cc.color(255,255,255, 255)); 
      this.addChild(this.player2scoreLabel, 35);




      this.player3scoreLabel = new cc.LabelTTF(scorelist[2], "Arial", 24);
      this.player3scoreLabel.attr({
        x: size.width*0.29,
        y: size.height *0.77,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.player3scoreLabel.setFontFillColor(cc.color(255,255,255, 255)); 
      this.addChild(this.player3scoreLabel, 35);




      this.player4scoreLabel = new cc.LabelTTF(scorelist[3], "Arial", 24);
      this.player4scoreLabel.attr({
        x: size.width*0.92,
        y: size.height *0.52,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.player4scoreLabel.setFontFillColor(cc.color(255,255,255, 255)); 
      this.addChild(this.player4scoreLabel, 35);

       this.showscore=true;
    }
  },

  initPlayer:function(turnseat){
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
    var repeat = _this.player1.length-1;
     // 开始延时
     //console.log('rep ',repeat);
    var delay = 0.1;
    var i=0;
    //console.log(_this.player1.length);
    var ishost=_this.player1.length==14?true:false;
    //console.log('ishost ',ishost);

    this.schedule(function() {
      // 这里的 this 指向 component
      if (i==repeat-1) {
        p1_posx+=20;
      }else if (i!=repeat-1){
        
      };

      p2_posy-=37;
      _this.initPlayer2(p2_posy);
      p3_posx+=41;
      _this.initPlayer3(p3_posx);
      p4_posy-=37;
      _this.initPlayer4(p4_posy);

      var p1_x = p1_posx;
      p1_posx+=90;
      _this.showPai(i,p1_x);
      i++;
      if (i==repeat) {
        _this.sortPai(false,ishost);
        if (_this.seat==turnseat) {
          window.isPlay=true;
          _this.checkChoose(0,true,_this.seat)
         // console.log('pai length ',window.playscene.player1pai.length);
          _this.showCountDown(_this.turncountdown,function(){
            if (_this["player1"].length>=14) {
              _this.outPai(13,_this.player1[13]);
            }
          })
        }else{

        //  console.log('pai length ',window.playscene.player1pai.length);
        }
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

  checkChoose:function(paitype,self,outseat){
    var _this=this;
     var size = cc.winSize;
    var ishu=_this.CanHuPai(_this.player1list,paitype,self);
    //返回0 没胡牌，七小对1，普通2

    var index = _this.player1penglist.indexOf(paitype);

    var isgang=false;
    
    if (self&&_this.player1list[paitype]==4 && (index == -1 )) {
      isgang=true;
    }else if( (!self)&&_this.player1list[paitype]>=3 && (index == -1 )){
      isgang=true;
    };
    
    var ispeng=false;
    if (!self) {
      ispeng=((index == -1 ) && (_this.player1list[paitype]>=2))?true:false;
    }
    console.log(paitype,_this.player1list[paitype],ishu,isgang,ispeng,outseat);
     // ishu=true;
     // isgang=true;
     // ispeng=true;
    if (ishu || isgang || ispeng) {
    }else{
      return false;
    };
    
    if (ishu) {
       var hu = new cc.MenuItemImage(
        res.p_ui_chooseview_hu,
        res.p_ui_chooseview_hu,
        function () {
          _this.doHu(paitype,outseat,ishu);
        }, _this);
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
      _this.addChild(_hu, 35,'hu');
   
    }

    if (isgang) {
      var gang = new cc.MenuItemImage(
        res.p_ui_chooseview_gang,
        res.p_ui_chooseview_gang,
        function () {
          _this.doGang(paitype,outseat);
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
          _this.doPeng(paitype,outseat);
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
      this.addChild(_peng, 35,'peng');
    }

    var guo = new cc.MenuItemImage(
      res.p_ui_chooseview_guo_s,
      res.p_ui_chooseview_guo_s,
      function () {
        _this.doguo();
      }, this);
    guo.attr({
      x: size.width*0.8,
      y: size.height *0.2,
      anchorX: 0.5,
       anchorY: 0.5
    });
    var _guo = new cc.Menu(guo);
    _guo.x = 0;
    _guo.y = 0;
    _guo.setScaleX(80/guo.getContentSize().width);
    _guo.setScaleY(70/guo.getContentSize().height);
    this.addChild(_guo, 35,'guo');

    return true;
     
  },
  hideChoose:function(){
    this.unscheduleAllCallbacks();
    var gang = this.getChildByName("gang");
    this.removeChild(gang); 
    var peng = this.getChildByName("peng");
    this.removeChild(peng); 
    var guo = this.getChildByName("guo");
    this.removeChild(guo); 
    var hu =  this.getChildByName("hu");
    this.removeChild(hu);
  },

  doPeng:function(paitype,outseat){
    var _this=this;
    console.log('peng',paitype);
    this.hideChoose();
    // this.getChildByTag('peng').setVisible(false);
    _this._sioClient.emit('gameinfo',_this.roomid,{code:8,paitype:paitype,seat:_this.seat,fromseat:outseat});

    _this.showP1Peng(paitype,outseat);
  },

  doguo:function(){
    this.hideChoose();
  },

  showP1Peng:function(paitype,outseat){
    var _this=this;
    var showseat=(outseat+(4-_this.seat))%4;
    if (typeof  this.player1pai[13] != "undefined"){
      this.player1pai[13].removeFromParent();
      this.player1pai[13] = undefined;
      this.player1pai.splice(13,1);
      this.player1.splice(13,1);
      this.player1list[paitype]--;
    }

    var newplayer1=[];
    //console.log('player1.length',this.player1.length);
    for (var i = 0; i < this.player1.length; i++) {
      if (this.player1[i]==paitype) {
       // console.log('is ',i);
        this.player1pai[i].removeFromParent();
        this.player1pai[i] = null;
        this.player1list[paitype]--;

      }else{
        newplayer1.push(this.player1[i]);
      }
    }
    console.log('player1.length',newplayer1.length);

    for (var i = _this.player1pai.length-1; i >=0; i--) {
      if (_this.player1pai[i] ==null) {
        _this.player1pai.splice(i,1);
      }
    }
    _this.player1=newplayer1;
    var posx=60+_this.player1peng*270+_this.player1gang*270;
    _this.player1peng++;
    _this.player1penglist.push(paitype);
    this.sortPai(true);
    //player1peng
    //player1pengpai
    var posy=70;
    
    for (var i = 1; i < 4; i++) {
      if (outseat==i) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else{
        var thing = new PaiSprite(res.p_ui_backpai);
        
      }
      thing.attr({
        x: posx,
        y:posy,
      });
      posx+=86;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(85/thing.getContentSize().width);
      thing.setScaleY(120/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player1pengpai.push(thing);
    }
    window.isPlay=true;
    console.log(_this["player1"]);
    _this.showCountDown(_this.turncountdown,function(){
        _this.outPai(_this["player1"]-1,paitype);
    })

  },

  showP2Peng:function(paitype,fromseat){
    var _this=this;

    for (var i = _this.player2pai.length-1; i >=0; i--) {
      _this.player2pai[i].removeFromParent();
      _this.player2pai[i] = null;
      _this.player2pai.splice(i,1);
    }
    var p2_posy=640-(_this.player2peng*128+_this.player2gang*168);
    
    _this.player2peng++;
    var posx=230;
    for (var i = 1; i < 4; i++) {
      if (i==1&&fromseat==2) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==2&&fromseat==3) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==3&&fromseat==0) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }
      else{
        var thing = new PaiSprite(res.p_ui_backpai);
      }
      thing.attr({
          x: posx,
          y:p2_posy,
          anchorX: 0,
          anchorY: 0.5,
          rotation: 90
      });
      p2_posy-=42;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player2pengpai.push(thing);
    }
     p2_posy-=4;
    for (var i = _this.player2pengpai.length; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_rightpai);
      thing.attr({
        x: posx,
        y:p2_posy,
        anchorX: 0,
        anchorY: 0.5,
        rotation: 180
      });
       p2_posy-=37;
      thing.setScaleX(24/thing.getContentSize().width);
      thing.setScaleY(36/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player2pai.push(thing);
    }
  },

  showP3Peng:function(paitype,fromseat){
    var _this=this;
    for (var i = _this.player3pai.length-1; i >=0; i--) {
      _this.player3pai[i].removeFromParent();
      _this.player3pai[i] = null;
      _this.player3pai.splice(i,1);
    }
    var p3_posx=480+(_this.player3peng*128+_this.player3gang*168);
    
    _this.player3peng++;
     var posy=670;
    for (var i = 1; i < 4; i++) {
      if (i==1&&fromseat==1) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==2&&fromseat==0) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==3&&fromseat==3) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }
      else{
        var thing = new PaiSprite(res.p_ui_backpai);
      }
      thing.attr({
          x: p3_posx,
          y: posy,
          anchorX: 0,
          anchorY: 0.5,
      });
      p3_posx+=41;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player3pengpai.push(thing);
    }
    p3_posx-=4;
    for (var i = _this.player3pengpai.length; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_backpai);
      thing.attr({
        x: p3_posx,
        y: posy,
        anchorX: 0,
        anchorY: 0.5,
      });
       p3_posx+=41;
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player3pai.push(thing);
    }
  },

  showP4Peng:function(paitype,fromseat){
    var _this=this;
    for (var i = _this.player4pai.length-1; i >=0; i--) {
      _this.player4pai[i].removeFromParent();
      _this.player4pai[i] = null;
      _this.player4pai.splice(i,1);
    }
    var p4_posy=670-(_this.player4peng*128+_this.player4gang*168);
    
    _this.player4peng++;
    var posx=1090;
    for (var i = 1; i < 4; i++) {
      if (i==1&&fromseat==2) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==2&&fromseat==1) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==3&&fromseat==0) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }
      else{
        var thing = new PaiSprite(res.p_ui_backpai);
      }
      thing.attr({
          x: posx,
          y:p4_posy,
          anchorX: 0,
          anchorY: 0.5,
          rotation: 90
      });
      p4_posy-=42;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player4pengpai.push(thing);
    }
     p4_posy-=4;
    for (var i = _this.player4pengpai.length; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_rightpai);
      thing.attr({
        x: posx,
        y:p4_posy,
        anchorX: 0,
        anchorY: 0.5,
        rotation: 180
      });
       p4_posy-=37;
      thing.setScaleX(24/thing.getContentSize().width);
      thing.setScaleY(36/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player4pai.push(thing);
    }
  },

  doGang:function(paitype,outseat){
    console.log('gang',paitype,outseat);
    var _this=this;
    this.hideChoose();
    // this.getChildByTag('peng').setVisible(false);
    _this._sioClient.emit('gameinfo',_this.roomid,{code:10,paitype:paitype,seat:_this.seat,fromseat:outseat,playerid:this.playerid});

    _this.showP1Gang(paitype);
  },

  showP1Gang:function(paitype){
    var _this=this;
    // var showseat=(outseat+(4-_this.seat))%4;
    if (typeof  this.player1pai[13] != "undefined"){
      this.player1pai[13].removeFromParent();
      this.player1pai[13] = undefined;
      this.player1pai.splice(13,1);
      this.player1.splice(13,1);
      this.player1list[paitype]--;
    }

    var newplayer1=[];
    //console.log('player1.length',this.player1.length);
    for (var i = 0; i < this.player1.length; i++) {
      if (this.player1[i]==paitype) {
        //console.log('is ',i);
        this.player1pai[i].removeFromParent();
        this.player1pai[i] = null;
        this.player1list[paitype]--;

      }else{
        newplayer1.push(this.player1[i]);
      }
    }
    //console.log('player1.length',newplayer1.length);

    for (var i = _this.player1pai.length-1; i >=0; i--) {
      if (_this.player1pai[i] ==null) {
        _this.player1pai.splice(i,1);
      }
    }
    _this.player1=newplayer1;
    var posx=60+_this.player1gang*270;
    _this.player1gang++;
    _this.player1penglist.push(paitype);
    this.sortPai(true);
    var posy=70;
    
    for (var i = 1; i < 5; i++) {
      if (i==4) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
        posx-=172;
        posy-=14;
      }else{
        var thing = new PaiSprite(res.p_ui_backpai);
      }

      thing.attr({
        x: posx,
        y:posy,
      });
      posx+=86;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(85/thing.getContentSize().width);
      thing.setScaleY(120/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player1gangpai.push(thing);
    }
    window.isPlay=true;
    //console.log(_this["player1"]);
    _this.showCountDown(_this.turncountdown,function(){
        _this.outPai(_this["player1"]-1,paitype);
    })

  },

  showP2Gang:function(paitype,fromseat){
    var _this=this;

    for (var i = _this.player2pai.length-1; i >=0; i--) {
      _this.player2pai[i].removeFromParent();
      _this.player2pai[i] = null;
      _this.player2pai.splice(i,1);
    }
    var p2_posy=640-(_this.player2gang*168);
    
    _this.player2gang++;
    var posx=230;
    for (var i = 1; i < 5; i++) {
      if (i==1) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==2&&fromseat==3) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==3&&fromseat==0) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }
      else{
        var thing = new PaiSprite(res.p_ui_backpai);
      }
      thing.attr({
          x: posx,
          y:p2_posy,
          anchorX: 0,
          anchorY: 0.5,
          rotation: 90
      });
      p2_posy-=42;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player2gangpai.push(thing);
    }
     p2_posy-=4;
    for (var i = _this.player2gangpai.length; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_rightpai);
      thing.attr({
        x: posx,
        y:p2_posy,
        anchorX: 0,
        anchorY: 0.5,
        rotation: 180
      });
       p2_posy-=37;
      thing.setScaleX(24/thing.getContentSize().width);
      thing.setScaleY(36/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player2pai.push(thing);
    }
  },

  showP3Gang:function(paitype,fromseat){
    var _this=this;
    for (var i = _this.player3pai.length-1; i >=0; i--) {
      _this.player3pai[i].removeFromParent();
      _this.player3pai[i] = null;
      _this.player3pai.splice(i,1);
    }
    var p3_posx=480+(_this.player3gang*168);
    
    _this.player3gang++;
     var posy=670;
    for (var i = 1; i < 5; i++) {
      if (i==1) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==2&&fromseat==0) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==3&&fromseat==3) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }
      else{
        var thing = new PaiSprite(res.p_ui_backpai);
      }
      thing.attr({
          x: p3_posx,
          y: posy,
          anchorX: 0,
          anchorY: 0.5,
      });
      p3_posx+=41;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player3gangpai.push(thing);
    }
    p3_posx-=4;
    for (var i = _this.player3gangpai.length; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_backpai);
      thing.attr({
        x: p3_posx,
        y: posy,
        anchorX: 0,
        anchorY: 0.5,
      });
       p3_posx+=41;
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player3pai.push(thing);
    }
  },

  showP4Gang:function(paitype,fromseat){
    var _this=this;
    for (var i = _this.player4pai.length-1; i >=0; i--) {
      _this.player4pai[i].removeFromParent();
      _this.player4pai[i] = null;
      _this.player4pai.splice(i,1);
    }
    var p4_posy=670-(_this.player4gang*168);
    
    _this.player4gang++;
    var posx=1090;
    for (var i = 1; i < 4; i++) {
      if (i==1) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==2&&fromseat==1) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }else if (i==3&&fromseat==0) {
        var thing = new PaiSprite(res["p_pai"+paitype]);
      }
      else{
        var thing = new PaiSprite(res.p_ui_backpai);
      }
      thing.attr({
          x: posx,
          y:p4_posy,
          anchorX: 0,
          anchorY: 0.5,
          rotation: 90
      });
      p4_posy-=42;
      thing.setAnchorPoint(0.5,0.5);
      thing.setScaleX(40/thing.getContentSize().width);
      thing.setScaleY(54/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player4gangpai.push(thing);
    }
     p4_posy-=4;
    for (var i = _this.player4gangpai.length; i < 13; i++) {
      var thing = new cc.Sprite(res.p_ui_rightpai);
      thing.attr({
        x: posx,
        y:p4_posy,
        anchorX: 0,
        anchorY: 0.5,
        rotation: 180
      });
       p4_posy-=37;
      thing.setScaleX(24/thing.getContentSize().width);
      thing.setScaleY(36/thing.getContentSize().height);
      _this.addChild(thing,15);
      _this.player4pai.push(thing);
    }
  },

  doHu:function(paitype,outseat,hutype){
    var _this=this;
    console.log('hu',paitype,outseat,hutype);
    //console.log(_this.playerinfo);
    _this._sioClient.emit('gameinfo',_this.roomid,{code:12,paitype:paitype,seat:_this.seat,playerid:this.playerid,outseat:outseat,hutype:hutype});
    this.hideChoose();
    
  },

  showhuscore:function(data){
    var size = cc.winSize;
    var _this=this;
    console.log(data);
    var winner=data.seat;
    var loser=data.fromseat;
    //var data={fromseat:2,seat:1,turn:3,gamenum:1,nowpai:[[1,1,1,2,3,4,5,6,7,8,9,9,9],[1,1,1,2,3,4,5,6,7,8,9,9,9],[1,1,1,2,3,4,5,6,7,8,9,9,9],[1,1,1,2,3,4,5,6,7,8,9,9,9]],paitype:12};

    this.winboard = new cc.Sprite(res.p_win_scorebg);
    this.winboard.attr({
      x: size.width*0.5,
      y: size.height *0.5,
        anchorX: 0.5,
        anchorY: 0.5
    });
    this.addChild(this.winboard, 150);

    var scoreTitle = new cc.Sprite(res.p_win_title);
    scoreTitle.attr({
      x: size.width*0.5,
      y: size.height *0.82,
      anchorX: 0.5,
      anchorY: 0.5
    });
    _this.winboard.addChild(scoreTitle,5);
    //console.log(data);


    var gamenumLabel = new cc.LabelTTF('第'+data.gamenum+'轮', "Arial", 26);
    gamenumLabel.attr({
           x: size.width*0.8,
           y: size.height *(0.75),
      });
    gamenumLabel.setFontFillColor(cc.color(255, 255, 255, 255)); 
    _this.winboard.addChild(gamenumLabel, 55);

    var thelist=[0,1,2,3];
    switch(data.seat){
      case 1:
        thelist=[1,0,2,3];
        break;
      case 2:
        thelist=[2,0,1,3];
        break;
      case 3:
        thelist=[3,0,1,2];
        break;
    }
    // if (data.seat!=0) {
    //   thelist[0]=data.seat;

    //   thelist[data.seat]=0;
    // }

     var huimg = new cc.Sprite(res.p_ui_chooseview_hu);
      huimg.attr({
        x: size.width*0.79,
        y: size.height *0.68
      });
      huimg.setScaleX(100/huimg.getContentSize().width);
      huimg.setScaleY(70/huimg.getContentSize().height);
      _this.winboard.addChild(huimg,5,'bighuimg');

    if (data.fromseat!=data.seat) {
      var jiepaoimg = new cc.Sprite(res.p_win_jie);
      jiepaoimg.attr({
        x: size.width*0.3,
        y: size.height *0.75
      });
      _this.winboard.addChild(jiepaoimg,5);
    }

    var hostimg = new cc.Sprite(res.p_win_host);
    var hosty=data.seat==0?0.75:0.58;
    hostimg.attr({
      x: size.width*0.06,
      y: size.height *hosty
    });
    _this.winboard.addChild(hostimg,5);

    var socrelist=_this.getScore(data,thelist);

    //console.log(_this.playerinfo);
    for (var i = 0; i < 4; i++) {
      function sortNumber(a,b){
        return a - b;
      }
      data.nowpai[i].sort(sortNumber);

      //玩家名字
      //var winnameLabel = new cc.LabelTTF('张三', "Arial", 26);
      var winnameLabel = new cc.LabelTTF(_this.playerinfo[thelist[i]].playername, "Arial", 26);
        winnameLabel.attr({
           x: size.width*0.12,
           y: size.height *(0.748-i*0.163),
      });
      winnameLabel.setFontFillColor(cc.color(255, 255, 255, 255)); 
      _this.winboard.addChild(winnameLabel, 55);

      //积分
      var scoreLabel = new cc.LabelTTF(socrelist[thelist[i]], "Arial", 26);
        scoreLabel.attr({
           x: size.width*0.85,
           y: size.height *(0.68-i*0.163),
      });
      scoreLabel.setFontFillColor(cc.color(255, 255, 255, 255)); 
      _this.winboard.addChild(scoreLabel, 55);


      if (thelist[i]==data.turn) {
        var zhuangimg = new cc.Sprite(res.p_win_zhuang);
        var zhuangimgposy=size.height *(0.675-i*0.167);
        if (i==3) {zhuangimgposy+=10}
        zhuangimg.attr({
          x: size.width*0.125,
          y: zhuangimgposy
        });
        _this.winboard.addChild(zhuangimg,5);
      }

      if (data.fromseat!=data.seat &&data.fromseat==thelist[i]) {
        var fangpaoimg = new cc.Sprite(res.p_win_fang);
        fangpaoimg.attr({
          x: size.width*0.3,
          y: size.height *(0.75-i*0.162)
        });
        _this.winboard.addChild(fangpaoimg,5);
      }

      var hidepaitype = (i==0 && winner==loser)?true:false;

      var posx=size.width*0.18;
      var posy=size.height*(0.673-i*0.162);
      for (var j = 0; j < data.nowpai[thelist[i]].length; j++) {
        if (hidepaitype && data.nowpai[thelist[i]][j]==data.paitype) {
          hidepaitype=false;
          continue;
        }
        var thing = new PaiSprite(res["p_pai"+data.nowpai[thelist[i]][j]]);

        thing.attr({
            x: posx,
            y:posy
        });
        posx+=50;
        thing.setAnchorPoint(0.5,0.5);
        thing.setScaleX(48/thing.getContentSize().width);
        thing.setScaleY(60/thing.getContentSize().height);
        _this.winboard.addChild(thing,15);
        _this.winpailist.push(thing);
      }


       var thing = new PaiSprite(res["p_pai"+data.paitype]);
        thing.attr({
            x: size.width*0.7,
            y:size.height*0.673
        });
        thing.setAnchorPoint(0.5,0.5);
        thing.setScaleX(48/thing.getContentSize().width);
        thing.setScaleY(60/thing.getContentSize().height);
        _this.winboard.addChild(thing,15);
        _this.winpailist.push(thing);

    }







    _this.showCountDown(3,function(){
      _this.newGame(data.turn,data.seat);
    });
  },

  getScore:function(data,thelist){
    var score=[0,0,0,0];
    var winner=data.seat;
    var _this=this;
    var loser=data.fromseat;
    var winpailist=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (var i = 0; i <data.nowpai[winner].length; i++) {
      winpailist[data.nowpai[winner][i]]++;
    }
    //判断杠
    for (var i = 0; i <4; i++) {
      if (data.ganglist[i].length>0) {
        for (var j = 0; j < data.ganglist[i].length; j++) {
          if (data.ganglist[i][j].seat==data.ganglist[i][j].fromseat) {
            for (var k = 0; k <4; k++) {
              if (i==data.ganglist[i][j].seat) {
                score[i]+=30;
              }else{
                score[i]-=10;
              }
            }
          }else{
            score[data.ganglist[i][j].seat]+=15;
            score[data.ganglist[i][j].fromseat]-=15;

          }
        }
      }
    }
    var winscore=1;
    
    //gangshanghua
    if (window.isGangHua) {
      winscore*=2;
    }

    //自摸
    if (winner==loser) {
      winscore*=2;
    }

    //庄家
    if (winner==data.turn) {
      winscore*=2;
    }

    //七小对
    if (data.hutype==1) {
      winscore*=2;
      var big7=0;
      for (var i = 0; i < 11; i++) {
        if (data.nowpai[winner][i]==data.nowpai[winner][i+1] && data.nowpai[winner][i]==data.nowpai[winner][i+2] && data.nowpai[winner][i]==data.nowpai[winner][i+3] ) {
          big7+=1;
          winscore*=2;
        }
      }
      if(big7>0){
        winscore*=2;
      }
    }
    console.log(winscore)

    //清一色
    var isqing=0;
    if (data.nowpai[winner][0]<=8) {
      isqing=1;
      for (var i = 1; i < 13; i++) {
        if(data.nowpai[winner][i]>8){
          isqing=0;
        }
      }
    }else if (data.nowpai[winner][0]>8 && data.nowpai[winner][0]<=17) {
      isqing=2;
      for (var i = 1; i < 13; i++) {
        if(data.nowpai[winner][0]<8 && data.nowpai[winner][0]>17){
          isqing=0;
        }
      }
    }else if (data.nowpai[winner][0]>17&& data.nowpai[winner][0]<=26) {
      isqing=3;
      for (var i = 1; i < 13; i++) {
        if(data.nowpai[winner][0]<17&& data.nowpai[winner][0]>26){
          isqing=0;
        }
      }
    }
    if (isqing>0) {
      winscore*=2;
    }
    console.log(winscore)

    //龙
    var long=false;
    if (winpailist[0] && winpailist[1] && winpailist[2] && winpailist[3] && winpailist[4] && winpailist[5] && winpailist[6] && winpailist[7] && winpailist[8]) {
      long=true;
    }else if (winpailist[10] && winpailist[11] && winpailist[12] && winpailist[13] && winpailist[14] && winpailist[15] && winpailist[16] && winpailist[17] && winpailist[9]) {
      long=true;
    }else if (winpailist[20] && winpailist[21] && winpailist[22] && winpailist[23] && winpailist[24] && winpailist[25] && winpailist[26] && winpailist[18] && winpailist[19]) {
      long=true;
    }
    if (long) {winscore*=2;}
    console.log(winscore);
    
    //如果是自摸，每个人都减，否则点炮人城堡
    if (winner==loser) {
     for (var i = 0; i < 4; i++) {
       if (winner==i) {
        score[winner]+=(winscore*3);
       }else{
        score[i]-=winscore;
       }
     }
    }else{
      score[winner]+=(winscore*4);
      score[loser]-=(winscore*4);
    }
    console.log(winscore);
    for (var i = 0; i < 4; i++) {
      var tmp=this.scorelist[i]+score[i];
      
     _this['player'+(i+1)+'scoreLabel'].setString(tmp);
    };
    //this.player1scoreLabel.setString('123');
    return score;
  },

  sortPai:function(isout,isfirst){
    var _this=this;
    function sortNumber(a,b){
      return a - b;
    }
    _this.player1.sort(sortNumber);
    //console.log('sort--');
    //console.log('ll ',_this.player1.length);
    //console.log( _this.player1pai.length);

    for (var i =_this.player1.length-1; i >= 0; i--) {
      //console.log('pailength', _this.player1pai.length,i);
      if (typeof  _this.player1pai[i] != "undefined"){
        _this.player1pai[i].removeFromParent();
        _this.player1pai[i] = undefined;
        _this.player1pai.splice(i,1);
      }
     
    };
   // console.log(_this.player1pai);
    var posx=60+_this.player1peng*270+_this.player1gang*270;
    var pailen=isfirst?14:(_this.player1.length);
    //console.log('pailen',pailen,_this.player1.length);
    for (var i = 0; i < (pailen); i++) {
      if ((i==_this.player1.length-1) &&isfirst) {
       //posx+=20;
      };
      var x = posx;
      posx+=90;
      _this.showPai(i,x);
    };
  },

  showPai:function(i,posx){
    var _this=this;
    //console.log('show',i,posx,_this.player1[i]);
    if (_this.player1pai.length>=_this.player1.length) {
      return false;
    };
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
    //console.log('show length ',_this.player1pai.length);

  },

  outPai:function(num,paitype){
    window.isPlay=false;
     // console.log('out',num,paitype);
     // console.log(window.playscene.player1pai);
     // console.log(window.playscene.player1pai.length);
    if (typeof window.playscene.player1pai[num]!= "undefined") {
      window.playscene.player1pai[num].removeFromParent();
      window.playscene.player1pai[num] = undefined;
      window.playscene.player1pai.splice(num,1);
    }

    // var peng =  window.playscene.getChildByName("peng");
    //  window.playscene.removeChild(peng); 
    // var guo =  window.playscene.getChildByName("guo");
    //  window.playscene.removeChild(guo); 
    // var gang =  window.playscene.getChildByName("gang");
    // window.playscene.removeChild(gang); 
    // var hu =  window.playscene.getChildByName("hu");
    // window.playscene.removeChild(hu); 
    window.playscene.hideChoose();
    window.playscene.player1.splice(num,1);
    window.playscene.show_P1outPai(paitype);
    window.playscene.player1list[paitype]--;
    window.playscene.sortPai(true);
    window.playscene.timeLabel.setString('');
     // window.playscene.unscheduleAllCallbacks();
  },

  AddPai:function(paitype,fromseat){
    var _this=this;
    console.log('add',paitype)
    _this["player1"].push(paitype);
     _this.showPai((_this["player1"].length-1),1260);
     window.isPlay=true;
    _this.player1list[paitype]++;
    //console.log(_this.player1list);
    _this.checkChoose(paitype,true,fromseat);
     console.log('pai length ',window.playscene.player1pai.length);

    _this.showCountDown(_this.turncountdown,function(){
       // _this.hideChoose();
       console.log('倒计时结束：',_this["player1"].length,_this.player1peng);
      if ((_this["player1"].length+_this.player1peng*3+_this.player1gang*3)>=14) {
        _this.outPai(_this["player1"].length-1,paitype);
      }
    })

  },

  show_P1outPai:function(paitype){
    var _this=this;
    var outlength=_this.player1outpai.length;
    var line=Math.floor(outlength/10);
    var posx=420+(outlength%10)*46;
    var posy=250-line*65;
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
    _this._sioClient.emit('gameinfo',_this.roomid,{code:4,playerid:this.playerid,paitype:paitype,seat:_this.seat,pais:_this.player1});
  },

  show_P2outPai:function(paitype){
    var _this=this;
    var outlength=_this.player2outpai.length;
    var line=Math.floor(outlength/7);
    var posx=300+62*line;
    var posy=510-(outlength%7)*44;
    var thing = new cc.Sprite(res["p_pai"+paitype]);
    thing.attr({
      x: posx,
      y:posy,
      rotation: 90
    });
    thing.setAnchorPoint(0.5,0.5);
    thing.setScaleX(42/thing.getContentSize().width);
    thing.setScaleY(60/thing.getContentSize().height);
    _this.addChild(thing,5);
    _this.player2outpai.push(thing);
   
  },

  show_P3outPai:function(paitype){
    var _this=this;
    var outlength=_this.player3outpai.length;
    var line=Math.floor(outlength/11);
    var posx=480+(outlength%11)*41;
    var posy=590-line*60;
    var thing = new cc.Sprite(res["p_pai"+paitype]);
    thing.attr({
        x: posx,
        y:posy
    });
    thing.setAnchorPoint(0.5,0.5);
    thing.setScaleX(40/thing.getContentSize().width);
    thing.setScaleY(58/thing.getContentSize().height);
    _this.addChild(thing,5);
    _this.player3outpai.push(thing);
  },

  show_P4outPai:function(paitype){
    var _this=this;
    var outlength=_this.player4outpai.length;
    var line=Math.floor(outlength/7);
    var posx=1040-62*line;
    var posy=220+(outlength%7)*44;
    var thing = new cc.Sprite(res["p_pai"+paitype]);
    thing.attr({
        x: posx,
        y:posy,
        rotation: 270
    });
    thing.setAnchorPoint(0.5,0.5);
    thing.setScaleX(42/thing.getContentSize().width);
    thing.setScaleY(60/thing.getContentSize().height);
    _this.addChild(thing,5);
    _this.player4outpai.push(thing);
  },

  newGame:function(turn,seat){
    var _this=this;
    if (seat==_this.seat) {
       _this._sioClient.emit('roominfo',_this.roomid,{code:4,seat:seat});
    };
   
     // sioclient.emit('roominfo',_this.roomid,{code:2,gametype:gametype,rule:rule,playernum:playernum,userid:userid,imghead:imghead});
    console.log(turn,seat)

    this.hideChoose();
    _this.player1list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (var i =_this.player1pai.length-1; i >= 0; i--) {
      //console.log('pailength', _this.player1pai.length,i);
      if (typeof  _this.player1pai[i] != "undefined"){
        _this.player1pai[i].removeFromParent();
        _this.player1pai[i] = undefined;
        _this.player1pai.splice(i,1);
      }
    };
    for (var i =_this.player2pai.length-1; i >= 0; i--) {
      //console.log('pailength', _this.player2pai.length,i);
      if (typeof  _this.player2pai[i] != "undefined"){
        _this.player2pai[i].removeFromParent();
        _this.player2pai[i] = undefined;
        _this.player2pai.splice(i,1);
      }
    };
    for (var i =_this.player3pai.length-1; i >= 0; i--) {
      //console.log('pailength', _this.player3pai.length,i);
      if (typeof  _this.player3pai[i] != "undefined"){
        _this.player3pai[i].removeFromParent();
        _this.player3pai[i] = undefined;
        _this.player3pai.splice(i,1);
      }
    };
    for (var i =_this.player4pai.length-1; i >= 0; i--) {
      //console.log('pailength', _this.player4pai.length,i);
      if (typeof  _this.player4pai[i] != "undefined"){
        _this.player4pai[i].removeFromParent();
        _this.player4pai[i] = undefined;
        _this.player4pai.splice(i,1);
      }
    };

    for (var i =_this.player1outpai.length-1; i >= 0; i--) {
      if (typeof  _this.player1outpai[i] != "undefined"){
        _this.player1outpai[i].removeFromParent();
        _this.player1outpai[i] = undefined;
        _this.player1outpai.splice(i,1);
      }
    };
    for (var i =_this.player2outpai.length-1; i >= 0; i--) {
      if (typeof  _this.player2outpai[i] != "undefined"){
        _this.player2outpai[i].removeFromParent();
        _this.player2outpai[i] = undefined;
        _this.player2outpai.splice(i,1);
      }
    };
    for (var i =_this.player3outpai.length-1; i >= 0; i--) {
      if (typeof  _this.player3outpai[i] != "undefined"){
        _this.player3outpai[i].removeFromParent();
        _this.player3outpai[i] = undefined;
        _this.player3outpai.splice(i,1);
      }
    };
    for (var i =_this.player4outpai.length-1; i >= 0; i--) {
      if (typeof  _this.player4outpai[i] != "undefined"){
        _this.player4outpai[i].removeFromParent();
        _this.player4outpai[i] = undefined;
        _this.player4outpai.splice(i,1);
      }
    };

    for (var i =_this.player1pengpai.length-1; i >= 0; i--) {
      if (typeof  _this.player1pengpai[i] != "undefined"){
        _this.player1pengpai[i].removeFromParent();
        _this.player1pengpai[i] = undefined;
        _this.player1pengpai.splice(i,1);
      }
    };

    for (var i =_this.player2pengpai.length-1; i >= 0; i--) {
      if (typeof  _this.player2pengpai[i] != "undefined"){
        _this.player2pengpai[i].removeFromParent();
        _this.player2pengpai[i] = undefined;
        _this.player2pengpai.splice(i,1);
      }
    };

    for (var i =_this.player3pengpai.length-1; i >= 0; i--) {
      if (typeof  _this.player3pengpai[i] != "undefined"){
        _this.player3pengpai[i].removeFromParent();
        _this.player3pengpai[i] = undefined;
        _this.player3pengpai.splice(i,1);
      }
    };

    for (var i =_this.player4pengpai.length-1; i >= 0; i--) {
      if (typeof  _this.player4pengpai[i] != "undefined"){
        _this.player4pengpai[i].removeFromParent();
        _this.player4pengpai[i] = undefined;
        _this.player4pengpai.splice(i,1);
      }
    };

    var bighuimg = _this.getChildByName("hubig_menu");
    _this.removeChild(bighuimg); 
    

    _this.winboard.removeFromParent();
    _this.winboard= null;

    for (var i =_this.winpailist.length-1; i >= 0; i--) {
      if (typeof  _this.winpailist[i] != "undefined"){
        _this.winpailist[i].removeFromParent();
        _this.winpailist[i] = undefined;
        _this.winpailist.splice(i,1);
      }
    };


    _this.player1pai=[];
    _this.player2pai=[];
    _this.player3pai=[];
    _this.player4pai=[];
    _this.player1outpai=[];
    _this.player2outpai=[];
    _this.player3outpai=[];
    _this.player4outpai=[];
    _this.player1peng=0;
    _this.player2peng=0;
    _this.player3peng=0;
    _this.player4peng=0;
    _this.player1pengpai=[];
    _this.player2pengpai=[];
    _this.player3pengpai=[];
    _this.player4pengpai=[];
    _this.player1=[];
    this.hideChoose();

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
    var totalpair=+(_this.player1gang*2);
    if(pairCount==7){  
      return true;  
    }  
    else{ 
      return false;  
    }  
  },

  CanHuPai:function (arr,paitype,self){ 
    if (!self) {
      arr[paitype]++;
    };
   // console.log('ishu?',paitype,this.player1.length);
   // console.log(arr)
    var _this=this;
    if(_this.CanHuPai__7pair(arr)){
      if (!self) {
        arr[paitype]--;
      }
        return 1;  
    }  
    else if(_this.CanHuPai_norm(arr)){  
        if (!self) {
          arr[paitype]--;
        }
        return 2;  
    }
    else{  
      if (!self) {
        arr[paitype]--;
      }
      return 0;  
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


  update : function() {
    var size = cc.winSize;
    var posx=this.touchx;
    var posy=this.touchy;


    this.checkGame();
  },

  
  winGame:function(data){

    // var winMenu = _this.getChildByName("winMenu");
    // _this.removeChild(winMenu); 
    // _this.showhuscore();



  },

});

var PlayScene = cc.Scene.extend({
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
