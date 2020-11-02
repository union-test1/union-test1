
/*
 * "close" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var dm1 = app.lookup("dm1");
	
	// 앱의 속성을 설정합니다.
	app.setHostProperty("returnValue", dm1.getDatas());
	
	// 앱을 닫습니다.
	app.close();
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var ipb1 = app.lookup("ipb1");
	// 인풋박스로 포커스가 설정됩니다.
	ipb1.focus();
}
