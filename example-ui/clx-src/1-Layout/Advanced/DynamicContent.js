

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var layout = new cpr.controls.layouts.VerticalLayout();
	layout.distribution = "fill";
	var pane = app.lookup("contentPane");
	pane.setLayout(layout);
	
	app.getContainer().updateConstraint(pane, {
		"bottom" : "auto",
		"height" : "auto"
	});
	
	var top = app.lookup("top");
	app.getContainer().updateConstraint(top, {
		position: "fixed"
	});
	top.style.css("box-shadow", "0px 2px 5px gray");
	
	var left = app.lookup("left");
	app.getContainer().updateConstraint(left, {
		position: "fixed"
	});
}


/*
 * "콘텐트 추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var newBtn = new cpr.controls.Button();
	newBtn.value = "새로운 버튼";
	
	app.lookup("contentPane").addChild(newBtn, {
		height:  Math.ceil(Math.random() * 100 + 25) + "px"
	});
	
}
