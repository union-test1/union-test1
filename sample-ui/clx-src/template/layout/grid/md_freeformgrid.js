// 공통 Util
var comUtil = createComUtil(app);

/*
 * Body에서 init 이벤트 발생 시 호출. 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */e) {
	// 최초 신규 입력상태로 시작
	var mstList = app.lookup("mstList");
	mstList.insertRow(0, true);

	var grp_frm1 = app.lookup("grp_frm1");
	grp_frm1.redraw();
}

/*
 * "신규" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 디테일 입력부 초기화
	clearSubDetail();

	// 첫번째 컬럼에 포커스
	app.focus("ipdFrm2Column2");
}

/*
 * "수정" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 자동 입력
	doApply();
}

/*
 * 그리드 데이터 수정 Function
 */
function doApply() {
	// 디테일 입력부 데이터
	var valid = comUtil.validate("grp_frm2");
	if (valid == false) {
		return;
	}
	var subDetail = app.lookup("subDetail");
	if (subDetail.isModified() == false) {
		comUtil.alert("데이터가 수정되지 않았습니다.");
		return;
	}
	var detailData = subDetail.getRowData(0);

	// 메인 목록에 값 복사
	var grdMain = app.lookup("grdMain");
	var rowIndex = grdMain.getSelectedRowIndex();
	var grdRow = null;
	if (rowIndex == -1) { // 신규
		grdRow = grdMain.insertRow(grdMain.rowCount, true);
	} else {
		grdRow = grdMain.getRow(rowIndex);
	}
	grdRow.setRowData(detailData);
	grdMain.redraw();

	// 디테일 입력부 초기화
	clearSubDetail();
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 그리드 선택된 row 삭제
	comUtil.deleteGridRow("grdMain");
	// 디테일 입력부 초기화
	clearSubDetail();
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 그리드 선택된 row undo
	var rowIndex = comUtil.revertGridRow("grdMain");
	// 디테일 입력부 초기화
	clearSubDetail();
}

/*
 * 디테일 입력부 초기화 Function
 */
function clearSubDetail() {
	// 그리드 선택 초기화
	var grdMain = app.lookup("grdMain");
	grdMain.clearSelection();
	grdMain.redraw();

	// 디테일 입력부 초기화
	var subDetail = app.lookup("subDetail");
	subDetail.clear();
	subDetail.addRow();
	app.lookup("grp_frm2").redraw();
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
	var oldSelection = e.oldSelection;

	// 이전 선택된 row가 없으면 스킵
	if (oldSelection == null || oldSelection.length == 0) {
		return;
	}

	// 초기화버튼 클릭했을 경우 clear로 인해 Selection-change 발생함으로 이후 코드부분 실행되지 않게함.
	if(grdMain.getSelectedRow() == null){
		return;
	}

	// 이전 선택된 row가 삭제된 row이면 스킵
	var grdRow = grdMain.getRow(oldSelection[0]);
	if (grdRow.getStateString().indexOf("D") != -1) {
		return;
	}

	// 입력부의 Validation
	var isValid = comUtil.validate("grp_frm2");
	if (isValid == false) {
		// 변경이 유효하지 않을 경우 진행 중지
		e.preventDefault();
	}
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출. detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트입니다.
 */
function onGrdMainSelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;

	// 현재 선택된 row의 index
	var grdRow = grdMain.getSelectedRow();
	if (grdRow == null) {
		return;
	}
	var rowData = grdRow.getRowData();

	// 그리드의 선택된 RowIndex를 입력부에 반영
	var subDetail = app.lookup("subDetail");
	subDetail.build([ rowData ]);

	var grp_frm2 = app.lookup("grp_frm2");
	grp_frm2.redraw();
}

/*
 * "Export" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick8(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// Excel Export
	comUtil.exportExcel("grdMain", "마스터-디테일 (프리폼-그리드)");
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	// 신규
	doNew();
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 입력부 저장
	doSave();
}

/*
 * 메인 저장 Function
 */
function doSave() {
	// Validation 입력부 체크
	if (comUtil.validate("grp_frm1") == false) {
		// 검증 실패시 처리 중단
		return;
	}

	// 기준 데이터 복사
	var mstList = app.lookup("mstList");
	var mstRow = mstList.getRow(0);
	var mstDetail = app.lookup("mstDetail");
	mstDetail.clear();
	mstDetail.build(mstRow.getRowData());

	// 저장 Submission send
	comUtil.send("subSave");
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick10(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 삭제 여부 체크
	var isOk = confirm("삭제하시겠습니까?");
	if (isOk == false) {
		return;
	}

	// 데이터셋 상태 체크
	var resList1 = app.lookup("mstList");
	var row = resList1.getRow(0);
	var rowState = row.getStateString(true);

	if (rowState == "I") {
		// 신규 상태에서는 다시 신규상태로
		doNew();
	} else {
		resList1.deleteRow(0);
		var resList2 = app.lookup("subList");
		resList2.setRowStateAll(cpr.data.tabledata.RowState.DELETED);
		// 저장
		doSave();
	}
}

/*
 * 신규로 입력 Function
 */
function doNew() {
	/** 화면 초기화 */
	// 검색 조건 초기화
	var reqKey = app.lookup("reqKey");
	reqKey.reset();

	var grp_search_cond = app.lookup("grp_search_cond");
	grp_search_cond.redraw();

	// 마스터 데이터 초기화
	var resList1 = app.lookup("mstList");
	resList1.clear();
	resList1.insertRow(0, true);

	var grp_frm1 = app.lookup("grp_frm1");
	grp_frm1.redraw();

	// 목록 초기화
	var resList2 = app.lookup("subList");
	resList2.clear();
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();

	// 입력부2 초기화
	var subDetail = app.lookup("subDetail");
	subDetail.clear();

	var grp_frm2 = app.lookup("grp_frm2");
	grp_frm2.redraw();
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

	// 입력 Freeform을 redraw()
	var resList1 = app.lookup("mstList");
	// 조회된 결과가 없을 경우 신규로우를 하나 생성하고 신규상태로
	if (resList1.getRowCount() == 0) {
		resList1.insertRow(0, true);
	}
	var grp_frm1 = app.lookup("grp_frm1");
	grp_frm1.redraw();

	// 메인 Grid를 redraw
	clearSubDetail();
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
	;

	// 화면 재조회
	doSearch();
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrp_frm2Keydown(/* cpr.events.CKeyboardEvent */e) {
	/**
	 * @type cpr.controls.Container
	 */
	var grp_frm2 = e.control;

	// 입력부에서 Enter Key가 입력되면 자동입력
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		// 자동입력
		doApply();

		app.focus("ipdFrm2Column2");
	}
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
