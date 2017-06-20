 var StageLayer = cc.Layer.extend({
    bgSprite:null,
    title_bg:null,
    title_:null,
      ctor:function () {
          this._super();

          var size = cc.winSize;

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

        var creatRoomItem = new cc.MenuItemImage(
          res.s_creat,
          res.s_creat,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(0),false);
            cc.director.runScene( new PlayScene(1) );
          }, this);
        creatRoomItem.attr({
           x: 850,
           y: 440,
           anchorX: 0.5,
           anchorY: 0.5
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
            var transition=new cc.TransitionPageTurn(1,new PlayScene(0),false);
            cc.director.runScene( new PlayScene(2) );
          }, this);
        joinRoomItem.attr({
           x: 850,
           y: 300,
           anchorX: 0.5,
           anchorY: 0.5
        });
        joinRoomItem.setScaleX(363/joinRoomItem.getContentSize().width);
        joinRoomItem.setScaleY(130/joinRoomItem.getContentSize().height);
        var Joinbtn = new cc.Menu(joinRoomItem);
        Joinbtn.x = 0;
        Joinbtn.y = 0;
        this.addChild(Joinbtn, 15);



        console.log("123");


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