

/*
 * "추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	//UDC의 속성 값(gridId)을 가져옴
	var gridId = app.getAppProperty("gridId");
	if (gridId != null) {
		//해당 UDC를 호출한 appInstance을 가져옴
		var hostApp = app.getHostAppInstance();
		
		// 선택된 Row 기준 뒤에 추가
		// 선택된 Row가 없을 경우 맨 앞에 추가
		/** @type cpr.controls.Grid */
		var grid = hostApp.lookup(gridId);
		var selectedRowIdx = grid.getSelectedRowIndices()[0]; //배열형태
		var rowIndex = 0;
		if (selectedRowIdx) {
			rowIndex = selectedRowIdx;
			grid.insertRow(rowIndex, true); //기준 행 아래에 행 추가
		}else {
			grid.insertRow(0, false); //기준 행 위에 행 추가
		}
	}

	//해당 이름으로 CUI Event 생성해 디스패치 (일종의 연결)
	var event = new cpr.events.CUIEvent("add");
	app.dispatchEvent(event);
}


/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	//UDC의 속성 값(gridId)을 가져옴
	var gridId = app.getAppProperty("gridId");
	if (gridId != null) {
		//해당 UDC를 호출한 appInstance을 가져옴
		var hostApp = app.getHostAppInstance();
		
		/** @type cpr.controls.Grid */
		var grid = hostApp.lookup(gridId);
		//체크표시한 행 삭제
		var checkIndices = grid.getCheckRowIndices();
		if (checkIndices != null && checkIndices.length > 0) {
			var len = checkIndices.length;
			for (var i = (len - 1); i >= 0; i--) {
				var rowindex = checkIndices[i];
				grid.deleteRow(rowindex);
			}
		} else {
			// 메세지 : 삭제할 데이터를 먼저 선택하여 주십시오.
			cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
				"warning" : true,
				msg : "삭제할 데이터를 먼저 선택하여 주십시오."
			});
		}
	}
	
	//해당 이름으로 CUI Event 생성해 디스패치 (일종의 연결)
	var event = new cpr.events.CUIEvent("delete");
	app.dispatchEvent(event);
}


/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	//해당 이름으로 CUI Event 생성해 디스패치 (일종의 연결)
	var event = new cpr.events.CUIEvent("save");
	app.dispatchEvent(event);
}
