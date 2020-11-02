
// 조회 후 이동할 Row의 조건을 저장하기 위한 전역변수
var focusCondition = null;

/**
 * 화면 검색 Function
 * */
function doSearch() {
	var grd = app.lookup("grdMain");
	
	// 그리드가 현재 편집 중인지 여부를 반환합니다.
	if (grd.isEditing()) {
		return ;
	}
	
	// 현재 연결된 데이터 구조체에 설정된 filter 조건식을 반환합니다.
	if(grd.getFilter()){
		// 적용된 filter를 제거합니다.
		grd.clearFilter();
	}
	
	// 조회 Submission send
	app.lookup("subMainList").send();
}

/**
 * 메인 저장 Function
 * */
function doSave() {
	var ds = app.lookup("resList");
	// 데이터셋 변경 유무를 반환합니다. (inserted, deleted, updated 상태인 row가 존재하는지 유무)
	if(ds.isModified() == false){
		// 서버 메세지를 발송합니다.
		cpr.core.NotificationCenter.INSTANCE.post("notice", "변경된 정보가 없습니다.");
		return;
	}

	var grd = app.lookup("grdMain");
	// 그리드가 현재 편집 중인지 여부를 반환합니다.
	if (grd.isEditing()) {
		cpr.core.NotificationCenter.INSTANCE.post("notice", "편집 중인 데이터가 있습니다.");
		return ;
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
	app.lookup("subSave").send();
}


/**
 * contextmenu 생성
 * @return menu
 * */
function createContextMenu() {
	// 메뉴 컨트롤 동적 생성
	var menu = new cpr.controls.Menu("ctxmenu");
	
	// blur이벤트 핸들러 입니다.
	menu.addEventListener("blur", function() {
		// 컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();
	});
	
	// selection-change이벤트 핸들러 입니다.
	menu.addEventListener("selection-change", function(/* cpr.events.CSelectionEvent */e) {
		// 컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();
		
		// 새롭게 선택된 아이템
		var newSelect = e.newSelection[0];
		var grd = app.lookup("grdMain")
		var grdSelectionRow = grd.getSelectedRowIndices()[0];
		var dm = app.lookup("reqKey");
		// 데이터맵의 컬럼명을 배열형식으로 반환합니다.
		var initValue = dm.getColumnNames();
		
		// "추가" 아이템 선택 시
		if (newSelect.label == "추가") {
			// 그리드에 신규 Row를 추가합니다.
			grd.insertRow(grdSelectionRow, true);
		}
		// "수정" 아이템 선택 시
		else if (newSelect.label == "수정") {
			// 전달된 행을 편집모드로 전환합니다.
			grd.setEditRowIndex(grdSelectionRow, true);
		}
		// "삭제" 아이템 선택 시
		else if (newSelect.label == "삭제") {
			// 그리드의 선택된 Row를 삭제합니다.
			grd.deleteRow(grdSelectionRow);
		}
		// "소트" 아이템 선택 시
		else if (newSelect.label == "소트") {
			// 다이얼로그 스타일
			var dialogProp = {
					width : 500,
					height : 300,
					headerVisible : true,
					headerClose : true,
					resizable : true
				};
			
			// 다이얼로그 sort핸들러 입니다.
			function sortHandler(/* cpr.events.CUIEvent */e){
				var dialog = e.control;
				// 다이얼로그의 returnValue를 반환합니다.
				var returnValue = dialog.returnValue;
				if (returnValue == null) {
					return;
				}
				
				var sortCondition = "";
				for(var i=0; i<returnValue.length; i++){
					if(returnValue[i] != null){
						sortCondition += returnValue[i] + ",";
					}
				}
				sortCondition = sortCondition.substring(0, sortCondition.length-1);
				// 현재 연결된 구조체에 sort 조건을 변경하고, sort 합니다.
				grd.sort(sortCondition);
			}
			
			// 앱에 Dialog를 open 합니다.
			app.openDialog("example/grid/popup/grid_contextmenu_sortpop", dialogProp, function(/* cpr.controls.Dialog */dialog){
				
				if (sortHandler) {
					// 앱이 "close"할 때 발생하는 이벤트 핸들러입니다.
					dialog.addEventListenerOnce("close", sortHandler);
				}
				if (initValue) {
					// 다이얼로그의 initValue를 설정합니다.
					dialog.initValue = initValue;
					if (initValue["headerTitle"]) {
						dialog.headerTitle = initValue["headerTitle"];
					}
				}
				
			});
			
		}else {
			
			// 다이얼로그 스타일
			var dialogProp = {
					width : 700,
					height : 300,
					headerVisible : true,
					headerClose : true,
					resizable : true
				};
			
			// 다이얼로그 filter핸들러 입니다.
			function filterHandler(/* cpr.events.CUIEvent */e){
				var dialog = e.control;
				// 다이얼로그의 returnValue를 반환합니다.
				var returnValue = dialog.returnValue;
				if (returnValue == null) {
					return;
				}
				
				if (returnValue != "") {
					// 현재 연결된 데이터 구조체에 filter 조건을 변경하고, filter 합니다.
					grd.filter(returnValue);
				}
			}
			
			// 앱에 Dialog를 open 합니다.
			app.openDialog("example/grid/popup/grid_contextmenu_filterpop", dialogProp, function(/* cpr.controls.Dialog */dialog){
				
				if (filterHandler) {
					// 앱이 "close"할 때 발생하는 이벤트 핸들러입니다.
					dialog.addEventListenerOnce("close", filterHandler);
				}
				if (initValue) {
					// 다이얼로그의 initValue를 설정합니다.
					dialog.initValue = initValue;
					if (initValue["headerTitle"]) {
						dialog.headerTitle = initValue["headerTitle"];
					}
				}
				
			});
			
		}
	});
	
	// contextmenu 아이템 입니다.
	(function(ctxmenu) {
		ctxmenu.addItem(new cpr.controls.MenuItem("추가", "value1", "root"));
		ctxmenu.addItem(new cpr.controls.MenuItem("수정", "value2", "root"));
		ctxmenu.addItem(new cpr.controls.MenuItem("삭제", "value3", "root"));
		ctxmenu.addItem(new cpr.controls.MenuItem("소트", "value4", "root"));
		ctxmenu.addItem(new cpr.controls.MenuItem("필터", "value5", "root"));
	})(menu);
	return menu;
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
		cpr.core.NotificationCenter.INSTANCE.post("notice", message);
	}

	// 메인 그리드를 redraw
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();

	// 조회 완료 후 저장된 값을 가지는 Row로 포커스 이동
	if (focusCondition) {
		var grid = app.lookup("grdMain");
		// 조건에 맞는 첫 번째 Row를 찾아 해당 GridRow를 반환합니다.
		var gridRow = grid.findFirstRow(focusCondition);
		if (gridRow) {
			// 사용자가 전달한 정보의 cell에 포커스를 줍니다.
			grid.focusCell(gridRow.getIndex(), 1);
		}
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
		cpr.core.NotificationCenter.INSTANCE.post("notice", message);
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
	 * @type udc.com.button_grid
	 */
	var button_grid = e.control;

	var grd = app.lookup("grdMain");
	// 그리드가 현재 편집 중인지 여부를 반환합니다.
	if (grd.isEditing()) {
		if (grd.isEditing() == true) {
			var success = grd.setEditRowIndex(-1, true);
			if (success == false) {
				return -1;
			}
		}
	}
	
	// 선택된 row index를 반한합니다.
	var rowIndex = grd.getSelectedRowIndex();
	
	// 그리드에 신규 Row를 추가합니다.
	var gridRow = grd.insertRow(rowIndex, true);
	rowIndex = gridRow.getIndex();
	
	// rowIndex를 선택합니다.
	grd.selectRows([ rowIndex ]);

	// Grid가 readonly가 아닐 경우 edit mode로 전환
	if (grd.readOnly == false) {
		var changed = grd.setEditRowIndex(rowIndex, true);
	}
	
	// 입력 가능한 첫 번째 셀에 포커스
	grd.focusCell(rowIndex, 1);
}

/*
 * 사용자 정의 컨트롤에서 delete 이벤트 발생 시 호출.
 */
function onButton_gridDelete(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.com.button_grid
	 */
	var button_grid = e.control;

	// 그리드 선택된 row 삭제
	var grd = app.lookup("grdMain");
	// 선택된 그리드 row
	var rowIndex = grd.getSelectedRowIndex();
	
	if (rowIndex == -1) {
		//선택된 row 없을 때 notice
		cpr.core.NotificationCenter.INSTANCE.post("notice", "선택된 Row가 없습니다.");
	} else {
		// 그리드 선택된 로우 삭제
		grd.deleteRow(rowIndex);
	}
}

/*
 * 사용자 정의 컨트롤에서 reset 이벤트 발생 시 호출.
 */
function onButton_gridReset(/* cpr.events.CUIEvent */e) {
	/**
	 * @type udc.com.button_grid
	 */
	var button_grid = e.control;

	// 그리드 선택된 row undo
	var grd = app.lookup("grdMain");
	// 그리드 선택된 row
	var rowIndices = grd.getSelectedRowIndices();
	// 그리드 바인딩 dataSet
	var dataSet = grd.dataSet;

	if (rowIndices.length == 0) {
		cpr.core.NotificationCenter.INSTANCE.post("notice", "선택된 Row가 없습니다.");
	} else {
		// 그리드 바인딩 된 dataSet reset
		rowIndices.forEach(function(rowIndex) {
			dataSet.revertRow(rowIndex);
		});
		// 그리드 다시 구성
		grd.redraw();
	}
}



// UDC를 parent에 붙이지 않으면 root app에 붙어져 그려짐. TODO 개선
var gridctxmenu = null;

/*
 * 그리드에서 contextmenu 이벤트 발생 시 호출. 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onGrdMainContextmenu(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	
	// 마우스를 눌렀을 때 이벤트를 트리거 한 버튼을 나타냅니다.
	// no button = 0, left button = 1,
	// middle button = 2, right button = 3
	if (e.which !== 3) {
		alert(e.which);
		return;
	}
	
	// 다음 기본 동작을 방지합니다.
	e.preventDefault();
	
	// 캡처 및 버블링 단계에서 현재 이벤트의 추가 전파를 방지합니다.
	e.stopPropagation(true);

	if (gridctxmenu) {
		// 앱에 띄워져 있는 gridctxmenu를 제거합니다.
		app.removeFloatingControl(gridctxmenu, false);
	}

	// 앱이 실제 그려진 사이즈를 반환합니다. 화면에 그려지지 않은 상태인 경우는 모든 값이 0인 객체가 반환됩니다.
	var appRect = app.getActualRect();

	gridctxmenu = createContextMenu();
	gridctxmenu.style.css({
		position : "absolute",
		top : "" + (e.clientY - appRect.top) + "px",
		left : "" + (e.clientX - appRect.left) + "px",
		width : "150px"
	});
	// 앱 내부 특정 위치에 컨트롤을 위치시킵니다.
	app.floatControl(gridctxmenu);
	
	// gridctxmenu에 포커스 설정합니다
	gridctxmenu.focus();
}
