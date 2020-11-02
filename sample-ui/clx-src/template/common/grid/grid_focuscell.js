// 공통 Util
var comUtil = createComUtil(app);

// 조회 후 이동할 Row의 조건을 저장하기 위한 전역변수
var focusCondition = null;

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

	// 메인 그리드를 redraw
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();

	// 조회 완료 후 저장된 값을 가지는 Row로 포커스 이동
	if (focusCondition) {
		comUtil.focusRowByCondition("grdMain", focusCondition, 1);
		focusCondition = null;
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
 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrp_search_condKeydown(/* cpr.events.CKeyboardEvent */e) {
	/**
	 * @type cpr.controls.Container
	 */
	var grp_search_cond = e.control;

	// 검색부에서 Enter Key가 입력되면 자동 조회
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		// 화면 조회
		doSearch();
	}
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
	var rowIndex = comUtil.insertGridRow("grdMain");

	// 입력 가능한 첫 번째 셀에 포커스
	app.lookup("grdMain").focusCell(rowIndex, 1);
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onButton_gridDelete(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.button_grid
	 */
	var button_grid = e.control;

	// 그리드 선택된 row 삭제
	comUtil.deleteGridRow("grdMain");
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
	comUtil.revertGridRow("grdMain");
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
	// 변경 여부 확인
	if (comUtil.isUpdated("resList") == false) {
		comUtil.alert("변경된 정보가 없습니다.");
		return;
	}

	// Validation 편집 중인 Row의 체크
	var isValid = comUtil.validate("grdMain");
	if (isValid == false) {
		// 검증 실패 시 처리 중단
		return;
	}

	// 저장 전에 상태가 변경된 row의 값을 저장
	var resList = app.lookup("resList");
	var rowIndex = resList.getRowStatedIndex(cpr.data.tabledata.RowState.UPDATED | cpr.data.tabledata.RowState.INSERTED);
	if (rowIndex == -1) {
		focusCondition = null;
	} else {
		// Row를 식별할 수 있는 조건을 기록함.
		focusCondition = "column1 == '" + resList.getValue(rowIndex, "column1") + "'";
	}

	// 저장 Submission send
	comUtil.send("subSave");
}

/*
 * 그리드에서 before-editrow-change 이벤트 발생 시 호출. Grid의 edit row가 변경되기 전에 발생하는 이벤트 입니다.
 */
function onGrdMainBeforeEditrowChange(/* cpr.events.CGridEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;

	// 편집 취소일 경우 스킵
	if (e.isCommit == false) {
		return;
	}

	// Validation 편집 중인 Row의 체크
	var isValid = comUtil.validate("grdMain");
	if (isValid == false) {
		e.preventDefault();
		return;
	}
}
