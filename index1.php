<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxbb575a2aa9f43050", "87f498e224ffdc3c884b389e28f26315");
$signPackage = $jssdk->GetSignPackage();
?>
<?php
    $appid = "wxbb575a2aa9f43050";  
    $secret = "87f498e224ffdc3c884b389e28f26315";  
    if (!isset($_GET["code"])){
     // echo("请用微信打开！");
      setcookie("iswx", '0');
    }else{
       setcookie("iswx", '1');
    }
    $code = $_GET["code"];
    //使用code获取access_token
    $oauth2Url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$secret&code=$code&grant_type=authorization_code";
     //echo "<script language=\"JavaScript\">alert(\"".$oauth2Url."\");</script>"; 
    //echo $oauth2Url;
    $oauth2 = getJson($oauth2Url);
    //echo "<script language=\"JavaScript\">alert(\"". $oauth2['openid']."\");</script>"; 
    $openid = $oauth2['openid'];
   
    $token = $oauth2['access_token'];
    $openid = $oauth2['openid'];
    // //使用token 和openid获取用户信息
    $userUrl="https://api.weixin.qq.com/sns/userinfo?access_token=$token&openid=$openid&lang=zh_CN";
    $userInfo = getJson($userUrl);
    //echo $userInfo;
    echo '关注的用户名：'.$userInfo['nickname'];
    echo '头像:  '.$userInfo['headimgurl'];
    echo '<br>openid:  '.$userInfo['openid'];
     setcookie("openid", $openid);
     setcookie("headimgurl", $userInfo['headimgurl']);
     setcookie("nickname",$userInfo['nickname']);

    // $openid="abcde1234567890";
    // setcookie("openid", $openid);
    header("Content-Type:text/html;charset=utf-8");
      
    
   
    function getJson($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>河北聚友</title>
    <link rel="icon" type="image/GIF" href="res/favicon.ico"/>

    <meta name="viewport"
        content="width=device-width,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1,target-densitydpi=device-dpi"/>

    <!--https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html-->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">

    <!-- force webkit on 360 -->
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <!-- force edge on IE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="msapplication-tap-highlight" content="no">

    <!-- force full screen on some browser -->
    <meta name="full-screen" content="yes"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>

    <!-- force screen orientation on some browser -->
    <!-- <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-orientation" content="portrait"> -->

    <meta name="browsermode" content="application">
    <meta name="x5-page-mode" content="app">

<style type="text/css">
html {
  -ms-touch-action: none;
}

body, canvas, div {
  margin: 0;
  padding: 0;
  outline: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  margin: 0;

  cursor: default;
  color: #888;
  background-color: #333;

  text-align: center;
  font-family: Helvetica, Verdana, Arial, sans-serif;

  display: flex;
  flex-direction: column;
}

#Cocos2dGameContainer {
  position: absolute;
  margin: 0;
  overflow: hidden;
  left: 0px;
  top: 0px;

  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}

canvas {
  background-color: rgba(0, 0, 0, 0);
}
</style>
</head>
<body>
<!-- <script src="res/loading.js"></script> -->
<canvas id="gameCanvas" width="480" height="720"></canvas>
<script>
    (function () {
        var nav = window.navigator;
        var ua = nav.userAgent.toLowerCase();
        var uaResult = /android (\d+(?:\.\d+)+)/i.exec(ua) || /android (\d+(?:\.\d+)+)/i.exec(nav.platform);
        if (uaResult) {
            var browserCheck = ua.match(/(qzone|micromessenger|qq)(mobile)?(browser)?\/?([\d.]+)/i);
            if (browserCheck) {
                var browserVersion = parseFloat(browserCheck[4] || 0);
                if (browserVersion < 6.2) {
                    var gameCanvas = document.getElementById("gameCanvas");
                    var ctx = gameCanvas.getContext('2d');
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, 1, 1);
                }
            }
        }
    })();
</script>
<!-- <script src="lib/jquery-1.10.1.min.js"></script> -->
<!-- <script src="cocos2d-js-v3.13.js"></script> -->
<script cocos src="game.min.js"></script>
</body>
</html>