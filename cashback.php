<!doctype html>
<?php
$orderid=$_GET['orderid'];  //1502606534446
$money=$_GET['money'];
$openid=$_GET['openid'];
$url='http://trans.palmf.cn/sdk/v1.0/payOrderResult/'.$orderid.'/0000001047';
$html = file_get_contents($url);
//echo $html;
$data=json_decode($html);
echo '订单编号：'.$data->mchntOrderNo.'<br>';
echo '充值金额：'.$data->amount.'<br>';
$status=$data->paySt;
 if ($status==0) {//0:待支付
    echo('订单状态：待支付');
  }else if ($status==1) {//1:支付中
    echo('订单状态：支付中');
  }else if ($status==2) {//2:支付成功
    echo('订单状态：支付成功');
  }else if ($status==3) {//3:支付失败
    echo('订单状态：支付失败');
  }else if ($status==4) {//4：已关闭
    echo('订单状态：已关闭');
  };
//$status=2;

$url1='http://www.legendream.cn:3010/api/cashstatus.api?orderid='.$orderid.'&money='.$money.'&status='.$status.'&openid='.$openid;
$html1 = file_get_contents($url1);
//echo $html1;


?>
<html lang="cn">
<head>
  <title>河北聚友</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="Content-Language" content="zh-CN" />
  <meta id="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="black" name="apple-mobile-web-app-status-bar-style">
  <meta content="telephone=no" name="format-detection">

  <meta name="keywords" content="河北聚友"/>
  <meta name="description" content="河北聚友"/>

</head>
<body>
  <div class="loading-box">
    <p class="orderid"></p>
    <p class="status"></p>
  </div> 

    
</body>
</html>