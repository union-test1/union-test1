
/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 조회 submission, 데이터를 전송합니다. 이미 동일한 서브미션으로 전송 중인 경우 실행되지 않습니다.
	app.lookup("subMain").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubMainSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subMain = e.control;
	
	// 그리드 컨트롤을 다시 그립니다.
	app.lookup("grd1").redraw();
	
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 모든 데이터셋 정보를 제거합니다.
	app.lookup("mainDS").clear();
	
	// 그리드 컨트롤을 다시 그립니다.
	app.lookup("grd1").redraw();
}

/*
 * "신규" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd1 = app.lookup("grd1");
	var rowIdx = 0;
	// 선택된 row index 배열을 반환합니다.
	var rowIdices = grd1.getSelectedRowIndices();
	if(rowIdices && rowIdices.length > 0) {
		rowIdx = rowIdices[rowIdices.length - 1];
	}
	
	// 그리드에 신규 Row를 추가합니다.
	grd1.insertRow(rowIdx, true);
}


/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd1 = app.lookup("grd1");
	// 선택된 row index 배열을 반환합니다.
	var rowIdices = grd1.getSelectedRowIndices();
	
	// 선택된 row 를 삭제합니다.
	grd1.deleteRow(rowIdices);
	
	// 선택을 모두 제거합니다.
	grd1.clearSelection();
}