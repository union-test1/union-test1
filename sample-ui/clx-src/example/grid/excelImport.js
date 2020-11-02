/*
 * "Import" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// UDC 동적 생성
	var fileupload = new udc.fileupload("fileuploader");
	var showConstraint = {
		"position" : "absolute",
		"top" : "0",
		"bottom" : "0",
		"left" : "0",
		"right" : "0"
	};
	
	// UDC 출판된 이벤트 : "filesend"
	fileupload.addEventListener("filesend", function(/* cpr.events.CEvent */e) {
		// UDC 함수 호출
		var files = fileupload.getFiles();
		
		// fileupload 컨트롤을 제거합니다.
		app.getContainer().removeChild(fileupload);

		var submission = app.lookup("sms1");
		// 파라미터에 파일을 설정합니다.
		submission.setFileParameters("ds1", files);
		
		//데이터를 전송합니다. 이미 동일한 서브미션으로 전송 중인 경우 실행되지 않습니다.
		submission.send();
	});
	
	// fileupload 컨트롤을 container에 추가합니다.
	app.getContainer().addChild(fileupload, showConstraint);
}
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
	/**
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	// 그리드 컨트롤을 다시 그립니다.
	app.lookup("grd1").redraw();
}
