 var CreateLayer = cc.Layer.extend({
    bgSprite:null,
    title_bg:null,
    title_:null,
      ctor:function () {
          this._super();

          var size = cc.winSize;
       
          cc.spriteFrameCache.addSpriteFrames(res.ani_plist);


          this.bgSprite = new cc.Sprite(res.w_bg);
          this.bgSprite.attr({
             x: size.width / 2,
             y: size.height / 2,
          });
          this.addChild(this.bgSprite, 0);


         



          var sweet0 = new cc.Sprite(res.sweet0_png);
          sweet0.attr({
             x: 200,
             y: 1050,
          });
          sweet0.setScaleX(150/sweet0.getContentSize().width);
          sweet0.setScaleY(150/sweet0.getContentSize().height);
          this.addChild(sweet0, 5);

          var sweet1 = new cc.Sprite(res.sweet1_png);
          sweet1.attr({
             x: 200,
             y: 880,
          });
          sweet1.setScaleX(150/sweet1.getContentSize().width);
          sweet1.setScaleY(150/sweet1.getContentSize().height);
          this.addChild(sweet1, 5);

          var sweet2 = new cc.Sprite(res.sweet2_png);
          sweet2.attr({
             x: 200,
             y: 710,
          });
          sweet2.setScaleX(150/sweet2.getContentSize().width);
          sweet2.setScaleY(150/sweet2.getContentSize().height);
          this.addChild(sweet2, 5);

            var sweet3 = new cc.Sprite(res.sweet3_png);
          sweet3.attr({
             x: 200,
             y: 540,
          });
          sweet3.setScaleX(150/sweet3.getContentSize().width);
          sweet3.setScaleY(150/sweet3.getContentSize().height);
          this.addChild(sweet3, 5);

          var sweet0a = cc.sequence(this.sharkAction(1), cc.delayTime(0.25), this.sharkAction(1));
          var sweet0_4ever = sweet0a.repeatForever();
          sweet0.runAction(sweet0_4ever);

          var sweet1a = cc.sequence(this.sharkAction(2), cc.delayTime(0.17), this.sharkAction(2));
          var sweet1_4ever = sweet1a.repeatForever();
          sweet1.runAction(sweet1_4ever);

          var sweet2a = cc.sequence(this.sharkAction(3), cc.delayTime(0.31), this.sharkAction(3));
          var sweet2_4ever = sweet2a.repeatForever();
          sweet2.runAction(sweet2_4ever);

          var sweet3a = cc.sequence(this.sharkAction(4), cc.delayTime(0.21), this.sharkAction(4));
          var sweet3_4ever = sweet3a.repeatForever();
          sweet3.runAction(sweet3_4ever);


          var backBtn = new cc.MenuItemImage(
            res.create_bg,
            res.create_bg,
            function () {
              cc.director.runScene( new StartScene());
            }, this);
          backBtn.attr({
            x:size.width*0.5,
            y:size.height*0.5
          });
          // backBtn.setScaleX(150/backBtn.getContentSize().width);
          // backBtn.setScaleY(150/backBtn.getContentSize().height);
          var backMenu = new cc.Menu(backBtn);
          backMenu.x = 0;
          backMenu.y = 0;
          this.addChild(backMenu, 15);






          return true;
      },
      onEnter: function() {
        this._super();


    },
    sharkAction : function(item) {
      var frames = [];
      for (var i = 1; i < 6; i++) {
          var str = "a"+item+"_"+i+".png"
          //cc.log(str);
          var frame = cc.spriteFrameCache.getSpriteFrame(str);
          frames.push(frame);
      }

      var animation = new cc.Animation(frames, 0.1);
      var action = new cc.Animate(animation);

      return action;
  },


  });

  var CreateScene = cc.Scene.extend({
      onEnter:function () {
          this._super();
          var layer = new CreateLayer();
          this.addChild(layer);
      }
  });

  