
function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="@"){
		return document.getElementsByName(str.substring(1));
	}
}

function $create(str){
	return document.createElement(str);
}