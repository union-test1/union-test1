/************************************************
 * dialogevent_popup.js
 * Created at 2018. 8. 27. 오전 10:39:37.
 *
 * @author hyeran
 ************************************************/


/*
 * Body에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(/* cpr.events.CEvent */ e){
		var dialog = app.getHost();
	if (dialog && dialog.returnValue == null) {
		dialog.returnValue = "default";
	}
	console.log("before-unload");
}


/*
 * "확인 반환 : confirm" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log("확인 닫기");
	
	app.close("confirm");
}


/*
 * "취소

반환 : cancel" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log("취소 닫기");
	
	app.close("cancel");
}



