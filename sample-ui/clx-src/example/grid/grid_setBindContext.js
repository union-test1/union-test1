
/*
 * 그룹에서 before-context-value-change 이벤트 발생 시 호출.
 * 바인드컨텍스트를 가지고 있는 컨트롤에서 바인드컨텍스트를 이용해 값이 변경되기 전에 발생하는 이벤트.
 */
function onGroupBeforeContextValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var group = e.control;
	var txa = app.lookup("txa1");
	
	// 바인드컨텍스트 그리드
	var grd = e.context.grid;
	var selectRow = grd.getSelectedRowIndices()[0];
	
	// 바인드컨텍스트를 통해 변경하려고 하는 컬럼명
	var columnName = e.columnName;
	
	if(txa.value != null){
		txa.value += selectRow+ "번째 줄\n"+"변경 전 "+columnName+": "+grd.getCellValue(selectRow, columnName);
	}else{
		txa.value = selectRow+ "번째 줄\n"+"변경 전 "+columnName+": "+grd.getCellValue(selectRow, columnName);
	}
}

/*
 * 그룹에서 context-value-change 이벤트 발생 시 호출.
 * 바인드컨텍스트를 가지고 있는 컨트롤에서 바인드컨텍스트를 이용해 값이 변경된 후에 발생하는 이벤트.
 */
function onGroupContextValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var group = e.control;
	var txa = app.lookup("txa1");
	
	// 바인드컨텍스트 그리드
	var grd = e.context.grid;
	var selectRow = grd.getSelectedRowIndices()[0];
	
	// 바인드컨텍스트를 통해 변경하려고 하는 컬럼명
	var columnName = e.columnName;
	
	txa.value += "\n"+"변경 후 "+columnName+": "+grd.getCellValue(selectRow, columnName)+"\n\n";
}

/*
 * "clear" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var txa = app.lookup("txa1");
	var grd = app.lookup("grd1");

	txa.value = "";
	
	// 그리드 내에서 변경된 모든 데이터를 복구합니다.
	grd.revertData();
}
