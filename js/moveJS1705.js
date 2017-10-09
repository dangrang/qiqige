
//匀速运动封装

//水平运动
//domObj:需要移动的DOM元素
//startValue, 起始位置
//endValue,结束位置
//inc,增量
//timeOut：总时长

function MoverH(domObj,startValue,endValue,inc,timeOut){
	var direction=-1
	if(endValue>startValue){
		direction=1;
	}
	moveObj(domObj,"left",startValue,endValue,inc,direction,timeOut);	
}

//垂直运动



//dom对象
//1、DOM元素的属性
//2、初始值
//3、增量
//4、方向
//5、结束值
//6、时间间隔

function moveObj(domObj,attr,startValue,endValue,inc,direction,timeOut){
	//1、初始化数据
	let timeSpace = timeOut/(Math.abs(startValue-endValue)/inc);
	let myTimer=null;
	let currValue = startValue;
	//2、初始化外观；
	domObj.style[attr] = startValue+"px";	
	
	(function(){
		if(myTimer!=null){
			window.clearInterval(myTimer);
			myTimer = null;
		}
		myTimer = setInterval(function(){
			currValue=currValue+direction*inc;
			//边界处理
			let isOut = startValue>endValue?currValue<endValue:currValue>endValue;
			if(isOut){
				window.clearInterval(myTimer);
				myTimer = null;
				console.log("moverH中清除定时器");
				return;
			}
			domObj.style[attr]= currValue+"px";			
			
		},timeSpace);
	})();
}


//把指定的图片淡入
function fadeIn(domObj,inc,timeOut){
	fadeInOut(domObj,0,1,inc,1,timeOut);	
}

//把指定的图片淡出
function fadeOut(domObj,inc,timeOut){
	fadeInOut(domObj,1,0,inc,-1,timeOut);
}

//淡入和淡出
function fadeInOut(domObj,startOpacity,endOpacity,inc,direction,timeOut){
	//当前的透明度
	let currOpacity=startOpacity;
	//时间间隔= 总时间/次数；
	let timeSpace=timeOut/(Math.abs(startOpacity-endOpacity)/inc);
	//dom对象的初始透明度
	domObj.style.opacity = startOpacity;
	
	let myTimer=null;
	//启动定时器
	(function moveObj(){
		myTimer = setInterval(function(){
					//1、改变当前透明度
					currOpacity = currOpacity+direction*inc;
					//2、边界处理
					//判断是否越界
					let isOut = startOpacity<endOpacity?currOpacity>endOpacity:currOpacity<endOpacity;
					if(isOut){
						currOpacity=endOpacity;
						window.clearInterval(myTimer);
						return;
					}		
					//3、改变外观	
					domObj.style.opacity = currOpacity;	
			
		},timeSpace);
	})();
}


/*
function fadeInOut(domObj,startOpacity,endOpacity,inc,direction,timeOut){
	//当前的透明度
	let currOpacity=startOpacity;
	//时间间隔= 总时间/次数；
	let timeSpace=timeOut/(Math.abs(startOpacity-endOpacity)/inc);
	//dom对象的初始透明度
	domObj.style.opacity = startOpacity;
	
	let myTimer=null;
	//启动定时
	function moveObj(){
		myTimer = setInterval(goStep,timeSpace);
	}
	//单步处理
	function goStep(){
		//1、改变当前透明度
		currOpacity = currOpacity+direction*inc;
		//2、边界处理
		if(currOpacity>endOpacity){
			currOpacity=endOpacity;
			window.clearInterval(myTimer);
			return;
		}		
		//3、改变外观	
		domObj.style.opacity = currOpacity;		
	}
	moveObj();
}
*/



