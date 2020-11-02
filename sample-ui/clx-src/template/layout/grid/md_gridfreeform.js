// 공통 Util
var comUtil = createComUtil(app);

/*
 * Body에서 init 이벤트 발생 시 호출. 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */e) {
	// 페이지 인덱서 초기화
	comUtil.setPagingInfo("resPage", "pageIndexer");
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 변경 데이터 체크
	if (comUtil.isUpdated("resList") == true) {
		var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");
		if (isOk == true) {
			// 목록저장
			doSave();
			return;
		}
	}

	/** 화면초기화 * */
	// 검색조건 초기화
	var reqKey = app.lookup("reqKey");
	reqKey.reset();

	var grpSearch = app.lookup("grp_search");
	grpSearch.redraw();

	// 목록 초기화
	var resList = app.lookup("resList");
	resList.clear();
	app.lookup("grdMain").redraw();

	// 입력부 초기화
	var frm = app.lookup("grp_frm");
	frm.getBindContext().rowIndex = -1;
	frm.redraw();

	// 페이지 인덱서 설정초기화
	var resPage = app.lookup("resPage");
	resPage.reset();

	// 페이지 인덱서 초기화
	comUtil.setPagingInfo("resPage", "pageIndexer");
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrp_searchKeydown(/* cpr.events.CKeyboardEvent */e) {
	/**
	 * @type cpr.controls.Container
	 */
	var grp_search = e.control;

	// 검색부에서 enter key가 입력되면 자동 조회
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		// 화면 조회
		doSearch();
	}
}

/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 화면 조회
	doSearch();
}

/*
 * 메인 검색 Function
 */
function doSearch() {
	// validation 검색 조건 입력 검증.
	var isValid = comUtil.validate("grp_search");
	if (isValid == false) {
		return;
	}

	// 조회 Submission Send
	comUtil.send("subMainList");
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

	// 메인그리드를 redraw
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();

	if (grdMain.rowCount > 0) {
		// 첫번째 row 선택
		grdMain.selectRows([ 0 ]);
	} else {
		// 조회된 결과가 없을 경우 조건을 초기화
		var frm = app.lookup("grp_frm");
		frm.getBindContext().rowIndex = -1;
		frm.redraw();
	}

	// 페이지 인덱서 반영
	comUtil.setPagingInfo("resPage", "pageIndexer");
}

/*
 * 사용자 정의 컨트롤에서 before-pagechange 이벤트 발생 시 호출.
 */
function onPageIndexerBeforePagechange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type udc.pageindex
	 */
	var pageIndexer = e.control;

	// 변경 데이터 체크
	if (comUtil.isUpdated("resList") == true) {
		var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");
		if (isOk == true) {
			// 목록을 저장하고 다음 이벤트 중지
			doSave();
			e.preventDefault();
			return;
		}
	}
	// 조회조건 validation
	var isValid = comUtil.validate("grp_search");
	// 조회조건이 invalid 할 때 다음 이벤트 중지
	if (isValid == false) {
		// 다음 이벤트 중지
		e.preventDefault();
		return;
	}
}

/*
 * 페이지 이동. 사용자 정의 컨트롤에서 pagechange 이벤트 발생 시 호출.
 */
function onPageIndexerPagechange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type udc.pageindex
	 */
	var pageIndexer = e.control;

	// 변경된 페이지 인덱스를 DataMap에 반영
	var resPage = app.lookup("resPage");
	resPage.setValue("pageIdx", e.newSelection);

	// 조회 서브미션 send
	doSearch();
}

/*
 * 그리드에서 before-selection-change 이벤트 발생 시 호출. detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트입니다.
 */
function onGrdMainBeforeSelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	// 새로운 row가 선택되기 이전의 row.
	var oldSel = e.oldSelection;

	// 이전 선택된 Row가 없으면 스킵
	if (oldSel == null || oldSel.length == 0) {
		return;
	}
	// 이전 선택된 Row가 삭제된 Row이면 스킵
	var grdRow = grdMain.getRow(oldSel[0]);
	if (grdRow.getStateString().indexOf("D") != -1) {
		return;
	}

	// 입력부의 Validation
//	var isValid = comUtil.validate("grp_frm");
//	if (isValid == false) {
//		// 변경이 유효하지 않을 경우 진행 중지
//		e.preventDefault();
//	}
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 목록 저장
	doSave();
}

/*
 * 메인 저장 Function
 */
function doSave() {
	// 변경여부 확인
	if (comUtil.isUpdated("resList") == false) {
		comUtil.alert("변경된 정보가 없습니다.");
		return;
	}

	// Validation 입력부 체크
	var isValid = comUtil.validate("grp_frm");
	if (isValid == false) {
		// 검증 실패 시 처리 중단
		return;
	}

	// 저장 Submission send
	comUtil.send("subSave");
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
 */
function onSubSaveSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
	/**
	 * @type cpr.protocols.Submission
	 */
	var subSave = e.control;

	// 서버로 부터 전달된 메시지가 있을 경우 메시지 출력
	var message = subSave.getMetadata("msg");
	if (message) {
		comUtil.alert(message);
	}

	// 화면 재조회
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
	comUtil.insertGridRow("grdMain");

	// 입력 가능한 첫 번째 셀에 포커스
	app.focus("ipdFrmColumn1");
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
	comUtil.deleteGridRow("grdMain");

	// Row가 삭제되면 입력부를 새로 그림
	app.lookup("grp_frm").redraw();
}

/*
 * 사용자 정의 컨트롤에서 reset 이벤트 발생 시 호출.
 */
function onButton_gridReset(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;

	// 그리드 선택된 Row undo
	var rowIndex = comUtil.revertGridRow("grdMain");
	if (rowIndex != -1) {
		// 데이터가 복구되면 입력부를 새로 그림
		app.lookup("grp_frm").redraw();
	}
}

/*
 * "Export" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// Excel Export
	comUtil.exportExcel("grdMain", "마스터-디테일 (그리드-프리폼)");
}
