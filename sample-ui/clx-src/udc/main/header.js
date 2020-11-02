
cpr.core.NotificationCenter.INSTANCE.subscribe("notice", null, function(msg) {
	var glbConsole = app.lookup("glb_console");
	glbConsole.info(msg);
});

/*
 * "Logout" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.dispatchEvent(new cpr.events.CUIEvent("logout"));
}

/*
 * "X" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.dispatchEvent(new cpr.events.CUIEvent("close"));
}
