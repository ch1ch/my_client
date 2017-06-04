 var PaiSprite = cc.Sprite.extend({
 	disappearAction:null,//消失动画
 	paitype:null,
    onEnter:function () {
         //cc.log("onEnter");
        this._super();
        this.addTouchEventListenser();
        this.disappearAction = this.createDisappearAction();
    	this.disappearAction.retain();

     },

     onExit:function () {
        // cc.log("onExit");
        this.disappearAction.release();
        this._super();
     },

    addTouchEventListenser:function(){
        cc.eventManager.addListener({
		    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		    onTouchBegan: function (touch, event) {
	            var target = event.getCurrentTarget();

	            var locationInNode = target.convertToNodeSpace(touch.getLocation());
	            var s = target.getContentSize();
	            var rect = cc.rect(0, 0, s.width, s.height);

	            if (cc.rectContainsPoint(rect, locationInNode)) {
	                //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
	                target.stopAllActions();
	                var ac = target.disappearAction;
                    var seqAc = cc.Sequence.create( ac, cc.CallFunc.create(function () {
                        //target.removeFromParent();
                        target.callback(target.num,target.paitype);
                    },target) );
                    if (window.isPlay) {
	    				target.runAction(seqAc);
	    				window.isPlay=false;
                    };
	                target.opacity = 180;
	                return true;
	            }
	            return false;
	        },
	         onTouchMoved: function (touch, event) {
	            // var target = event.getCurrentTarget();
	            // var delta = touch.getDelta();
	            // target.x += delta.x;
	            // target.y += delta.y;
	        },
	        onTouchEnded: function (touch, event) {
	            var target = event.getCurrentTarget();
	           // cc.log("sprite onTouchesEnded.. ");
	            target.opacity = 255;
	        }
    	}, this);
 	},
 	createDisappearAction : function() {
	    var frames = [];
	    for (var i = 0; i < 11; i++) {
	        var str = "sushi_1n_"+i+".png"
	        //cc.log(str);
	        var frame = cc.spriteFrameCache.getSpriteFrame(str);
	        frames.push(frame);
	    }

	    var animation = new cc.Animation(frames, 0.02);
	    var action = new cc.Animate(animation);

	    return action;
	},

 });
