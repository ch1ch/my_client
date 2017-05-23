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

        
         // var stage0 = new cc.Sprite(res.stage_0);
         //  stage0.attr({
         //     x: 150,
         //     y: 1200,
         //  });
         //  stage0.setScaleX(250/stage0.getContentSize().width);
         //  stage0.setScaleY(250/stage0.getContentSize().height);
         //  this.addChild(stage0, 15);

        var stage_0Item = new cc.MenuItemImage(
          res.s_creat,
          res.s_creat,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(0),false);
            cc.director.runScene( new PlayScene(0) );
          }, this);
        stage_0Item.attr({
           x: 850,
           y: 400,
           anchorX: 0.5,
           anchorY: 0.5
        });
        stage_0Item.setScaleX(363/stage_0Item.getContentSize().width);
        stage_0Item.setScaleY(130/stage_0Item.getContentSize().height);
        var stage_0menu = new cc.Menu(stage_0Item);
        stage_0menu.x = 0;
        stage_0menu.y = 0;
        this.addChild(stage_0menu, 15);

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