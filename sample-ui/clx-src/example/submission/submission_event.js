// report
var start = null;
var received = null;
var rendered = null;

//공통 Util
var comUtil = createComUtil(app);

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn_searchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn_search = e.control;
	
	app.lookup("sms_list").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms_listSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_list = e.control;
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
		rendered = new Date().getTime();
//		alert("received : " + (received - start) + "\nrender : " + (rendered - received));
	});
}

/* ---------------------- CSV 다운로드 ------------------------ */
/*
 * "CSV 다운로드" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn_csvClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn_csv = e.control;
	
	var fileName = "grid.csv";
	excelExport("grd", fileName);
}

//CSV EXPORT
function excelExport(gridId, fileName){
	
	//파일명에 "."이 포함되어 있지 않다면 ".xlsx"를 확장자로 설정해준다.
	if (fileName.indexOf(".") == -1) {
		fileName += ".xlsx";
	}
	
	//서브미션 생성
	var submission = new cpr.protocols.Submission("sub_excelExport");
	//전송할 url 설정
	submission.action = submission.contextPath + "export/" + fileName;
	//mediaType 설정
	submission.mediaType = "application/json";
	//response data의 type 설정
	submission.responseType = "blob";

	// grid export data 가져오기
	/** 
	 * @type cpr.controls.Grid
	 */
	var grid = app.lookup(gridId);
	//그리드의 스타일을 제외하지 않은 채 그리드의 데이터를 JSON 형식으로 반환합니다.
	var exportData = grid.getExportData(false);

	submission.setRequestObject(exportData);

	// success listener
	var successListener = function(e) {
		// 정상적으로 처리되었습니다.
//		alert("정상적으로 처리되었습니다.");
	};
	submission.addEventListener("submit-success", successListener);
	submission.addEventListener("submit-upload-progress", function(e) {
		console.log("-- upload progress --");
		app.lookup("grp_loadmask").visible = true;
		
		var prg = app.lookup("prg1");
		prg.max = e.nativeEvent.total;
		prg.numberValue = e.nativeEvent.loaded;
		prg.redraw();
	});

	submission.addEventListenerOnce("submit-done", function(e) {
		app.lookup("grp_loadmask").visible = false;
		submission.removeEventListener("submit-success", successListener);
		submission.removeAllParameters();
	});

	submission.send();
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms_listBeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_list = e.control;

	start = new Date().getTime();
}

/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onSms_listReceive(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_list = e.control;
	
	received = new Date().getTime();
}
