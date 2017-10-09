//1、项目中有哪些对象（轮播图）
function Slider(boxDom,width,height,imgs,currOrd,urls,timeSpace,btn){
	//属性
	//轮播图所在容器
	this.boxDom = boxDom;
	this.width = width;
	this.height = height;
	//轮播图需要播放的图片数组
	this.imgs=imgs;
	//当前图片的序号
    this.currOrd = currOrd;
	this.urls = urls;
	//轮播图的定时器
	this.myTimer = null;
	//时间间隔
	this.timeSpace = timeSpace;
	
	let that = this;
	
	//按钮的相关属性；
	this.btn={
		width : btn.width,
		height : btn.height,
		color : btn.color,
		highColor : btn.highColor,//高亮的颜色
		//position : btn.position,
		isCircle : btn.isCircle
	};
	
	this.initEvent = function(){
		this.boxDom.onmouseover = this.stopChange;
		this.boxDom.onmouseout = this.startChange;
		
		let lis = this.boxDom.lastElementChild.children;
		for(let i=0;i<lis.length;i++){
			lis[i].onclick = function(){
				that.goImg(i);
			}
		}
	}
	
	//方法
	//初始化外观
	this.initUI = function(){
		let that=this;
		//一、动态创建图片和按钮
		//1)、创建所有的图片标签，并让所有的图片放置在容器的右边
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = $create("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = "position:absolute;left:"+this.width+"px;top:0px;width:100%;height:100%;z-index:"+(this.imgs.length-i);
			//给每个图片增加超链
			imgDom.onclick = function(){
				that.urls[i];
			}
			this.boxDom.appendChild(imgDom);
		}
		//让开始播放的图片放置在容器内部。
		this.boxDom.children[this.currOrd].style.left = "0px";
		//2)、创建按钮
		let ulDom = $create("ul");
		ulDom.style.cssText="position:absolute;list-style:none;right:50px;bottom:20px;z-index:999";
		this.boxDom.appendChild(ulDom);
		for(let i=0;i<this.imgs.length;i++){
			let liDom = $create("li");
			liDom.style.cssText = "float:left;margin-left:10px;width:"+this.btn.width+"px;height:"+this.btn.height+"px;background-color:"+this.btn.color+";border-radius:50%;";
			ulDom.appendChild(liDom);	
		}
		//把第一个按钮变成红色
		ulDom.children[this.currOrd].style.backgroundColor=this.btn.highColor;	
	};
	
	//1、自动变换：每间隔一定的时间换一张图片
	this.startChange=function(){
		if(that.myTimer!=null){
			window.clearInterval(that.myTimer);
		}
		that.myTimer = window.setInterval(function(){
			that.goStep();
		},that.timeSpace);
	};

	this.goStep=function(){
		//记录当前图片的序号（也就是要淡出的那张图片的序号）
		let curOutOrd = this.currOrd//当前正在显示的图片；//1
		//1、数据
		//改变当前图片序号（也就是即将出现的那张图片的序号）；
		this.currOrd++;//2
		if(this.currOrd>this.boxDom.children.length-2){
			this.currOrd = 0;
		}
		//2、外观
		this.showImg(curOutOrd,this.currOrd);
	};

		//2、鼠标放在图片上，停止变换
	this.stopChange=function(){
		window.clearInterval(that.myTimer);
		that.myTimer = null;
	};
		//4、点击某个按钮，跳转到对应的图片上。
	this.goImg=function(ord){//2
		//1、先把正在进行的动画立即进行完成，或者等待正在进行的动画进行完成。
		let tempTimer = setInterval(function(){
			//判断正在进入的图片的left是否为0，如果不为0，就继续判断
			let left = parseInt(that.boxDom.children[that.currOrd].style.left);
			if(left>=0){
				//记录当前图片的序号（也就是要淡出的那张图片的序号）
				let currOutOrd = that.currOrd;
				//改变当前图片需要为指定图片序号（也就是要淡入的那张图片的序号）
				that.currOrd = ord;
				
				//1)、改变图片
				that.showImg(currOutOrd,that.currOrd);
				window.clearInterval(tempTimer);
			}
		},10);
	};

		//封装函数：根据指定的下标（图片序号）改变外观
	this.showImg=function(currOutOrd,currInOrd){//3		
		console.log("出："+currOutOrd+",进："+currInOrd);
		//让刚才正在显示那张图片，慢慢地滑出去
		MoverH(this.boxDom.children[currOutOrd],0,this.width,1,this.timeSpace/2);
		
		//让ord对应的图片，慢慢地出现在用户的眼前，
		MoverH(this.boxDom.children[currInOrd],-1*this.width,0,1,this.timeSpace/2);
		
		//2)、改变按钮的背景颜色；
		let lis = this.boxDom.lastElementChild.children;
		for(let i=0;i<lis.length;i++){
			lis[i].style.backgroundColor=this.btn.color;
		}
		lis[currInOrd].style.backgroundColor=this.btn.highColor;
	};
	
	this.initUI();
	this.initEvent();
	this.startChange();
}
