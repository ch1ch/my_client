<?php
	header("Content-Type:text/html;charset=utf-8");
	require "js/dbb.php";
	$name=$_POST['name'];
	$id=$_POST['id'];
	$addtime = time();
	$openid=$_COOKIE["openid"];
	// echo("<script>console.log('连接成功');</script>");
	date_default_timezone_set("Asia/Shanghai");
    $times=date("dhi");
    $sn=$times.substr($openid, 6, 8);


	$sql = "INSERT INTO `user` ( `name`, `presonid`, `time`, `openid`, `sn`) VALUES ( '$name', '$id', '$addtime','$openid','$sn');";
    $conn->exec($sql);


	$stmt = $conn->query("SELECT LAST_INSERT_ID()");
	$lastId = $stmt->fetch(PDO::FETCH_NUM);
	$lastId = $lastId[0];
	setcookie("userid",$lastId);
	//echo ("<script>console.log('".$lastId."');</script>");


	setcookie("luckyy",'0');
	$sql2 = "UPDATE `user` SET `bonus` = '0' WHERE `user`.`id` = $lastId;";


	// $luckynum=99999999;
	// if ($lastId%$luckynum==0) {
	// 	setcookie("luckyy",'1');
	// 	$randd=mt_rand(1,3);
	// 	setcookie("lucknum",$randd);
	// 	$sql2 = "UPDATE `user` SET `bonus` = '1' WHERE `user`.`id` = $lastId;";
	// }else{
	// 	setcookie("luckyy",'0');
	// 	$sql2 = "UPDATE `user` SET `bonus` = '0' WHERE `user`.`id` = $lastId;";
	// }

	
    $conn->exec($sql2);
	

  /*  $sql1 = "SELECT LAST_INSERT_ID()";
    $sth = $conn->query($sql1);
    $row = $sth->fetch();
    echo ("<script>console.log('".$row['id']."');</script>");*/

?>