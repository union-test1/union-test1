
// 공통 Util 생성
var comUtil = createComUtil(app);


/*
 * "확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var subLogin = app.lookup("sub_login");
	subLogin.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_loginSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sub_login = e.control;
	
	var appId = sub_login.getMetadata("uri");
	var msg = sub_login.getMetadata("message");
	if(msg != null) {
		alert(msg);
	}

	if (appId != null) {
		// 화면이동
		cpr.core.App.load(appId, function(newapp) {
			app.close();
			newapp.createNewInstance().run();
		});
		return;
	}
}

/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_loginSubmitError(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sub_login = e.control;
	
	var msg = sub_login.getMetadata("message");
	if(msg != null) {
		alert(msg);
	}
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb2Keydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb2 = e.control;
	
	if(e.keyCode == cpr.events.KeyCode.ENTER) {
		app.lookup("btnLogin").click();
	}
}
