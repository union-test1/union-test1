/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트입니다.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var rowIndex = grd1.getSelectedRowIndices()[0]
	var detail = app.lookup("detailGroup");
	
	// 디테일 그룹의 바인딩 문맥 전환
	detail.setBindContext(new cpr.bind.DataRowContext(grd1.dataSet, rowIndex));
}


