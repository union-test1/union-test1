// 공통 Util
var comUtil = createComUtil(app);

/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 화면 조회
	doSearch();
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

	// Tree를 redraw
	var mainTree = app.lookup("tre1");
	mainTree.redraw();
	if (mainTree.getItemCount() > 0) {
		// 첫번째 아이템을 선택
		mainTree.selectItem(0);
		// 트리의 모든 아이템을 펼침
		mainTree.expandAllItems();
	} else {
		// 그리드 초기화
		var resSubList = app.lookup("resSubList");
		var grdMain = app.lookup("grdMain");

		resSubList.clear();
		grdMain.redraw();
	}
}

/*
 * 트리에서 selection-change 이벤트 발생 시 호출. 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTre1SelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;

	// 변경 데이터 체크
	if (comUtil.isUpdated("resSubList") == true) {
		var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");
		;
		if (isOk == true) {
			doSave();
			return;
		}
	}

	// 트리의 선택된 값을 통해 그리드 화면 조회
	var selectedValue = e.newSelection[0].value;
	var reqSubKey = app.lookup("reqSubKey");
	reqSubKey.setValue("column1", selectedValue);

	// 그리드 조회 submission send
	comUtil.send("subList");
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
 */
function onSubListSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
	/**
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;

	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = subList.getMetadata("msg");
	if (message) {
		comUtil.alert(message);
	}

	// 그리드를 redraw
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();

	if (grdMain.rowCount > 0) {
		// 첫번째 로우 선택
		grdMain.selectRows([ 0 ]);
	}
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
 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 변경 데이터 체크
	if (comUtil.isUpdated("resSubList") == true) {
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
	var resList = app.lookup("resList");
	resList.clear();
	var tre1 = app.lookup("tre1");
	tre1.redraw();

	var resSubList = app.lookup("resSubList");
	resSubList.clear();
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();
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

	// pk 값 설정
	var grdMain = app.lookup("grdMain");
	var tre1 = app.lookup("tre1");
	var items = tre1.getSelection();

	// tree의 선택된 아이템이 없으면 스킵
	if (items.length <= 0) {
		return;
	}

	// 추가된 row에 트리의 item 값 설정
	var insertRowidx = grdMain.getSelectedRowIndex();
	grdMain.setCellValue(insertRowidx, 1, items[0].value);

	// 입력 가능한 첫 번째 셀에 포커스
	grdMain.focusCell(insertRowidx, 2);

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
 * "저장" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 목록 저장
	doSave();
}

/*
 * 그리드에서 before-editrow-change 이벤트 발생 시 호출. Grid의 edit row가 변경되기 전에 발생하는 이벤트 입니다.
 */
function onGrd1BeforeEditrowChange(/* cpr.events.CGridEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;

	// 편집 취소일 경우 Skip.
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
	if (comUtil.isUpdated("resSubList") == false) {
		comUtil.alert("변경된 정보가 없습니다.");
		return;
	}

	// Validation 편집 중인 Row의 체크
	var isValid = comUtil.validate("grdMain");
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

	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = subSave.getMetadata("msg");
	if (message) {
		comUtil.alert(message);
	}

	// 화면 재조회
	comUtil.send("subList");

}
