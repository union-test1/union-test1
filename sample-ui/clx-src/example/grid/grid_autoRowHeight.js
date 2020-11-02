/************************************************
 * grid_autoRowHeight.js
 * Created at 2018. 8. 27. 오전 10:59:20.
 * 
 * @author leeds
 ************************************************/



/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	app.lookup("sms_autoRowHeight").send();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms_autoRowHeightSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_autoRowHeight = e.control;
	
	app.lookup("grid_autoRowHeight").redraw();
}

