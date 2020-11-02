//공통 Util
var comUtil = createComUtil(app);

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	// 최초 신규 입력상태로 시작
	var resMain = app.lookup("resMain");
	resMain.insertRow(0, true);
	
	var grpFrm = app.lookup("grp_frm");
	grpFrm.redraw();
}

/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 화면 조회
	doSearch();
}

/*
 * 화면 검색 Function
 */
function doSearch() {
	// validation 검색 조건 입력 검증.
	if(comUtil.validate("grp_search_cond") == false) {
		return;
	}
	
	// 조회 Submission send
	comUtil.send("subMain");
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
	
	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = subMain.getMetadata("msg");
	if(message) {
		comUtil.alert(message);
	}
	
	var resMain = app.lookup("resMain");
	// 조회된 결과가 없을 경우 신규로우를 하나 생성하고 신규상태로
	if(resMain.getRowCount() == 0) {
		resMain.insertRow(0, true);
	}

	var grpFrm = app.lookup("grp_frm");
	grpFrm.redraw();
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var ipdColumn = app.lookup("ipdColumn1");
	ipdColumn.value = null;
	
	// dataSet 데이터 제거
	var resMain = app.lookup("resMain");
	resMain.clear();
	
	// 데이터가 없을 경우 신규 상태로
	if(resMain.getRowCount() == 0) {
		resMain.insertRow(0, true);
	}
	
	var grp_freeform = app.lookup("grp_freeform");
	grp_freeform.redraw();
}

/*
 * "신규" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	//신규 생성
	doNew();
}

/*
 * 신규 생성 Function
 */
function doNew() {
	// 검색조건 초기화
	var reqKey = app.lookup("reqKey");
	var grpSearchCond= app.lookup("grp_search_cond");
	reqKey.reset();	
	grpSearchCond.redraw();	
	
	// DataSet 초기화
	var resMain = app.lookup("resMain");
	resMain.clear();
	resMain.insertRow(0, true);
	
	// 입력폼 초기화
	var grpFrm = app.lookup("grp_frm");
	grpFrm.redraw();
	
	app.focus("ipdFrmColumn1");
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 입력부 저장
	doSave();
}

/*
 *  메인 저장 Function
 */
function doSave() {
	// Validation 입력부 체크
	if(comUtil.validate("grp_frm") == false) {
		// 검증 실패시 처리 중단
		return;
	}
	
	// 저장 Submission send
	comUtil.send("subSave");
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubSaveSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subSave = e.control;
	
	// 저장 전 상태를 체크하여 적절한 후 처리
	var resMain = app.lookup("resMain");
	var row = resMain.getRow(0);
	var rowState = row.getStateString(true);
	if(rowState == "D") { // 삭제
		comUtil.alert("삭제 되었습니다.");
		// 재조회
		doSearch();
	} else if(rowState == "U") { // 수정
		comUtil.alert("수정 되었습니다.");
		// 재조회
		doSearch();
	} else if(rowState == "I") { // 신규
		comUtil.alert("등록 되었습니다.");
		// 신규 입력된 값이 조회되도록 검색조건을 맞추고 재조회
		app.lookup("ipdColumn1").value = app.lookup("ipdFrmColumn1").value;
		doSearch();
	}
	
	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var msg = subSave.getMetadata("msg");
	if(msg) {
		comUtil.alert(msg);
	}
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 삭제 여부 체크
	var isOk = confirm("삭제하시겠습니까?");
	if(isOk == false) {
		return;
	}
	
	// 데이터셋의 상태를 체크
	var resMain = app.lookup("resMain");
	var row = resMain.getRow(0);
	var rowState = row.getStateString(true);
	
	if(rowState == "I") {
		// 신규 상태에서는 다시 신규 상태로 / 별도 서버 호출 없음.
		doNew();
	} else {
		//row 삭제
		resMain.deleteRow(0);
		// 저장
		doSave();
	}
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrp_search_condKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp_search_cond = e.control;
	// 검색부에서 enter key가 입력되면 자동 조회
	if(e.keyCode == cpr.events.KeyCode.ENTER) {
		// 화면 조회
		doSearch();
	}	
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onSearch_type1Search(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.search.search_type1
	 */
	// 인풋박스 초기화
	var ipdColumn1 = e.control;
	var initValue = ipdColumn1.value;
//	ipdColumn1.value = "";
	// 팝업창 추가
	var _app = app;
	cpr.core.App.load("template/layout/popup/popup01", function(app) {
		var dialog = new cpr.controls.Dialog(app);
		//다이얼로그 설정
		dialog.headerTitle = "popup01";
		dialog.headerVisible = true;
		dialog.headerClose = true; 
		//다이얼로그 위치 지정
		dialog.style.css({
			top : "calc(50% - 300px)",
			left : "calc(50% - 400px)",
			width : "800px",
			height : "600px",
			backgroundColor : "white"
		});
		
		if(initValue){
			dialog.initValue = initValue;
		}

		// 다이얼로그 close 시 발생하는 이벤트 handler
		dialog.addEventListener("close", function(e) {
			// 종료 시 반환되는 returnValue를 설정
			var returnValue = dialog.returnValue;
			if (returnValue == null) {
				return;
			}
			ipdColumn1.value = returnValue.column1;
		});

		// app에 다이얼로그 추가
		_app.getContainer().addChild(dialog);
	});
}
