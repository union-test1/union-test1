
/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd = e.control;
	
	// 선택된 cell 정보를 배열로 반환합니다.
	var selectCell = grd.getSelectedCellIndices()[0];
	
	// 선택된 cell의 컬럼을 반환합니다.
	var detailColumn = grd.detail.getColumn(selectCell.cellIndex);
	
	// 선택된 GridColumn 배열을 반환합니다.
	var headerColumn = grd.header.getColumnByColIndex(detailColumn.colIndex, detailColumn.colSpan);
	
	alert("header cell text는 "+"[ "+headerColumn[0].getText()+" ]"+ "입니다.");
}

/*
 * 그리드에서 rowgroup-click 이벤트 발생 시 호출.
 * Grid의 RowGroup 클릭시 발생하는 이벤트.
 */
function onGrd1RowgroupClick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd = e.control;
	
	alert("그리드의 RowGroup 입니다.")
}
