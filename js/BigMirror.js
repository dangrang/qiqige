//放大镜（用面向对象写）

function BigMirror(obj){
	//容器的dom对象
	this.boxDom = obj.boxDom;
	//属性
	//放大镜的dom对象
	this.mirrorDom = null;
	//放大镜的尺寸（宽和高）
	this.width = obj.width;
	this.height = obj.height;
	//放大的倍数
	this.mult = obj.mult;
	//放大镜的left和top是跟随鼠标变化的。
	this.left = 0;
	this.top = 0;
	//透明度
	this.opacity = obj.opacity;
	//背景色
	this.bgColor = obj.bgColor;
	//是否创建了放大镜
	this.hasMirror = false;
	//放大效果	
	this.showBoxDom = null;
	this.bigObj = {
		imgDom:null,
		width:this.width*this.mult,
		height:this.height*this.mult,
		//位置
		pos:obj.bigObj.pos,
		left:0,//放大效果的left和top是需要计算的
		pic:obj.bigObj.pic,
	}
	//this.initUI();
	this.initEvent();
}

BigMirror.prototype.initUI=function(){
	this.hasMirror = true;
	//1、创建放大镜
	this.mirrorDom = $create("div");
	let cssStr = "position:absolute;";
	cssStr+="width:"+this.width+"px;height:"+this.height+"px;";
	cssStr+="background-color:"+this.bgColor+";opacity:"+this.opacity+";";
	this.mirrorDom.style.cssText = cssStr;
	this.boxDom.appendChild(this.mirrorDom);
	//给容器里绑定onmouseout事件,离开时，隐藏放大效果和放大镜
	let that = this;
	addEvent1705(this.mirrorDom,"mouseout",function(){
		console.log("离开了放大镜");
		that.mirrorDom.style.display = "none";	
		that.showBoxDom.style.display = "none";
		
	},false);
	
	//2、放大效果
	//2.1放大效果的可视区域
	this.showBoxDom= $create("div");
	cssStr = "position:absolute;border:1px solid black;overflow:hidden;";
	cssStr+="width:"+this.bigObj.width+"px;height:"+this.bigObj.height+"px;";
	let left=0;
	let top=0;
	switch(this.bigObj.pos){
		case "上":left=0;top=-1*this.bigObj.height;break;
		case "右":left=this.boxDom.offsetWidth;top=0;break;
		case "下":left=0;top=this.boxDom.offsetHeight;break;
		case "左":left=-1*this.bigObj.width;top=0;break;
		default:;
	}
	cssStr+= "left:"+left+"px;top:"+top+"px;";
	this.showBoxDom.style.cssText = cssStr;
	this.boxDom.appendChild(this.showBoxDom);
	
	//2.2放大的图片
	this.bigObj.imgDom = $create("img");
	this.bigObj.imgDom.src=this.bigObj.pic;
	cssStr  = "position:absolute;width:"+this.boxDom.offsetWidth*this.mult+"px;height:"+this.boxDom.offsetHeight*this.mult+"px;";
	this.bigObj.imgDom.style.cssText = cssStr;
	this.showBoxDom.appendChild(this.bigObj.imgDom);
}

BigMirror.prototype.initEvent = function(){
	let that = this;
	//给容器加onmouseover事件
	addEvent1705(this.boxDom,"mouseover",function(event){
		let evt = event || window.event;
		let offsetX = evt.pageX-that.boxDom.offsetLeft;
		let offsetY = evt.pageY-that.boxDom.offsetTop;
		if(offsetX>0 && offsetX<that.boxDom.offsetWidth
		&& offsetY>0 && offsetY<that.boxDom.offsetHeight){
			console.log("进入");
			if(!that.hasMirror){
				that.initUI();	
			}else{
				that.mirrorDom.style.display="block";
				that.showBoxDom.style.display="block";
			}
		}
		
	},false);
	
	//给容器里绑定onmousemove事件
	addEvent1705(this.boxDom,"mousemove",function(event){
		console.log("移动");
		let evt = event || window.event;
		//1、让放大镜跟着鼠标走
		let left = evt.pageX-that.boxDom.offsetLeft-that.width/2;
		let top = evt.pageY-that.boxDom.offsetTop-that.height/2;
		if(left<0){
			left=0;
		}else if(left>that.boxDom.offsetWidth-that.width){
			left=that.boxDom.offsetWidth-that.width;
		}
		if(top<0){
			top=0;
		}else if(top>that.boxDom.offsetHeight-that.height){
			top=that.boxDom.offsetHeight-that.height;
		}
		that.mirrorDom.style.left = left+"px";
		that.mirrorDom.style.top = top+"px";
		
		//2、放大效果反方向跟着走
		that.bigObj.imgDom.style.left = -1*that.mult*left+"px";
		that.bigObj.imgDom.style.top = -1*that.mult*top+"px";
	},false);
}
