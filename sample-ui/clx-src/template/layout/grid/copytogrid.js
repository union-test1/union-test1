// 공통 Util
var comUtil = createComUtil(app);

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 변경 데이터 체크
	if (comUtil.isUpdated("resList1") == true || comUtil.isUpdated("resList2") == true) {
		var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");
		;
		if (isOk == true) {
			doSave();
			return;
		}
	}

	/** 화면 초기화 */
	// 검색조건 초기화
	var reqKey = app.lookup("reqKey")
	reqKey.reset();

	var grp_search_cond = app.lookup("grp_search_cond");
	grp_search_cond.redraw();

	// 목록 초기화
	var resList = app.lookup("resList1");
	resList.clear();
	var grdMain = app.lookup("grdMain1");
	grdMain.redraw();

	var resList = app.lookup("resList2");
	resList.clear();
	var grdMain = app.lookup("grdMain2");
	grdMain.redraw();
}

/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 화면 조회
	doSearch();
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGroupKeydown(/* cpr.events.CKeyboardEvent */e) {
	/**
	 * @type cpr.controls.Container
	 */
	var group = e.control;
	// 검색부에서 enter key가 입력되면 자동 조회
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		// 화면 조회
		doSearch();
	}
}

/*
 * "<" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 선택 복사
	comUtil.copyGridData("grdMain2", "grdMain1");
}

/*
 * ">" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 선택 복사
	comUtil.copyGridData("grdMain1", "grdMain2");
}

/*
 * "<<" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 전체 복사
	comUtil.copyAllGridData("grdMain2", "grdMain1");
}

/*
 * ">>" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 전체 복사
	comUtil.copyAllGridData("grdMain1", "grdMain2");
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 목록 저장
	doSave();
}

/*
 * 화면 검색 Function
 */
function doSearch() {
	// validation 검색 조건 입력 검증.
	var isValid = comUtil.validate("grp_search_cond");
	if (isValid == false) {
		return;
	}

	// 조회 Submission send
	comUtil.send("subMainList");

	// copy datamap(조건 복사)
	var reqKey = app.lookup("reqKey");
	var reqKeyCopy = app.lookup("reqKeyCopy");
	reqKey.copyToDataMap(reqKeyCopy);
}

/*
 * 메인 저장 Function
 */
function doSave() {
	// copy dataset(row 이동 결과 복사)
	var resList1 = app.lookup("resList1");
	var resList2 = app.lookup("resList2");

	var resMain1 = app.lookup("reqList1");
	var resMain2 = app.lookup("reqList2");

	resMain1.clear();
	resMain2.clear();

	resList1.copyToDataSet(resMain1);
	resList2.copyToDataSet(resMain2);

	// 저장 Submission send
	comUtil.send("subSave");
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
 */
function onSubMainListSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
	/**
	 * @type cpr.protocols.Submission
	 */
	var subMain = e.control;

	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = subMain.getMetadata("msg");
	if (message) {
		comUtil.alert(message);
	}

	// 메인그리드1을 redraw
	var grdMain1 = app.lookup("grdMain1");
	grdMain1.redraw();

	// 메인그리드2를 redraw
	var grdMain2 = app.lookup("grdMain2");
	grdMain2.redraw();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
 */
function onSubSaveSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
	/**
	 * @type cpr.protocols.Submission
	 */
	var subSave = e.control;

	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = subSave.getMetadata("msg");
	if (message) {
		comUtil.alert(message);
	}

	// dataset clear
	app.lookup("reqList1").clear();
	app.lookup("reqList2").clear();

	// 화면 재조회
	doSearch();
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onIpbColumn1Search(/* cpr.events.CUIEvent */e) {
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
		// 다이얼로그 설정
		dialog.headerTitle = "popup01";
		dialog.headerVisible = true;
		dialog.headerClose = true;
		// 다이얼로그 위치 지정
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
