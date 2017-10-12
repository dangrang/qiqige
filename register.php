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
	 		echo"注册失败！服务器异常，请稍后再试...";
	 	}else{
	 	//2、选择数据库
	 		mysql_select_db("qiqigedb",$con);
	 	//3、执行SQL语句
	 		$sqlStr="select * from userregister where userId='".$phone."' and userPass='".$pass."'and userName='".$userName."'";
	 		$result = mysql_query($sqlStr,$con);
			 	if(mysql_num_rows($result)!=1){
					$sqlStr1 = "insert into userregister(userId,userPass,userName) values('".$phone."','".$pass."','".$userName."')";
			 		$t = mysql_query($sqlStr1,$con);
				}else{
					echo "0";
				}
	 		
	 	//4、关闭数据库	
	 		mysql_close($con);
	 		
//	 		echo $t;
	 	}
	 	
		 	if($t==1){
		 		echo"1";
		 	}else{
		 		echo"0";
		 	}
	
?>
