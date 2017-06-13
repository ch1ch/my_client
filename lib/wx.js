console.log("getUserInfo");
console.log("本利保");
var app_id = "wx5e03e22ebe7d5ce8";
var app_secret = "e304bf2a63d44f62b20a214a03fbd94c";


var RSVP = require('rsvp');
//console.log("RSVP",RSVP);
function getURL (url){
	var promise = new RSVP.Promise(function(resolve, reject) {
	  // succeed 
	  var request=require("request");
	  request(url,function(err,res,body){
	  	if(err) reject(err);
	  	else	resolve(body);
	  })
	  // or reject 
	});
	return promise;
}
function getOuthToken(code){

	
	//console.log("农发贷");
	//var app_id = "wxdd2f29ae7d42c94d";
	//var app_secret = "3f0fa91400b1c9c700d51cceba77509c";

	//console.log("timestamp", timeStamp);

	//if (dataObj.timeStamp + 7200 < timeStamp) { //已经超时  需要重新获取
	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	url="https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
	//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code//获取认证token
	url += "&appid=" + app_id;
	url += "&secret=" + app_secret;
	url += "&code=" + code;

	return getURL(url);
}

function getUserInfo(result) {
	console.log("get User Info result");
	console.log(result);

	var data=JSON.parse(result);//

	var access_token=data.access_token;
	var openid=data.unionid;

	console.log("access_token",access_token);
	console.log("openid",openid);

	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	url="https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
	url="https://api.weixin.qq.com/sns/userinfo?lang=zh_CN";
	//https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
	//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code//获取认证token
	url += "&access_token=" + access_token;
	url += "&openid=" + openid;

	console.log("return a promise");
	return getURL(url);
}


function getUserInfoByAuth(code,cb){
	getOuthToken(code)	
	.then(getUserInfo)
	.then()
	.catch(function(){});
}

function main(){
	var code="001511dc7eabc5ce6b29ab9e928a485-";
	var code="021e8d65b0bd091e8f87de78dd931dep";
	var code="02160a10d88932d645c3510a72cbc46Y";
	//var fn=getUserInfoByAuth(code);
	//console.log(fn);

	getOuthToken(code)
	.then(getUserInfo)
	.then(function(){
		console.log(arguments);
	})
	.catch(function(error){
		console.log("error",error);
	});
}