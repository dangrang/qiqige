
//ajax的插件
function jQuery(){
	
}

//发送请求的参数处理
jQuery.prototype.getObj=function(obj){
	let defaultObj = {
		url:"#",
		sendData:{},
		successFunc:null,
		failFunc:null,
		isAsync:true,
		dataType:"string"
	}
	for(let key in obj){
		defaultObj[key]=obj[key];
	}
	return defaultObj;
}

//请求的地址
//请求参数，json格式
//成功时的回调函数
//失败时的回调函数
//是否异步
//返回的数据类型（json，str等等）；

jQuery.prototype.get=function(obj){
	let defaultObj = this.getObj(obj);
	let xhr = new XMLHttpRequest();	
	//先拼接请求参数的字符串；
	let sendStr="";
	for(let key in defaultObj.sendData){
		sendStr+=key+"="+defaultObj.sendData[key]+"&";
	}
	sendStr = sendStr.substring(0,sendStr.length-1);
	
	let urlAndSendStr=url;
	if(sendStr.length>0){
		urlAndSendStr +="?"+sendStr;
	}
	xhr.open("GET",urlAndSendStr,defaultObj.isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				let data;
				switch(defaultObj.dataType){
					case "json":data = JSON.parse(xhr.responseText);break;
					case "string":data = xhr.responseText;break;
					default:;
				}
				if(defaultObj.successFunc!=null){
					defaultObj.successFunc(data);
				}
				return;				
			}
		}
		if(defaultObj.failFunc!=null){
			defaultObj.failFunc(xhr.status);
		}
	}
	xhr.send();
}

jQuery.prototype.post=function(obj){
	let defaultObj = this.getObj(obj);
	
	let xhr = new XMLHttpRequest();	
	xhr.open("POST",url,defaultObj.isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				let data;
				switch(defaultObj.dataType){
					case "json":data = JSON.parse(xhr.responseText);break;
					case "string":data = xhr.responseText;break;
					default:;
				}
				if(defaultObj.successFunc!=null){
					defaultObj.successFunc(data);
				}
				return;				
			}
		}
		if(defaultObj.failFunc!=null){
			defaultObj.failFunc(xhr.status);
		}
	}
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//先拼接请求参数的字符串；
	let sendStr="";
	for(let key in defaultObj.sendData){
		sendStr+=key+"="+defaultObj.sendData[key]+"&";
	}
	sendStr = sendStr.substring(0,sendStr.length-1);
	xhr.send(sendStr);
}

jQuery.prototype.getJSON=function(obj){
	obj.dataType = "json";
	this.get(obj);
}