<?php
	header("content-type:text/html;charset=utf-8");
	//接收到用户的输入
	$userId = $_POST["userId"];
	$userPass = $_POST["userPass"];
	//连接数据库的服务器
	$con= mysql_connect("localhost","root","root");
	if(!$con){
		echo "-1";
	}else{
		//选择数据库
		mysql_select_db("qiqigedb",$con);
		//查询内容
		$sqlStr="select * from userregister where userId='".$userId."' and userPass='".$userPass."'";
	   	$result=mysql_query($sqlStr,$con);
//	   	echo $sqlStr;
	   	mysql_close($con);
		
		//数据库中查询出结果，表示登录成功。
//		$test = mysql_num_rows($result);
		if(mysql_num_rows($result)==1){
			echo "1";
		}else{
			echo "0";
		}	
	}
	
?>

