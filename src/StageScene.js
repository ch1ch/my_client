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
          res.stage_0,
          res.stage_0,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(0),false);
            cc.director.runScene( new PlayScene(0) );
          }, this);
        stage_0Item.attr({
           x: 150,
           y: 1200,
           anchorX: 0.5,
           anchorY: 0.5
        });
        stage_0Item.setScaleX(250/stage_0Item.getContentSize().width);
        stage_0Item.setScaleY(250/stage_0Item.getContentSize().height);
        var stage_0menu = new cc.Menu(stage_0Item);
        stage_0menu.x = 0;
        stage_0menu.y = 0;
        this.addChild(stage_0menu, 15);


        var stage_1Item = new cc.MenuItemImage(
          res.stage_1,
          res.stage_1,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(1),false);
            cc.director.runScene( new PlayScene(1));
          }, this);
        stage_1Item.attr({
           x: 450,
           y: 1100,
           anchorX: 0.5,
           anchorY: 0.5
        });
        stage_1Item.setScaleX(150/stage_1Item.getContentSize().width);
        stage_1Item.setScaleY(150/stage_1Item.getContentSize().height);
        var stage_1menu = new cc.Menu(stage_1Item);
        stage_1menu.x = 0;
        stage_1menu.y = 0;
        this.addChild(stage_1menu, 15);

        var stage_2Item = new cc.MenuItemImage(
          res.stage_2,
          res.stage_2,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(2),false);
            cc.director.runScene( new PlayScene(2) );
          }, this);
        stage_2Item.attr({
           x: 400,
           y: 760,
           anchorX: 0.5,
           anchorY: 0.5
        });
        stage_2Item.setScaleX(150/stage_2Item.getContentSize().width);
        stage_2Item.setScaleY(150/stage_2Item.getContentSize().height);
        var stage_2menu = new cc.Menu(stage_2Item);
        stage_2menu.x = 0;
        stage_2menu.y = 0;
        this.addChild(stage_2menu, 15);

        var stage_3Item = new cc.MenuItemImage(
          res.stage_3,
          res.stage_3,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(3),false);
            cc.director.runScene( new PlayScene(3) );
          }, this);
        stage_3Item.attr({
           x: 600,
           y: 530,
           anchorX: 0.5,
           anchorY: 0.5
        });
        stage_3Item.setScaleX(150/stage_3Item.getContentSize().width);
        stage_3Item.setScaleY(150/stage_3Item.getContentSize().height);
        var stage_3menu = new cc.Menu(stage_3Item);
        stage_3menu.x = 0;
        stage_3menu.y = 0;
        this.addChild(stage_3menu, 15);

        var stage_4Item = new cc.MenuItemImage(
          res.stage_4,
          res.stage_4,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(4),false);
            cc.director.runScene( new PlayScene(4) );
          }, this);
        stage_4Item.attr({
           x: 400,
           y: 180,
           anchorX: 0.5,
           anchorY: 0.5
        });
        stage_4Item.setScaleX(150/stage_4Item.getContentSize().width);
        stage_4Item.setScaleY(150/stage_4Item.getContentSize().height);
        var stage_4menu = new cc.Menu(stage_4Item);
        stage_4menu.x = 0;
        stage_4menu.y = 0;
        this.addChild(stage_4menu, 15);

        var stage_5Item = new cc.MenuItemImage(
          res.stage_5,
          res.stage_5,
          function () {
            var transition=new cc.TransitionPageTurn(1,new PlayScene(5),false);
            cc.director.runScene( new PlayScene(5) );
          }, this);
        stage_5Item.attr({
           x: 620,
           y: 180,
           anchorX: 0.5,
           anchorY: 0.5
        });
        stage_5Item.setScaleX(250/stage_5Item.getContentSize().width);
        stage_5Item.setScaleY(250/stage_5Item.getContentSize().height);
        var stage_5menu = new cc.Menu(stage_5Item);
        stage_5menu.x = 0;
        stage_5menu.y = 0;
        this.addChild(stage_5menu, 15);


        var sweet0 = new cc.Sprite(res.sweet0_png);
        sweet0.attr({
           x: 260,
           y: 300,
        });
        sweet0.setScaleX(250/sweet0.getContentSize().width);
        sweet0.setScaleY(250/sweet0.getContentSize().height);
        this.addChild(sweet0, 5);

        var sweet1 = new cc.Sprite(res.sweet1_png);
        sweet1.attr({
           x: 600,
           y: 700,
        });
        sweet1.setScaleX(250/sweet1.getContentSize().width);
        sweet1.setScaleY(250/sweet1.getContentSize().height);
        this.addChild(sweet1, 5);

        var sweet2 = new cc.Sprite(res.sweet2_png);
        sweet2.attr({
           x: 200,
           y: 830,
        });
        sweet2.setScaleX(250/sweet2.getContentSize().width);
        sweet2.setScaleY(250/sweet2.getContentSize().height);
        this.addChild(sweet2, 5);


        var sweet3 = new cc.Sprite(res.sweet3_png);
        sweet3.attr({
           x: 450,
           y: 1200,
        });
        sweet3.setScaleX(250/sweet3.getContentSize().width);
        sweet3.setScaleY(250/sweet3.getContentSize().height);
        this.addChild(sweet3, 5);




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