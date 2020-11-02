
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
 * 서브미션에서 submit-progress 이벤트 발생 시 호출.
 * 서버로 부터 일정 크기의 데이터를 전송받았을 때 발생합니다. 하나의 응답에 대해 여러 번 발생할 수 있습니다.
 */
function onSubMainSubmitProgress(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subMain = e.control;
	
	// 그리드 컨트롤을 다시 그립니다.
	app.lookup("grd1").redraw();
}


