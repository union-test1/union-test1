

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	//쉘 컨트롤을 이용한 방법
	var shellDiv = e.content;
	var buttonGroup = document.createElement("div");
	shellDiv.appendChild(buttonGroup)
	
	buttonGroup.style.position = "fixed";
	buttonGroup.style.right = "16px";
	buttonGroup.style.width = "16px";
	buttonGroup.style.backgroundColor = "white";
	buttonGroup.style.top = "50%";
	buttonGroup.style.transform = "translate(0,-50%)";
	buttonGroup.style.height = "32px";
	
	var btn1 = document.createElement("div");
	btn1.innerHTML="up";
	btn1.style.border = "1px solid black";
	btn1.addEventListener("click",function(e){
		var appEle = document.body.querySelector("#uuid-"+app.getContainer().uuid);
		var layoutEle = appEle.querySelector("[role=layout]");
		layoutEle.scrollTop = 0 ; 
	});
	
	var btn2 = document.createElement("div");
	btn2.innerHTML="dn";
	btn2.style.border = "1px solid black";
	btn2.addEventListener("click",function(e){
		
		var appEle = document.body.querySelector("#uuid-"+app.getContainer().uuid);
		var layoutEle = appEle.querySelector("[role=layout]");
		layoutEle.scrollTop = layoutEle.scrollHeight ; 
	});
	
	buttonGroup.appendChild(btn1);
	buttonGroup.appendChild(btn2);
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//floatControl을 이용한 방법
	var group = new cpr.controls.Container("grp2");
	var button1 = new cpr.controls.Button("btn1");
	button1.value = "▲"
	button1.addEventListener("click",function(e){
		var appEle = document.body.querySelector("#uuid-"+app.getContainer().uuid);
		var layoutEle = appEle.querySelector("[role=layout]");
		layoutEle.scrollTop = 0 ; 
	});
	group.addChild(button1, {
		top:"0px",
		left:"0px",
		width:"16px",
		height:"16px"
	});
	var button2 = new cpr.controls.Button("btn2");
	button2.value = "▼";
	button2.addEventListener("click",function(e){
		var appEle = document.body.querySelector("#uuid-"+app.getContainer().uuid);
		var layoutEle = appEle.querySelector("[role=layout]");
		layoutEle.scrollTop = layoutEle.scrollHeight ; 
	});
	
	group.addChild(button2, {
		top:"16px",
		left:"0px",
		width:"16px",
		height:"16px"
	});
	group.style.css({
		width:"16px",
		height:"32px",
		position:"fixed !important", // 컨트롤에서 강제 지정하여 CSS를 통하여 변경
		right:"20px",
		top:"50%",
		transform:"translate(0,-50%)"
	});
	app.floatControl(group);
	
	//CSS는 css파일에 작성해주세요.	
	group.style.addClass("fixed");
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".fixed{transform:translate(0,-50%);position:fixed !important;}";
	document.head.appendChild(css);
}
