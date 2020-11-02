
/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var htmlobj = app.lookup("TmtViewer");
	// HTMLObject 해당하는 파라미터 값 설정합니다.
	htmlobj.setParam("src", "http://localhost:8080/xb/xbsample.xtm");
	htmlobj.setParam("ControlName", "TmtViewer1");
	htmlobj.setParam("setAddressBar", "1");
	htmlobj.setParam("setMenuBar", "1");
	htmlobj.setParam("setStatusBar", "1");
	htmlobj.setParam("setToolBar", "1");
	
	var accordion = app.lookup("accordion");
	// 아코디언 1번째 아이템 선택합니다.
	var item2 = accordion.getSection(1);
	accordion.select(item2);
	
	var btn = app.lookup("btn");
	// 버튼 텍스트 설정합니다.
	btn.text = "Button"+"\n"+"("+"Alt + k"+")";
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
	var noti = app.lookup("noti");
	// notifier 경고에 대한 알림창
	// message : eXbuilder6 입니다.
	noti.warning("eXbuilder6 입니다.");
}
