

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 통신
	app.lookup("subList").send();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
	app.lookup("grd1").redraw();
}


/*
 * "추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAdd = e.control;
	//그리드를 선언한다.
	var grid = app.lookup("grd1");
	
	var selectedRow = grid.getSelectedRowIndex();
	
	//그리드에 행 추가
	// 1) 선택한 행이 있으면 선택한 행 아래에 행을 추가한다.
	// 2) 선택한 행이 없으면 0번째에 행을 추가한다.
	if(selectedRow != -1){
		grid.insertRow(selectedRow, true);
	}else{
		grid.insertRow(0, false);
	}
}


/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel = e.control;
	// 그리드를 선언한다.
	var grid = app.lookup("grd1");
	
	var selectedRow = grid.getSelectedRowIndex();
	
	// 그리드의 행을 삭제한다.
	// 1) 선택한 행이 있으면 선택한 행을 삭제한다.
	// 2) 선택한 행이 없으면 "선택된 행이 없습니다." 라는 메세지를 띄운다.
	if(selectedRow != -1){
		grid.deleteRow(selectedRow, true);
	}else{
		alert("선택된 행이 없습니다.");
	}
}


/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSave = e.control;
	// 데이터셋을 선언한다.
	var ds = app.lookup("ds1");
	
	// 데이터셋을 커밋한다.
	ds.commit();
	
	// 데이터셋과 연결된 컨트롤(그리드)를 리드로우한다.
	app.lookup("grd1").redraw();
}
