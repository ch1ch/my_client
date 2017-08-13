 var StageLayer = cc.Layer.extend({
    bgSprite:null,
    title_bg:null,
    title_:null,
    joinnumarr:[],
      ctor:function () {
          this._super();

          var size = cc.winSize;
          var _this=this;
          var imgurl=getCookie('headimgurl');
          var openid=getCookie('openid');
          var nickname=getCookie('nickname');

          this.bgSprite = new cc.Sprite(res.s_bg);
          this.bgSprite.attr({
             x: size.width / 2,
             y: size.height / 2,
          });
          this.addChild(this.bgSprite, 0);

        
          var bottom = new cc.Sprite(res.s_bottom);
          bottom.attr({
             x: size.width / 2,
             y: 100,
          });
          this.addChild(bottom, 15);

          var userinfo = new cc.LabelTTF("", "Arial", 24);
          userinfo.setColor(cc.color(0, 0, 0, 255)); 
          userinfo.attr({
             x: 210,
             y: 720,
          });
          this.addChild(userinfo, 30);

          var cardnum = new cc.LabelTTF("0", "Arial", 24);
          cardnum.setColor(cc.color(0, 0, 0, 255)); 
          cardnum.attr({
             x: 230,
             y: 680,
          });
          this.addChild(cardnum, 30);

          
          
       
          cc.loader.loadImg(imgurl, {isCrossOrigin:true }, function(err,img){
            var headimg = new cc.Sprite(img);
            headimg.attr({
              x: 60,
              y: 700,
            });
            headimg.setScaleX(90/headimg.getContentSize().width);
            headimg.setScaleY(90/headimg.getContentSize().height);
            _this.addChild(headimg, 15);
          });

          Utils.get("http://"+hosturl+":3010/api/getuser.api",{openid:openid,imgurl:imgurl,nickname:nickname},function(res){
            var theuser=res.data;
            console.log(theuser);
            _this.userid=theuser.id;
            userinfo.setString('ID:'+theuser.id+" 昵称："+theuser.name);
            cardnum.setString(theuser.card);
          });

          var cardbg = new cc.Sprite(res.s_cardbg);
          cardbg.attr({
             x: 250,
             y: 680,
          });
          this.addChild(cardbg, 15);

        var creatRoomItem = new cc.MenuItemImage(
          res.s_creat,
          res.s_creat,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(0),false);
            cc.director.runScene( new PlayScene(1) );
          }, this);
        creatRoomItem.attr({
           x: 850,
           y: 440
        });
        creatRoomItem.setScaleX(363/creatRoomItem.getContentSize().width);
        creatRoomItem.setScaleY(130/creatRoomItem.getContentSize().height);
        var Creatbtn = new cc.Menu(creatRoomItem);
        Creatbtn.x = 0;
        Creatbtn.y = 0;
        this.addChild(Creatbtn, 15);


        var joinRoomItem = new cc.MenuItemImage(
        res.s_join,
        res.s_join,
        function () {
          _this.addChild(joinbg, 35);

          // var transition=new cc.TransitionPageTurn(1,new PlayScene(0),false);
          // cc.director.runScene( new PlayScene(2) );
        }, this);
        joinRoomItem.attr({
         x: 850,
         y: 300
        });
        joinRoomItem.setScaleX(363/joinRoomItem.getContentSize().width);
        joinRoomItem.setScaleY(130/joinRoomItem.getContentSize().height);
        var Joinbtn = new cc.Menu(joinRoomItem);
        Joinbtn.x = 0;
        Joinbtn.y = 0;
        this.addChild(Joinbtn, 15);

        var joinshowItem = new cc.MenuItemImage(
        res.s_joinbg,
        res.s_joinbg,
        function () {
        }, this);
        joinshowItem.attr({
          x: size.width / 2,
          y: size.height / 2,
        });
        joinshowItem.setScaleX(size.width/joinshowItem.getContentSize().width);
        joinshowItem.setScaleY(size.height/joinshowItem.getContentSize().height);
        var joinbg = new cc.Menu(joinshowItem);
        joinbg.x = 0;
        joinbg.y = 0;
        _this.addChild(joinbg, 35);



        var joinclose = new cc.MenuItemImage(
        res.s_close,
        res.s_close,
        function () {
          _this.removeChild(joinbg, 35);
        }, this);
        joinclose.attr({
         x: 610,
         y: 285
        });
        joinclose.setScaleX(40/joinclose.getContentSize().width);
        joinclose.setScaleY(40/joinclose.getContentSize().height);
        var joinclosemenu = new cc.Menu(joinclose);
        joinclosemenu.x = 0;
        joinclosemenu.y = 0;
        joinshowItem.addChild(joinclosemenu, 25);

        var joinnum1 = new cc.LabelTTF("", "Arial", 20);
        joinnum1.setColor(cc.color(255, 255, 255, 255)); 
        joinnum1.attr({
             x: 260,
             y: 245,
        });
        joinshowItem.addChild(joinnum1, 30);
        _this.joinnumarr.push(joinnum1);

        var joinnum2 = new cc.LabelTTF("", "Arial", 20);
        joinnum2.setColor(cc.color(255, 255, 255, 255)); 
        joinnum2.attr({
             x: 300,
             y: 245,
        });
        joinshowItem.addChild(joinnum2, 30);
        _this.joinnumarr.push(joinnum2);


        var joinnum3 = new cc.LabelTTF("", "Arial", 20);
        joinnum3.setColor(cc.color(255, 255, 255, 255)); 
        joinnum3.attr({
             x: 340,
             y: 245,
        });
        joinshowItem.addChild(joinnum3, 30);
        _this.joinnumarr.push(joinnum3);


        var joinnum4 = new cc.LabelTTF("", "Arial", 20);
        joinnum4.setColor(cc.color(255, 255, 255, 255)); 
        joinnum4.attr({
             x: 380,
             y: 245,
        });
        joinshowItem.addChild(joinnum4, 30);
        _this.joinnumarr.push(joinnum4);


        var joinnum5 = new cc.LabelTTF("", "Arial", 20);
        joinnum5.setColor(cc.color(255, 255, 255, 255)); 
        joinnum5.attr({
             x: 420,
             y: 245,
        });
        joinshowItem.addChild(joinnum5, 30);
        _this.joinnumarr.push(joinnum5);

        this.joinnums=0;
        //cardnum.setString(theuser.card);

        function enterjoinnum(num){
          if (_this.joinnums<5) {
            _this.joinnumarr[_this.joinnums].setString(num);
            _this.joinnums++;
          }
        }



        var joinItem1 = new cc.MenuItemImage(
        res.s_join1,
        res.s_join1,
        function () {
          enterjoinnum(1);
        }, this);
        joinItem1.attr({
         x: 220,
         y: 205
        });
        joinItem1.setScaleX(60/joinItem1.getContentSize().width);
        joinItem1.setScaleY(30/joinItem1.getContentSize().height);
        var joinbtn1 = new cc.Menu(joinItem1);
        joinbtn1.x = 0;
        joinbtn1.y = 0;
        joinshowItem.addChild(joinbtn1, 25);

        var joinItem2 = new cc.MenuItemImage(
        res.s_join2,
        res.s_join2,
        function () {
          enterjoinnum(2);
        }, this);
        joinItem2.attr({
         x: 335,
         y: 205
        });
        joinItem2.setScaleX(60/joinItem2.getContentSize().width);
        joinItem2.setScaleY(30/joinItem2.getContentSize().height);
        var joinbtn2 = new cc.Menu(joinItem2);
        joinbtn2.x = 0;
        joinbtn2.y = 0;
        joinshowItem.addChild(joinbtn2, 25);

        var joinItem3 = new cc.MenuItemImage(
        res.s_join3,
        res.s_join3,
        function () {
          enterjoinnum(3);
        }, this);
        joinItem3.attr({
         x: 450,
         y: 205
        });
        joinItem3.setScaleX(60/joinItem3.getContentSize().width);
        joinItem3.setScaleY(30/joinItem3.getContentSize().height);
        var joinbtn3 = new cc.Menu(joinItem3);
        joinbtn3.x = 0;
        joinbtn3.y = 0;
        joinshowItem.addChild(joinbtn3, 25);

        var joinItem4 = new cc.MenuItemImage(
        res.s_join4,
        res.s_join4,
        function () {
          enterjoinnum(4);
        }, this);
        joinItem4.attr({
         x: 220,
         y: 155
        });
        joinItem4.setScaleX(60/joinItem4.getContentSize().width);
        joinItem4.setScaleY(30/joinItem4.getContentSize().height);
        var joinbtn4 = new cc.Menu(joinItem4);
        joinbtn4.x = 0;
        joinbtn4.y = 0;
        joinshowItem.addChild(joinbtn4, 25);

        var joinItem5 = new cc.MenuItemImage(
        res.s_join5,
        res.s_join5,
        function () {
          enterjoinnum(5);
        }, this);
        joinItem5.attr({
         x: 335,
         y: 155
        });
        joinItem5.setScaleX(60/joinItem5.getContentSize().width);
        joinItem5.setScaleY(30/joinItem5.getContentSize().height);
        var joinbtn5 = new cc.Menu(joinItem5);
        joinbtn5.x = 0;
        joinbtn5.y = 0;
        joinshowItem.addChild(joinbtn5, 25);

        var joinItem6 = new cc.MenuItemImage(
        res.s_join6,
        res.s_join6,
        function () {
          enterjoinnum(6);
        }, this);
        joinItem6.attr({
         x: 450,
         y: 155
        });
        joinItem6.setScaleX(60/joinItem6.getContentSize().width);
        joinItem6.setScaleY(30/joinItem6.getContentSize().height);
        var joinbtn6 = new cc.Menu(joinItem6);
        joinbtn6.x = 0;
        joinbtn6.y = 0;
        joinshowItem.addChild(joinbtn6, 25);

        var joinItem7 = new cc.MenuItemImage(
        res.s_join7,
        res.s_join7,
        function () {
          enterjoinnum(7);
        }, this);
        joinItem7.attr({
         x: 220,
         y: 105
        });
        joinItem7.setScaleX(60/joinItem7.getContentSize().width);
        joinItem7.setScaleY(30/joinItem7.getContentSize().height);
        var joinbtn7 = new cc.Menu(joinItem7);
        joinbtn7.x = 0;
        joinbtn7.y = 0;
        joinshowItem.addChild(joinbtn7, 25);

        var joinItem8 = new cc.MenuItemImage(
        res.s_join8,
        res.s_join8,
        function () {
          enterjoinnum(8);
        }, this);
        joinItem8.attr({
         x: 335,
         y: 105
        });
        joinItem8.setScaleX(60/joinItem8.getContentSize().width);
        joinItem8.setScaleY(30/joinItem8.getContentSize().height);
        var joinbtn8 = new cc.Menu(joinItem8);
        joinbtn8.x = 0;
        joinbtn8.y = 0;
        joinshowItem.addChild(joinbtn8, 25);

        var joinItem9 = new cc.MenuItemImage(
        res.s_join9,
        res.s_join9,
        function () {
          enterjoinnum(9);
        }, this);
        joinItem9.attr({
         x: 450,
         y: 105
        });
        joinItem9.setScaleX(60/joinItem9.getContentSize().width);
        joinItem9.setScaleY(30/joinItem9.getContentSize().height);
        var joinbtn9 = new cc.Menu(joinItem9);
        joinbtn9.x = 0;
        joinbtn9.y = 0;
        joinshowItem.addChild(joinbtn9, 25);

        var joinItemdel = new cc.MenuItemImage(
        res.s_joindel,
        res.s_joindel,
        function () {
          if (_this.joinnums>0) {
            _this.joinnums--;
            _this.joinnumarr[_this.joinnums].setString('');
            
          }
        }, this);
        joinItemdel.attr({
         x: 220,
         y: 60
        });
        joinItemdel.setScaleX(60/joinItemdel.getContentSize().width);
        joinItemdel.setScaleY(30/joinItemdel.getContentSize().height);
        var joinbtndel = new cc.Menu(joinItemdel);
        joinbtndel.x = 0;
        joinbtndel.y = 0;
        joinshowItem.addChild(joinbtndel, 25);

        var joinItem0 = new cc.MenuItemImage(
        res.s_join0,
        res.s_join0,
        function () {
          enterjoinnum(0);
        }, this);
        joinItem0.attr({
         x: 335,
         y: 60
        });
        joinItem0.setScaleX(60/joinItem0.getContentSize().width);
        joinItem0.setScaleY(30/joinItem0.getContentSize().height);
        var joinbtn0 = new cc.Menu(joinItem0);
        joinbtn0.x = 0;
        joinbtn0.y = 0;
        joinshowItem.addChild(joinbtn0, 25);

        var joinItemsure = new cc.MenuItemImage(
        res.s_joinsure,
        res.s_joinsure,
        function () {

        }, this);
        joinItemsure.attr({
         x: 450,
         y: 60
        });
        joinItemsure.setScaleX(60/joinItemsure.getContentSize().width);
        joinItemsure.setScaleY(30/joinItemsure.getContentSize().height);
        var joinbtnsure = new cc.Menu(joinItemsure);
        joinbtnsure.x = 0;
        joinbtnsure.y = 0;
        joinshowItem.addChild(joinbtnsure, 25);




        var shopItem = new cc.MenuItemImage(
        res.s_shopbtn,
        res.s_shopbtn,
        function () {
          _this.addChild(shopbg, 35);
        }, this);
        shopItem.attr({
         x: 400,
         y: 100,
         anchorX: 0.5,
         anchorY: 0.5
        });
        shopItem.setScaleX(120/shopItem.getContentSize().width);
        shopItem.setScaleY(120/shopItem.getContentSize().height);
        var shopbtn = new cc.Menu(shopItem);
        shopbtn.x = 0;
        shopbtn.y = 0;
        this.addChild(shopbtn, 25);

        var shopshowItem = new cc.MenuItemImage(
        res.s_shopbg,
        res.s_shopbg,
        function () {
        }, this);
        shopshowItem.attr({
          x: size.width / 2,
          y: size.height / 2,
        });
        shopshowItem.setScaleX(size.width/shopshowItem.getContentSize().width);
        shopshowItem.setScaleY(size.height/shopshowItem.getContentSize().height);
        var shopbg = new cc.Menu(shopshowItem);
        shopbg.x = 0;
        shopbg.y = 0;

        var shopclose = new cc.MenuItemImage(
        res.s_close,
        res.s_close,
        function () {
          _this.removeChild(shopbg, 35);
        }, this);
        shopclose.attr({
         x: 610,
         y: 285
        });
        shopclose.setScaleX(40/shopclose.getContentSize().width);
        shopclose.setScaleY(40/shopclose.getContentSize().height);
        var shopclosemenu = new cc.Menu(shopclose);
        shopclosemenu.x = 0;
        shopclosemenu.y = 0;
        shopshowItem.addChild(shopclosemenu, 25);


        var shopItem1 = new cc.MenuItemImage(
        res.s_shop1,
        res.s_shop1,
        function () {
          var time=Date.now();
          var ordernum=_this.userid+time;
          submitOrder('1',ordernum);
        }, this);
        shopItem1.attr({
         x: 400,
         y: 235
        });
        shopItem1.setScaleX(60/shopItem1.getContentSize().width);
        shopItem1.setScaleY(30/shopItem1.getContentSize().height);
        var shopbtn1 = new cc.Menu(shopItem1);
        shopbtn1.x = 0;
        shopbtn1.y = 0;
        shopshowItem.addChild(shopbtn1, 25);

        var shopItem2 = new cc.MenuItemImage(
        res.s_shop2,
        res.s_shop2,
        function () {
          var time=Date.now();
          var ordernum=_this.userid+time;
          submitOrder('6',ordernum);
        }, this);
        shopItem2.attr({
         x: 400,
         y: 180
        });
        shopItem2.setScaleX(60/shopItem2.getContentSize().width);
        shopItem2.setScaleY(30/shopItem2.getContentSize().height);
        var shopbtn2 = new cc.Menu(shopItem2);
        shopbtn2.x = 0;
        shopbtn2.y = 0;
        shopshowItem.addChild(shopbtn2, 25);

        var shopItem3 = new cc.MenuItemImage(
        res.s_shop3,
        res.s_shop3,
        function () {
          var time=Date.now();
          var ordernum=_this.userid+time;
          submitOrder('30',ordernum);
        }, this);
        shopItem3.attr({
         x: 400,
         y: 130
        });
        shopItem3.setScaleX(60/shopItem3.getContentSize().width);
        shopItem3.setScaleY(30/shopItem3.getContentSize().height);
        var shopbtn3 = new cc.Menu(shopItem3);
        shopbtn3.x = 0;
        shopbtn3.y = 0;
        shopshowItem.addChild(shopbtn3, 25);

        var shopItem4 = new cc.MenuItemImage(
        res.s_shop4,
        res.s_shop4,
        function () {
          var time=Date.now();
          var ordernum=_this.userid+time;
          submitOrder('100',ordernum);
        }, this);
        shopItem4.attr({
         x: 400,
         y: 80
        });
        shopItem4.setScaleX(60/shopItem4.getContentSize().width);
        shopItem4.setScaleY(30/shopItem4.getContentSize().height);
        var shopbtn4 = new cc.Menu(shopItem4);
        shopbtn4.x = 0;
        shopbtn4.y = 0;
        shopshowItem.addChild(shopbtn4, 25);




        var shareItem = new cc.MenuItemImage(
        res.s_sharebtn,
        res.s_sharebtn,
        function () {
          _this.addChild(sharebg, 35);
        }, this);
        shareItem.attr({
         x: 650,
         y: 100
        });
        shareItem.setScaleX(90/shareItem.getContentSize().width);
        shareItem.setScaleY(120/shareItem.getContentSize().height);
        var sharebtn = new cc.Menu(shareItem);
        sharebtn.x = 0;
        sharebtn.y = 0;
        this.addChild(sharebtn, 25);

        var shareshowItem = new cc.MenuItemImage(
        res.s_sharebg,
        res.s_sharebg,
        function () {
         _this.removeChild(sharebg, 35);
        }, this);
        shareshowItem.attr({
          x: size.width / 2,
          y: size.height / 2,
        });
        shareshowItem.setScaleX(size.width/shareshowItem.getContentSize().width);
        shareshowItem.setScaleY(size.height/shareshowItem.getContentSize().height);
        var sharebg = new cc.Menu(shareshowItem);
        sharebg.x = 0;
        sharebg.y = 0;


        var scoreItem = new cc.MenuItemImage(
        res.s_scorebtn,
        res.s_scorebtn,
        function () {
          

        }, this);
        scoreItem.attr({
         x: 830,
         y: 100
        });
        scoreItem.setScaleX(90/scoreItem.getContentSize().width);
        scoreItem.setScaleY(120/scoreItem.getContentSize().height);
        var scorebtn = new cc.Menu(scoreItem);
        scorebtn.x = 0;
        scorebtn.y = 0;
        this.addChild(scorebtn, 25);

        var huodongItem = new cc.MenuItemImage(
        res.s_huodongbtn,
        res.s_huodongbtn,
        function () {
          _this.addChild(Huodongbg, 35);
        }, this);
        huodongItem.attr({
         x: 1000,
         y: 100
        });
        // huodongItem.setScaleX(120/huodongItem.getContentSize().width);
        // huodongItem.setScaleY(120/huodongItem.getContentSize().height);
        var Huodongbtn = new cc.Menu(huodongItem);
        Huodongbtn.x = 0;
        Huodongbtn.y = 0;
        this.addChild(Huodongbtn, 25);


        var huodongshowItem = new cc.MenuItemImage(
        res.s_huodongbg,
        res.s_huodongbg,
        function () {
         _this.removeChild(Huodongbg, 35);
        }, this);
        huodongshowItem.attr({
          x: size.width / 2,
          y: size.height / 2,
        });
        huodongshowItem.setScaleX(size.width/huodongshowItem.getContentSize().width);
        huodongshowItem.setScaleY(size.height/huodongshowItem.getContentSize().height);
        var Huodongbg = new cc.Menu(huodongshowItem);
        Huodongbg.x = 0;
        Huodongbg.y = 0;



        var systemItem = new cc.MenuItemImage(
        res.s_systembtn,
        res.s_systembtn,
        function () {
         _this.addChild(systembg, 35);
          

        }, this);
        systemItem.attr({
         x: 1120,
         y: 100,
         anchorX: 0.5,
         anchorY: 0.5
        });
        // systemItem.setScaleX(110/systemItem.getContentSize().width);
        // systemItem.setScaleY(120/systemItem.getContentSize().height);
        var systembtn = new cc.Menu(systemItem);
        systembtn.x = 0;
        systembtn.y = 0;
        this.addChild(systembtn, 25);

        var systemshowItem = new cc.MenuItemImage(
        res.s_systembg,
        res.s_systembg,
        function () {
         _this.removeChild(systembg, 35);
        }, this);
        systemshowItem.attr({
          x: size.width / 2,
          y: size.height / 2,
        });
        systemshowItem.setScaleX(size.width/systemshowItem.getContentSize().width);
        systemshowItem.setScaleY(size.height/systemshowItem.getContentSize().height);
        var systembg = new cc.Menu(systemshowItem);
        systembg.x = 0;
        systembg.y = 0;


        var ruleItem = new cc.MenuItemImage(
        res.s_rulebtn,
        res.s_rulebtn,
        function () {
         _this.addChild(rulebg, 35);

        }, this);
        ruleItem.attr({
         x: 1250,
         y: 600
        });
        // ruleItem.setScaleX(130/ruleItem.getContentSize().width);
        // ruleItem.setScaleY(90/ruleItem.getContentSize().height);
        var rulebtn = new cc.Menu(ruleItem);
        rulebtn.x = 0;
        rulebtn.y = 0;
        this.addChild(rulebtn, 25);

        var ruleshowItem = new cc.MenuItemImage(
        res.s_rulebg,
        res.s_rulebg,
        function () {
         _this.removeChild(rulebg, 35);
        }, this);
        ruleshowItem.attr({
          x: size.width / 2,
          y: size.height / 2,
        });
        ruleshowItem.setScaleX(size.width/ruleshowItem.getContentSize().width);
        ruleshowItem.setScaleY(size.height/ruleshowItem.getContentSize().height);
        var rulebg = new cc.Menu(ruleshowItem);
        rulebg.x = 0;
        rulebg.y = 0;

        var backItem = new cc.MenuItemImage(
        res.s_backbtn,
        res.s_backbtn,
        function () {

        }, this);
        backItem.attr({
         x: 1250,
         y: 690
        });
        var backbtn = new cc.Menu(backItem);
        backbtn.x = 0;
        backbtn.y = 0;
        this.addChild(backbtn, 25);

        var backshowItem = new cc.MenuItemImage(
        res.s_backbg,
        res.s_backbg,
        function () {
         _this.removeChild(backbg, 35);
        }, this);
        backshowItem.attr({
          x: size.width / 2,
          y: size.height / 2,
        });
        backshowItem.setScaleX(size.width/backshowItem.getContentSize().width);
        backshowItem.setScaleY(size.height/backshowItem.getContentSize().height);
        var backbg = new cc.Menu(backshowItem);
        backbg.x = 0;
        backbg.y = 0;


        // console.log("123");


        return true;
      },
      onEnter: function() {
        this._super();
       
    },
  });

  var StageScene = cc.Scene.extend({
      onEnter:function () {
          this._super();
          var layer = new StageLayer();
          this.addChild(layer);
      }
  });

   // var actionTo = cc.moveTo(2, cc.p(s.width - 40, s.height - 40));

   //      var actionBy = cc.moveBy(1, cc.p(80, 80));
   //      var actionByBack = actionBy.reverse();

   //      this._tamara.runAction(actionTo);
   //      this._grossini.runAction(cc.sequence(actionBy, actionByBack));
   //      this._kathia.runAction(cc.moveTo(1, cc.p(40, 40)));