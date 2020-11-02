
//공통 Util
var comUtil = createComUtil(app);

/*
 * "신규" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd1 = app.lookup("grd1");
	// 그리드의 신규 row를 추가.
	var insertedRow = grd1.insertRow(grd1.getSelectedRowIndex(), true);
	if(insertedRow) {
		var rowIndex = insertedRow.getIndex();
		grd1.selectRows([rowIndex]);			// 추가한 row를 선택
		grd1.setEditRowIndex(rowIndex);			// editing 모드로 설정.
		grd1.focusCell(rowIndex, 0);			// 입력할 수 있도록 첫번째 cell에 포커스
	}
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd1 = app.lookup("grd1");
	// 그리드의 선택된 row 삭제
	grd1.deleteRow(grd1.getSelectedRowIndex());
}

/*
 * "검증" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 그리드를 전체 데이터를 기준으로 validation을 실행
	var valid = comUtil.validateGrid("grd1", "all");
	if(valid == true) {
		comUtil.alert("검증을 통과하였습니다.");
	}
}

/*
 * "변경된행검증" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 그리드를 변경된 데이터를 기준으로 validation을 실행
	var valid = comUtil.validateGrid("grd1", "upd");
	if(valid == true) {
		comUtil.alert("검증을 통과하였습니다.");
	}
}

/*
 * "편집행검증" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 그리드를 현재 편집중인 데이터를 기준으로 validation을 실행
	var valid = comUtil.validateGrid("grd1");
	if(valid == true) {
		comUtil.alert("검증을 통과하였습니다.");
	}
}



/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb5ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb5 = e.control;

	// 컨트롤의 입력 값을 보정합니다.
	comUtil.revise(ipb5);
}
