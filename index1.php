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
    //echo '关注的用户名：'.$userInfo['nickname'];
    //echo '头像:  '.$userInfo['headimgurl'];
   // echo '<br>openid:  '.$userInfo['openid'];
     setcookie("openid", $openid);
     setcookie("headimgurl", $userInfo['headimgurl']);
     setcookie("nickname",$userInfo['nickname']);

    // $openid="abcde1234567890";
    // setcookie("openid", $openid);
    header("Content-Type:text/html;charset=utf-8");
    $url = "http://www.legendream.cn/maj2/index.html";  
    echo "<script type='text/javascript'>";  
    echo "window.location.href='$url'";  
    echo "</script>"; 
      
    
   
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

</head>
<body>
</body>
</html>
