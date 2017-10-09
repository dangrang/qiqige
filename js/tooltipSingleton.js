//放大镜（用面向对象写）

var singleton = (function(){
	function Tooltip(obj){
		//1、初始化数据
		this.initData();
		//2、修改数据
		this.updateData(obj);
	}
	
	Tooltip.prototype.initData = function(){
		//属性
		//提示框的dom对象
		this.tooltipDom = null;
		//提示框的left和top是跟随鼠标变化的。
		this.left = 0;
		this.top = 0;
	}
	
	Tooltip.prototype.updateData = function(obj){
		//容器的dom对象
		this.boxDom = obj.boxDom;
		//属性
		//提示框的尺寸（宽和高）
		this.width = obj.width;
		this.height = obj.height;
		//背景色
		this.bgColor = obj.bgColor;
		//提示内容
		this.title = obj.title;
	}
	
	Tooltip.prototype.createAllDom = function(){
		//1、创建提示
		this.tooltipDom = $create("div");
		let cssStr = "position:absolute;z-index:999;";
		this.tooltipDom.style.cssText = cssStr;		
		
	}
	
	Tooltip.prototype.updateDomAttr = function(){
		//1、提示的属性更改
		//this.tooltipDom.style.width = this.width+"px";
		//this.tooltipDom.style.height = this.height+"px";
		this.tooltipDom.style.backgroundColor = this.bgColor;
		this.tooltipDom.innerHTML = this.title;
		
		//改变父元素，//确定父子关系
		this.boxDom.appendChild(this.tooltipDom);		
	}
	
	//创建放大镜和放大效果
	Tooltip.prototype.initUI=function(){
		this.createAllDom();
		this.updateDomAttr();
	}
	
	Tooltip.prototype.initEvent = function(){
		let that = this;
		//给容器加onmouseover事件
		removeEvent1705(this.boxDom,"mouseover",boxDomonmouseover);
		//给容器里绑定onmousemove事件
		addEvent1705(this.boxDom,"mouseover",boxDomonmouseover,false);
		
		function boxDomonmouseover(event){
			console.log("boxDomonmouseover");
			let evt = event || window.event;
			let offsetX = evt.pageX-that.boxDom.offsetLeft;
			let offsetY = evt.pageY-that.boxDom.offsetTop;
			if(offsetX>0 && offsetX<that.boxDom.offsetWidth
			&& offsetY>0 && offsetY<that.boxDom.offsetHeight){
				that.tooltipDom.style.display="block";
			}
		}
		
		removeEvent1705(this.boxDom,"mousemove",boxDomonmousemove);
		//给容器里绑定onmousemove事件
		addEvent1705(this.boxDom,"mousemove",boxDomonmousemove,false);
		function boxDomonmousemove(event){
			console.log("boxDomonmousemove");
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
			that.tooltipDom.style.display="block";
			that.tooltipDom.style.left = left+"px";
			that.tooltipDom.style.top = top+"px";
			stopBubble1705(evt);
		};
		
		this.tooltipDom.onmouseout = function(){
			that.tooltipDom.style.display="none";
		}
		
		document.body.onmousemove = function(){
			console.log("bodyonmousemove");
			that.tooltipDom.style.display="none";
		}
	}
	
	let instance;
	
	return {
		getInstance:function(obj){
			if(instance==undefined){
				instance = new Tooltip(obj);
				//创建外观
				instance.initUI();
				instance.initEvent();
			}else{
				instance.updateData(obj);
				instance.updateDomAttr();
				instance.initEvent();
			}
			return instance;
		}
	}
})();

