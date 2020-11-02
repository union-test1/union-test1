

/*
 * 사용자 정의 컨트롤에서 selection-change 이벤트 발생 시 호출.
 */
function onNavigationBarSelectionChange(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.NavigationBar
	 */
	var navigationBar = e.control;
	
	app.lookup("opt1").value = e.content.item.label; 
}
