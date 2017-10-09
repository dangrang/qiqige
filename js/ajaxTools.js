
//功能：ajax请求
//参数：
//请求方式
//请求的地址
//请求参数
//是否同步
//回调函数。

function ajax1705(method,url,data,isAsync,func){
	//1）、创建对象
	let xhr = new XMLHttpRequest();
	//2）、准备工作
	let urlAndData = url;
	if(method.toLowerCase()=="get"){
		urlAndData +="?"+data;
	}
	xhr.open(method,urlAndData,isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			func(xhr.responseText);
		}
	}
	//3）、发送
	if(method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(data);
	}else{
		xhr.send();
	}
}

//method,url,data,isAsync,func
function ajax1705ByJSON(obj){
	//1）、创建对象
	let xhr = new XMLHttpRequest();
	//2）、准备工作
	let urlAndData = obj.url;
	if(obj.method.toLowerCase()=="get" && obj.data!=null){
		urlAndData +="?"+obj.data;
	}
	xhr.open(obj.method,urlAndData,obj.isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			obj.func(xhr.responseText);
		}
	}
	//3）、发送
	if(obj.method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(obj.data);
	}else{
		xhr.send();
	}
}


function ajax1705ByJSONAndDefault(obj){
	let defaultObj = {
		"method":"get",
		"url":"#",//
		"data":null,
		"isAsync":true,
		"func":null
	};
	
	for(var key in obj){
		defaultObj[key] = obj[key];
	}
	
	//1）、创建对象
	let xhr = new XMLHttpRequest();
	//2）、准备工作
	let urlAndData = defaultObj.url;
	if(defaultObj.method.toLowerCase()=="get" && defaultObj.data!=null){
		urlAndData +="?"+defaultObj.data;
	}
	xhr.open(defaultObj.method,urlAndData,defaultObj.isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			defaultObj.func(xhr.responseText);
		}
	}
	//3）、发送
	if(defaultObj.method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(defaultObj.data);
	}else{
		xhr.send();
	}
}


function ajax1705ByJSONAndDefault02(obj){
	let defaultObj = {
		"method":"get",
		"url":"#",//
		"data":null,
		"isAsync":true,
		"dataType":"string",//返回的数据类型。
		"func":null
	};
	
	for(var key in obj){
		defaultObj[key] = obj[key];
	}
	
	//1）、创建对象
	let xhr = new XMLHttpRequest();
	//2）、准备工作
	let urlAndData = defaultObj.url;
	if(defaultObj.method.toLowerCase()=="get" && defaultObj.data!=null){
		urlAndData +="?"+defaultObj.data;
	}
	xhr.open(defaultObj.method,urlAndData,defaultObj.isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			if(defaultObj.dataType=="json"){
				defaultObj.func(JSON.parse(xhr.responseText));
			}else if(defaultObj.dataType=="string"){
				defaultObj.func(xhr.responseText);
			}
		}
	}
	//3）、发送
	if(defaultObj.method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(defaultObj.data);
	}else{
		xhr.send();
	}
}

function ajax1705ByPromise(obj){
	let defaultObj = {
		"method":"get",
		"url":"#",//
		"data":null,
		"isAsync":true,
		"dataType":"string",//返回的数据类型。
		"func":null
	};
	
	for(var key in obj){
		defaultObj[key] = obj[key];
	}
	
	var p = new Promise(function(resolve,reject){
				//1）、创建对象
				let xhr = new XMLHttpRequest();
				//2）、准备工作
				let urlAndData = defaultObj.url;
				if(defaultObj.method.toLowerCase()=="get" && defaultObj.data!=null){
					urlAndData +="?"+defaultObj.data;
				}
				xhr.open(defaultObj.method,urlAndData,defaultObj.isAsync);
				xhr.onreadystatechange = function(){
					if(xhr.readyState==4){
						if(xhr.status==200){
							if(defaultObj.dataType=="json"){
								resolve(JSON.parse(xhr.responseText));
							}else if(defaultObj.dataType=="string"){
								resolve(xhr.responseText);
							}						
							return;
						}
						reject();
					}
				}
				//3）、发送
				if(defaultObj.method.toLowerCase()=="post"){
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xhr.send(defaultObj.data);
				}else{
					xhr.send();
				}
	});
	
	return p;
}


