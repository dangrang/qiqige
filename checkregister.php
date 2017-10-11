<?php
	header("content-type:text/html;charset=utf-8");
	//接受客户传来的数据
	$phone = $_POST['phone'];
	$pass = $_POST['userPass'];
	$userName = $_POST['userName'];
	//处理
	//1、连接数据库服务器
	 $con= mysql_connect("localhost","root","root");
	 	if(!$con){
	 		echo"-1";
	 	}else{
	 	//2、选择数据库
	 		mysql_select_db("qiqigedb",$con);
	 	//3、执行SQL语句
//	 		$sqlStr = "insert into userregister(userId,userPass,userName) values('".$phone."','".$pass."','".$userName."')";
	 		$sqlStr="select * from userregister where userId='".$userId."' and userPass='".$userPass."'";
	 		$t = mysql_query($sqlStr,$con);
	 	//4、关闭数据库	
	 		mysql_close($con);
	 		echo $t;
	 	}
	 	if($t==1){
	 		echo"1";
	 	}else{
	 		echo"0";
	 	}
	
?>