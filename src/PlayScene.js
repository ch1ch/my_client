  var PlayLayer = cc.Layer.extend({
      bgSprite:null,
      scoreLabel:null,
      circleSprites1:null,
      circleSprites2:null,
      circleSprites3:null,
      circleSprites4:null,
      circleradius:null,
      touchx:null,
      touchy:null,
      gamelevel:null,
      level:null,
      thingSprites:null,
      defultColorArrary:null,
      circleRadiusArray:null,
      nowCircleLevel:null,
      circleColorArray:null,
      sweetWidth:null,
      colorBlockArray:null,
      hasColorArray:null,
      addCircleRange:null,
      activeColorArray:null,
      score:null,
      mengMenu:null,
      ctor:function (stagenum) {
          this._super();
         // cc.log(stagenum);

          this.circleSprites1 = [];//圆圈的数字，方便删除
          this.circleSprites2 = [];
          this.circleSprites3 = [];
          this.circleSprites4 = [];
          this.thingSprites=[];//小物件的数组
          this.gamelevel=4;//游戏难度 初始几个圈
          this.level=4;//显示多少个圆
          this.defultColorArrary=[cc.color(226, 39, 105, 255),cc.color(255, 112, 112, 255),cc.color(255, 192, 189, 255),cc.color(255, 236, 228, 255),cc.color(234, 219, 133, 255),];//默认色值数组
          this.circleRadiusArray=[0,0,0,0];//每个圆圈的半径
          this.circleColorArray=[0,1,2,3];//每个圈色值
          this.sweetWidth=100;//元素的宽度
          this.nowCircleLevel=-1;//现在显示哪个环
          this.circleradius=10;//目前自增环的半径
          this.colorBlockArray=[];//左上角预告色块
          this.hasColorArray=[];//现有各颜色数量
          this.activeColorArray=[0,1,2,3];//现在使用的颜色
          this.score=0;
          this.addCircleRange=4;//圆环变大频路
          var timecount=0.01;//刷新频率

          cc.spriteFrameCache.addSpriteFrames(res.ani1_plist);
          cc.spriteFrameCache.addSpriteFrames(res.ani2_plist);


          var size = cc.winSize;
          var _this=this;
          var firstload=true;
          // add bg
          this.bgSprite = new cc.Sprite(res.game_bg);
          this.bgSprite.attr({
              x: size.width / 2,
              y: size.height / 2,
              //scale: 0.5,
              //rotation: 180
          });
          this.bgSprite.setScaleX(size.width/this.bgSprite.getContentSize().width);
          this.bgSprite.setScaleY(size.height/this.bgSprite.getContentSize().height);
          this.addChild(this.bgSprite, 0);

          var backBtn = new cc.MenuItemImage(
            res.ui_back,
            res.ui_back,
            function () {
              cc.director.runScene( new StageScene());
            }, this);
          backBtn.attr({
             x: 670,
             y: 90,
             anchorX: 0.5,
             anchorY: 0.5
          });
          backBtn.setScaleX(150/backBtn.getContentSize().width);
          backBtn.setScaleY(150/backBtn.getContentSize().height);
          var backMenu = new cc.Menu(backBtn);
          backMenu.x = 0;
          backMenu.y = 0;
          this.addChild(backMenu, 15);

          var steep_bg = new cc.Sprite(res.ui_steep_bg);
          steep_bg.attr({
             x: 650,
             y: 1150,
          });
          this.addChild(steep_bg, 15);


          this.scoreLabel = new cc.LabelTTF("0", "Arial", 70);
          this.scoreLabel.attr({
              x:636,
              y:1236,
              rotation: 90
          });
          this.scoreLabel.setFontFillColor(cc.color(226, 39, 107, 255)); 
          this.addChild(this.scoreLabel, 35);

          // var x = thing.width/2+size.width/2*cc.random0To1();
          // var y = 100+size.height/2*cc.random0To1();

          //x坐标(0,750),y坐标(0,1334),颜色(0,3)
          // this.addThing(440,950,0);
          // //this.addThing(700,150,0);
          // this.addThing(150,800,1);
          // //this.addThing(600,1100,1);
          // this.addThing(550,450,2);
          // //this.addThing(100,80,2);
          // this.addThing(250,300,3);
          // this.addThing(350,650,3);

          // //各颜色数量
          // this.hasColorArray=[1,1,1,2];
          switch(stagenum)
          {
          case 0:
            this.addThing(375,1100,0);

            this.addThing(375,950,1); 
            this.addThing(375,800,2);

            this.addThing(225,950,3); 
            this.addThing(225,800,1);
            this.addThing(225,650,2);

            this.addThing(525,950,3); 
            this.addThing(525,800,1);
            this.addThing(525,650,2);

            this.addThing(675,800,2); 
            this.addThing(675,650,3);
            this.addThing(675,500,0);

            this.addThing(75,800,2); 
            this.addThing(75,650,3);
            this.addThing(75, 500, 0);

            this.addThing(350, 250, 0);
            this.addThing(450, 300, 1);
            this.addThing(330, 350, 2);
            this.addThing(425, 400, 3);

            this.hasColorArray=[4,4,6,5];


            // var first_meng = new cc.MenuItemImage(
            //   res.first_meng,
            //   res.first_meng,
            //   function () {
            //     this.mengMenu.setZOrder(0);
            //     // this.mengMenu.removeFromParent();
            //     this.removeChild(this.mengMenu); 
            //     this.mengMenu=undefined;

            //     cc.log(this.mengMenu);
            //   }, this);
            // first_meng.attr({
            //    x:size.width*0.5,
            //    y:size.height*0.5
            // });
            // mengMenu = new cc.Menu(first_meng);
            // mengMenu.x = 0;
            // mengMenu.y = 0;
            // this.addChild(mengMenu, 150);


            break;
          case 1:
            this.addThing(275, 800, 2);
            this.addThing(275, 1100, 2);
            this.addThing(275, 1000, 2);
            this.addThing(275, 900, 2);
   
            this.addThing(175, 850, 2);
            this.addThing(175, 1050, 2);
            this.addThing(175, 950, 2);

            this.addThing(475, 800, 1);
            this.addThing(475, 1100, 1);
            this.addThing(475, 1000, 1);
            this.addThing(475, 900, 1);

            this.addThing(575, 850, 1);
            this.addThing(575, 1050, 1);
            this.addThing(575, 950, 1);

            this.addThing(275, 530, 0);
            this.addThing(275, 230, 0);
            this.addThing(275, 330, 0);
            this.addThing(275, 430, 0);

            this.addThing(175, 480, 0);
            this.addThing(175, 280, 0);
            this.addThing(175, 380, 0);

            this.addThing(475, 530, 3);
            this.addThing(475, 230, 3);
            this.addThing(475, 330, 3);
            this.addThing(475, 430, 3);

            this.addThing(575, 480, 3);
            this.addThing(575, 280, 3);
            this.addThing(575, 380, 3);

            this.hasColorArray=[7,7,7,7];
            break;
            case 2:
            this.addThing(385, 900, 0); //1
            this.addThing(490, 950, 1);//2
            this.addThing(550, 1060, 2);//3
            this.addThing(485, 1160, 1);//4
            this.addThing(375, 1200, 3);//5
            this.addThing(270, 1160, 1);//6
            this.addThing(185, 1060, 2);//7
            this.addThing(200, 950, 1);//8
            this.addThing(230, 835, 2);//9
            this.addThing(290, 735, 2);//10

            this.addThing(375, 665, 3);//11

            this.addThing(460, 595, 2); //12
            this.addThing(525, 495, 2);//13
            this.addThing(565, 375, 1);//14
            this.addThing(570, 260, 2);//15
            this.addThing(490, 160, 1);//16
            this.addThing(375, 100, 3);//17
            this.addThing(260, 160, 1);//18
            this.addThing(185, 260, 2);//19
            this.addThing(250, 370, 1);//20
            this.addThing(360, 425, 0);//21

            this.hasColorArray = [2, 8, 8, 3];
            break;
            case 3:
            this.addThing(150, 100, 0);
            this.addThing(150, 375, 2);
            this.addThing(150, 650, 1);
            this.addThing(150, 925, 2);
            this.addThing(150, 1200, 0);

            this.addThing(600, 100, 0);
            this.addThing(600, 375, 2);
            this.addThing(600, 650, 1);
            this.addThing(600, 925, 2);
            this.addThing(600, 1200, 0);

            this.addThing(300, 100, 1);
            this.addThing(450, 100, 2);
            this.addThing(300, 1200, 2);
            this.addThing(450, 1200, 1);

            this.addThing(375, 650, 3);
            this.hasColorArray = [4, 4, 6, 1];
            break;
            case 4:
              this.addThing(150, 466, 1);
              this.addThing(150, 832, 1);

              this.addThing(250, 350, 1);
              this.addThing(250, 948, 1);
              this.addThing(250, 470, 1);
              this.addThing(250, 590, 1);
              this.addThing(250, 710, 1);

              this.addThing(350, 200, 2);
              this.addThing(350, 1100, 2);
              this.addThing(450, 100, 2);
              this.addThing(450, 1200, 2);
              this.addThing(550, 200, 2);
              this.addThing(550, 1100, 2);
              this.addThing(650, 300, 2);
              this.addThing(650, 1000, 2);
              this.addThing(650, 475, 2);
              this.addThing(650, 650, 2);
              this.addThing(650, 825, 2);

              this.addThing(400, 466, 0);
              this.addThing(400, 832, 0);
              this.addThing(500, 665, 3);
              this.hasColorArray = [2, 7, 11, 1];
            
            break;
            case 5:
              this.addThing(100, 120, 0);
              this.addThing(100, 240, 1);
              this.addThing(100, 360, 2);
              this.addThing(100, 480, 3);
              this.addThing(100, 600, 2);
              this.addThing(100, 720, 1);
              this.addThing(100, 840, 0);
              this.addThing(100, 960, 1);
              this.addThing(100, 1080, 2);
              this.addThing(100, 1200, 3);

              this.addThing(220, 120, 2);
              this.addThing(220, 240, 1);
              this.addThing(220, 360, 0);
              this.addThing(220, 480, 1);
              this.addThing(220, 600, 2);
              this.addThing(220, 720, 3);
              this.addThing(220, 840, 2);
              this.addThing(220, 960, 1);
              this.addThing(220, 1080, 0);
              this.addThing(220, 1200, 1);

              this.addThing(340, 120, 1);
              this.addThing(340, 240, 2);
              this.addThing(340, 360, 3);
              this.addThing(340, 480, 2);
              this.addThing(340, 600, 1);
              this.addThing(340, 720, 0);
              this.addThing(340, 840, 1);
              this.addThing(340, 960, 2);
              this.addThing(340, 1080, 3);
              this.addThing(340, 1200, 2);

              this.addThing(460, 120, 3);
              this.addThing(460, 240, 2);
              this.addThing(460, 360, 1);
              this.addThing(460, 480, 0);
              this.addThing(460, 600, 1);
              this.addThing(460, 720, 2);
              this.addThing(460, 840, 3);
              this.addThing(460, 960, 2);
              this.addThing(460, 1080, 1);
              this.addThing(460, 1200, 0);

              this.addThing(580, 120, 0);
              this.addThing(580, 240, 1);
              this.addThing(580, 360, 2);
              this.addThing(580, 480, 3);
              this.addThing(580, 600, 2);
              this.addThing(580, 720, 1);
              this.addThing(580, 840, 0);
              this.addThing(580, 960, 1);
              this.addThing(580, 1080, 2);
              this.addThing(580, 1200, 3);

              this.hasColorArray = [9, 16, 16, 9];
            
            break;
          default:
          }

          
          // cc.log(this.thingSprites[0]._color);
          // cc.log(this.thingSprites.length);
          // var sweetanti = cc.sequence(this.sharkAction(0), cc.delayTime(cc.random0To1()), this.sharkAction(0));
          //   var sweet_ever = sweetanti.repeatForever();
          //   this.thingSprites[0].runAction(sweet_ever);

          for (var i = 0; i < this.thingSprites.length; i++) {
            // cc.log(this.thingSprites[i]._color);
            var sweetanti = cc.sequence(this.sharkAction(this.thingSprites[i]._color), cc.delayTime(cc.random0To1()*15), this.sharkAction(this.thingSprites[i]._color));
            var sweet_ever = sweetanti.repeatForever();
            this.thingSprites[i].runAction(sweet_ever);
          };


          // function randomSort(a, b) { return Math.random() > 0.5 ? -1 : 1; }
          // //_this.circleColorArray=_this.circleColorArray.sort(randomSort);
          _this.showColorBlock();
          cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (_this.nowCircleLevel==_this.level ||_this.circleradius>400) {
                 
                };

                if (_this.nowCircleLevel>=0) {
                  //alert("不能点两次！");
                  return false;
                };

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    _this.touchx=event._touches[0]._point.x;
                    _this.touchy=event._touches[0]._point.y;
                    _this.nowCircleLevel=0;
                    _this.score+=1;
                    _this.scoreLabel.setString(_this.score);

                    _this.schedule(_this.update,timecount,1000,0);
                    
                    return true;
                }
                return false;
              },
              onTouchMoved: function (touch, event) {
              },
              onTouchEnded: function (touch, event) {
              }
      }, this);
          return true;
      }, 

      NewCircle:function(){
        var _this=this;

        _this.nowCircleLevel=-1;
        _this.circleRadiusArray=[0,0,0,0];
        _this.circleradius=10;
        for (var i = 0; i < _this.thingSprites.length; i++) {
          if (_this.thingSprites[i].cache) {
            this.addThing(_this.thingSprites[i].x,_this.thingSprites[i].y,_this.thingSprites[i]._color,false);
          };
        }

        var tmpthingarr=[];
        for (var i = 0; i < _this.thingSprites.length; i++) {
          if (_this.thingSprites[i].cache) {
            this.thingSprites[i].removeFromParent();
            this.thingSprites[i] = undefined;
            //this.thingSprites.splice(i,1);
          }else{
            tmpthingarr.push(this.thingSprites[i]);
          }
        }
         this.thingSprites=tmpthingarr;

          for (var i = 0; i < this.thingSprites.length; i++) {
            // cc.log(this.thingSprites[i]._color);
            var sweetanti = cc.sequence(this.sharkAction(this.thingSprites[i]._color), cc.delayTime(cc.random0To1()*15), this.sharkAction(this.thingSprites[i]._color));
            var sweet_ever = sweetanti.repeatForever();
            this.thingSprites[i].stopAllActions();
            this.thingSprites[i].runAction(sweet_ever);
          };
      },

      addCircle : function(circleteam,radius,posx,posy,colors) {
        var _this=this;
        var size = cc.winSize;
        var draw = new cc.DrawNode();                 //创建drawnode对象
        this.addChild(draw, 10+colors,'circle1');
        var centerPos = cc.p(posx, posy);
        draw.drawCircle(cc.p(posx, posy), radius, 0, 40, false, 35, _this.defultColorArrary[_this.circleColorArray[colors]]);
        //draw.drawDot(cc.p(posx, posy),radius,_this.defultColorArrary[colors]);
        circleteam.push(draw);
        circleteam[0].clear();
        if (circleteam.length>1) {
          
          circleteam[0].removeFromParent();
          circleteam[0] = undefined;
          circleteam.splice(0,1);
        };
      },

      removeCircle : function() {

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

      showColorBlock:function(){
        var size = cc.winSize;
        // this.circleColorArray=[0,1,2,3];//每个圈色值
        for (var i = 0; i < this.circleColorArray.length; i++) {
          var block = new cc.Sprite(res["ui_color"+this.circleColorArray[i]]);
          block.attr({
            x: 694,
            y:(size.height-340+i*46),
            _color:this.circleColorArray[i],
          });
          block.setAnchorPoint(0.5,0.5);
          block.setScaleX(40/block.getContentSize().width);
          block.setScaleY(40/block.getContentSize().height);
          this.addChild(block,20);
          this.colorBlockArray.push(block);
        };
      },

      update : function() {
        var addcir=this.addCircleRange;
        this.circleradius+=addcir;
        var size = cc.winSize;
        var posx=this.touchx;
        var posy=this.touchy;

        if ((this.circleradius-10)==addcir*18) {
          cc.audioEngine.playEffect( "res/sound/wave0.mp3", false ) ;
        };
        if ((this.circleradius-10)==addcir*36 &&this.level>1) {
          cc.audioEngine.playEffect( "res/sound/wave1.mp3", false ) ;
        };
        if ((this.circleradius-10)==addcir*54&&this.level>2) {
          cc.audioEngine.playEffect( "res/sound/wave2.mp3", false ) ;
        };
        if ((this.circleradius-10)==addcir*72&&this.level>3) {
          cc.audioEngine.playEffect( "res/sound/wave3.mp3", false ) ;
        };

        for (var i = 0; i < this.level; i++) {
          // var circleteam=this.circleSprites1;
          if(this.circleradius>(i)*72 && i>=this.nowCircleLevel){
            var circleteam=this["circleSprites"+(i+1)];
            var colors=i;
            this.circleRadiusArray[i]+=addcir;
            //var _circleradius=Math.floor(this.circleradius*((this.level+1-i)/this.level));
            if (this.colorBlockArray[i]) {
              this.colorBlockArray[i].removeFromParent();
              this.colorBlockArray[i] = undefined;
            };

            this.addCircle(circleteam,this.circleRadiusArray[i],posx,posy,colors);
          }
        };
        if (this.circleradius>1000) {
          for (var i = 0; i < 4; i++) {
            this["circleSprites"+i][0].removeFromParent();
            this["circleSprites"+i][0] = undefined;
            this["circleSprites"+i]=[];
          };
         
          this.reSetCircle();
        };
        this.checkGame();
      },
     
      checkGame:function(){
        var _this=this;
        var size = cc.winSize;
       
        for (var i = 0; i < this.thingSprites.length; i++) {
          var circlerang1=Math.sqrt((this.touchx-this.thingSprites[i].x)*(this.touchx-this.thingSprites[i].x)+(this.touchy-this.thingSprites[i].y)*(this.touchy-this.thingSprites[i].y));
      
          if ((this.circleRadiusArray[this.nowCircleLevel])>(circlerang1-this.sweetWidth/2)) {
           //cc.log('peng~~item~',this.thingSprites[i]._color,'~cir~',this.circleColorArray[this.nowCircleLevel]);
            
            if (this.thingSprites[i]._color==this.circleColorArray[this.nowCircleLevel] && !this.thingSprites[i].cache) {
               cc.audioEngine.playEffect( "res/sound/yoyo_die"+this.thingSprites[i]._color+".mp3", false ) ;
              this.hasColorArray[this.thingSprites[i]._color]--;
              this.thingSprites[i].removeFromParent();
              this.thingSprites[i] = undefined;
              this.thingSprites.splice(i,1);
              i--;
             
              //cc.log('yes');
              //cc.log(this.hasColorArray);
             
            }else if(!this.thingSprites[i].cache){

              this.thingSprites[i].opacity = 180;
              var posx = 100+(size.width-200)*cc.random0To1();
              var posy = 150+(size.height-100)*cc.random0To1();

              this.addThing(posx,posy,this.circleColorArray[this.nowCircleLevel],true);
              this.hasColorArray[this.circleColorArray[this.nowCircleLevel]]++;
              //cc.log('no');
              //cc.log(this.hasColorArray);
              cc.audioEngine.playEffect( "res/sound/match_wrong.mp3", false ) ;
            };
            if ( this["circleSprites"+(this.nowCircleLevel+1)].length>0) {
              this["circleSprites"+(this.nowCircleLevel+1)][0].removeFromParent();
              this["circleSprites"+(this.nowCircleLevel+1)][0] = undefined;
            };
              this["circleSprites"+(this.nowCircleLevel+1)]=[];
              this.nowCircleLevel++;

            //cc.log("yes~~");
            // if(this.nowCircleLevel==this.level)
            if (this.nowCircleLevel==this.level) {
              _this.reSetCircle();
             
            };
            //cc.log("touch x ~",_this.touchx,_this.thingSprites[0].x,"~touch y ~",_this.touchy,_this.thingSprites[0].y,'~width~',_this.thingSprites[0].width);
            //cc.log(circlerang1,this.circleradius);
            //cc.log(this.circleRadiusArray);
            // alert("yes!");
            //cc.log('new has');
            //cc.log(this.hasColorArray);
          };
        }
        
      },
      reSetCircle:function(){
       
        //this.circleColorArray.sort();
        //清除左上角
        //if (this.colorBlockArray.length>0) {
          for (var i = 0; i < this.colorBlockArray.length; i++) {
            if (this.colorBlockArray[i]) {
              this.colorBlockArray[i].removeFromParent();
              this.colorBlockArray[i] = undefined;
            };
          };
          this.colorBlockArray=[];
        //};
        
        // activeColorArray
        var _this=this;
        var tmparr=[];
        for (var i = 0; i < this.hasColorArray.length; i++) {
          if (this.hasColorArray[i]<=0) {
           // this.circleColorArray.splice(i, 1);
          }else if(this.hasColorArray[i]){
            tmparr.push(i);
          };
        };
        this.activeColorArray=tmparr;
        //cc.log('clean color');
        //cc.log(this.hasColorArray);

        var rands=1+9*cc.random0To1();
        var tmplevel=1;
        if (rands<=2) {
          tmplevel=4;
        }else if (rands<=7) {
          tmplevel=3;
        }else if (rands<=9) {
          tmplevel=2;
        };
        //cc.log(rands,tmplevel);
        this.level=tmplevel;
        var nowcolorcount=this.activeColorArray.length;
        this.circleColorArray=[];
        for (var i = 0; i < tmplevel; i++) {
          var ttt=0+(nowcolorcount)*cc.random0To1();
          var tt=parseInt(ttt);
          var tmpcolor=this.activeColorArray[tt];
          //cc.log("color~",nowcolorcount,ttt,tt,tmpcolor);
          this.circleColorArray.push(tmpcolor);
        };

        _this.NewCircle();
        this.unschedule(this.update);
        // cc.log('has');
        // cc.log(this.hasColorArray);
        // cc.log('act');
        // cc.log(this.activeColorArray);
        // cc.log('cir col');
        // cc.log(this.circleColorArray);

        if (this.activeColorArray.length==0) {
          _this.winGame();
          return false;
        };
        // function randomSort(a, b) { return Math.random() > 0.5 ? -1 : 1; }
        // _this.circleColorArray=_this.circleColorArray.sort(randomSort);
        _this.showColorBlock();
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
      sharkAction : function(item) {
        var frames = [];
        var num=0;
         switch(item)
          {
            case 0:
              num=5;
              break;
            case 1:
              num=8;
              break;
            case 2:
              num=5;
              break;
            case 3:
              num=10;
              break;
          }
        for (var i = 1; i <= num; i++) {
            var str = "a"+(item+1)+"_idle_"+i+".png"
            //cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.1);
        var action = new cc.Animate(animation);

        return action;
    }
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

      // onEnter:function (data) {
      //     this._super();
      //     var layer = new PlayLayer(data);
      //     this.addChild(layer);
      // }
  });

//   var action = cc.RotateTo.create(0.5, 90);
// action.repeat(5);
// action.speed(0.5);