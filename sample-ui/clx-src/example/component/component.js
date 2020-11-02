
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var btn = app.lookup("btn");
	// 버튼 텍스트 설정합니다.
	btn.text = "Button"+"\n"+"("+"Alt + k"+")";
	
	var accordion = app.lookup("accordion");
	// 아코디언 1번째 아이템 선택합니다.
	var item2 = accordion.getSection(1);
	accordion.select(item2);
	
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn = e.control;
	alert("마우스 클릭 이벤트");
}
