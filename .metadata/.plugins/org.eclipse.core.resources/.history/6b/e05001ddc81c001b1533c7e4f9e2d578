/************************************************
 * emp.js
 * Created at 2020. 10. 29. 오전 10:40:46.
 *
 * @author A
 ************************************************/

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("sms1").send();
	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess( /* cpr.events.CSubmissionEvent */ e) {
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	
	app.lookup("grd1").redraw();
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("ds1").clear();
	app.lookup("grd1").redraw();
}


/*
 * "생성" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	 window.open("/testNew.do", "생성", "width=1025, height=200, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );
}



/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd1 = app.lookup("grd1");
	// 선택된 row index 배열을 반환합니다.
	var rowIdices = grd1.getSelectedRowIndices();
	
	if (rowIdices.length == 0) {
		alert("체크박스를 선택해 주세요.");
		return;
	}
	
	// 선택된 row 를 삭제합니다.
	grd1.deleteRow(rowIdices);
	
	// 선택을 모두 제거합니다.
	grd1.clearSelection();
}
