 var StartLayer = cc.Layer.extend({
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

          this.title_bg = new cc.Sprite(res.w_title_bg);
          this.title_bg.attr({
             x: size.width*0.5,
             y: size.height *0.65,
          });
          this.addChild(this.title_bg, 3);


          this.title_ = new cc.Sprite(res.w_title);
          this.title_.attr({
             x: size.width*0.49,
             y: size.height *0.68,
          });
          this.addChild(this.title_, 5);
          this.title_.opacity = 0;

          
          var startItem = new cc.MenuItemImage(
            res.star1_png,
            res.start2_png,
            function () {
              cc.log("Menu is clicked!");
              //var transition=new cc.TransitionCrossFade(1,PlayScene);
              // var transition=new cc.TransitionPageTurn(1,new StageScene(),false);
              // cc.director.runScene( transition );
               cc.director.runScene( new StageScene());
              
            }, this);
          startItem.attr({
             x: size.width*0.49,
             y: size.height *0.28,
             anchorX: 0.5,
             anchorY: 0.5
          });
          //cc.log(startItem);
          var menu = new cc.Menu(startItem);
         // cc.log(menu);
          menu.x = 0;
          menu.y = 0;
          this.addChild(menu, 35);

          return true;
      },
      onEnter: function() {
        this._super();
        // var fadeTo = new cc.FadeTo(0.5, 120);
        // this.runAction(fadeTo);
        //var move = new cc.moveTo(0,100,200);
        // var fadeIn = new cc.fadeIn(2500);  
        // //this.title_.runAction(move);  
        // this.title_.runAction(fadeIn.reverse());  
        var fade_in = cc.fadeIn(1);
        var fade_out = cc.fadeIn(1);
        var seq = cc.sequence(fade_out, cc.delayTime(0.25), fade_in);
        var fade_4ever = seq.repeatForever();
        this.title_.runAction(fade_4ever);


        // var delay = cc.delayTime(0.25);
        
        // var action1 = cc.fadeIn(1.0);
        // var action1Back = action1.reverse();
        // this.title_.runAction(cc.sequence(action1, delay, action1Back));

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

  var StartScene = cc.Scene.extend({
      onEnter:function () {
          this._super();
          var layer = new StartLayer();
          this.addChild(layer);
      }
  });

   // var actionTo = cc.moveTo(2, cc.p(s.width - 40, s.height - 40));

   //      var actionBy = cc.moveBy(1, cc.p(80, 80));
   //      var actionByBack = actionBy.reverse();

   //      this._tamara.runAction(actionTo);
   //      this._grossini.runAction(cc.sequence(actionBy, actionByBack));
   //      this._kathia.runAction(cc.moveTo(1, cc.p(40, 40)));