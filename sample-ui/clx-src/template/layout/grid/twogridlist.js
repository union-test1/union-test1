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
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onButton_gridInsert(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;
	// 그리드 row insert
	comUtil.insertGridRow("grdMain1");

	// pk 값 설정
	var grdMain1 = app.lookup("grdMain1");
	var ipdColumn1 = app.lookup("ipdColumn1");
	var insertRowIdx = grdMain1.getSelectedRowIndex();
	grdMain1.setCellValue(insertRowIdx, 1, ipdColumn1.value);

	// 입력 가능한 첫 번째 셀에 포커스
	grdMain1.focusCell(insertRowIdx, 2);
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onButton_gridDelete(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;
	// 그리드 선택된 Row 삭제
	comUtil.deleteGridRow("grdMain1");
}

/*
 * 사용자 정의 컨트롤에서 reset 이벤트 발생 시 호출.
 */
function onButton_gridReset(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;
	// 그리드 선택된 row undo
	var rowIndex = comUtil.revertGridRow("grdMain1");
}

/*
 * 사용자 정의 컨트롤에서 insert 이벤트 발생 시 호출.
 */
function onButton_gridInsert2(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;
	// 그리드 row insert
	comUtil.insertGridRow("grdMain2");

	// pk값 설정
	var grdMain2 = app.lookup("grdMain2");
	var ipdColumn1 = app.lookup("ipdColumn1");
	var insertRowIdx = grdMain2.getSelectedRowIndex();
	grdMain2.setCellValue(insertRowIdx, 1, ipdColumn1.value);

	// 입력가능한 두번째 셀에 포커스
	grdMain2.focusCell(insertRowIdx, 2);
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onButton_gridDelete2(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;
	// 그리드 선택된 Row 삭제
	comUtil.deleteGridRow("grdMain2");
}

/*
 * 사용자 정의 컨트롤에서 reset 이벤트 발생 시 호출.
 */
function onButton_gridReset2(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;
	// 그리드 선택된 row undo
	comUtil.revertGridRow("grdMain2");
}

/*
 * "Export" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// Excel Export
	comUtil.exportExcel("grdMain1", "투그리드 조회");
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 목록 저장
	doSave();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
 */
function onSubMainListSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
	/**
	 * @type cpr.protocols.Submission
	 */
	var subMainList = e.control;

	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = subMainList.getMetadata("msg");
	if (message) {
		comUtil.alert(message);
	}

	// 메인그리드1을 redraw
	var grdMain1 = app.lookup("grdMain1");
	grdMain1.redraw();

	if (grdMain1.rowCount > 0) {
		// 첫번째 로우 선택
		grdMain1.selectRows([ 0 ]);
	}

	// 메인그리드2를 redraw
	var grdMain2 = app.lookup("grdMain2");
	grdMain2.redraw();

	if (grdMain2.rowCount > 0) {
		// 첫번째 로우 선택
		grdMain2.selectRows([ 0 ]);
	}
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

	// 화면 재조회
	doSearch();
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
}

/*
 * 메인 저장 Function
 */
function doSave() {
	// 변경여부 확인
	if (comUtil.isUpdated("resList1") == false && comUtil.isUpdated("resList2") == false) {
		comUtil.alert("변경된 정보가 없습니다.");
		return;
	}

	// Validation 편집 중인 Row의 체크
	var isValid = comUtil.validate("grdMain1") && comUtil.validate("grdMain2");
	if (isValid == false) {
		e.preventDefault();
		return;
	}

	// 저장 Submission send
	comUtil.send("subSave");
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrp_search_condKeydown(/* cpr.events.CKeyboardEvent */e) {
	/**
	 * @type cpr.controls.Container
	 */
	var grp_search_cond = e.control;
	// 검색부에서 enter key가 입력되면 자동 조회
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		// 화면 조회
		doSearch();
	}
}

/*
 * 그리드에서 before-editrow-change 이벤트 발생 시 호출. Grid의 edit row가 변경되기 전에 발생하는 이벤트 입니다.
 */
function onGrdMain1BeforeEditrowChange(/* cpr.events.CGridEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grdMain1 = e.control;

	// 편집 취소일 경우 Skip.
	if (e.isCommit == false) {
		return;
	}

	// Validation 편집 중인 Row의 체크
	var isValid = comUtil.validate(grdMain1.id);
	if (isValid == false) {
		e.preventDefault();
		return;
	}
}

/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onIpdColumn1Search(/* cpr.events.CUIEvent */e) {
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
