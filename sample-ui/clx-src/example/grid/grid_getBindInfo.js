
/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrdMainCellClick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	
	// 선택된 cell 정보를 배열로 반환합니다.
	var selectCell = grdMain.getSelectedCellIndices()[0];
	
	// 선택된 cell의 컬럼을 반환합니다.
	var detailColumn = grdMain.detail.getColumn(selectCell.cellIndex);
	
	// 선택된 GridColumn 배열을 반환합니다.
	var headerColumn = grdMain.header.getColumnByColIndex(detailColumn.colIndex, detailColumn.colSpan);
	
	var grdDetailControl = grdMain.detail.getControl(selectCell.cellIndex);
	var bindInfo = grdDetailControl.getBindInfo("value");
	alert("["+(selectCell.cellIndex+1)+"]"+"의 바인드 된 컨트롤 "+"["+grdDetailControl.type+"]"+" 속성 정보는 "+JSON.stringify(bindInfo)+" 입니다.");
}
