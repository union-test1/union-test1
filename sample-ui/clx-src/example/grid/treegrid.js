
/*
 * 그리드에서 context-value-change 이벤트 발생 시 호출.
 * 바인드컨텍스트를 가지고 있는 컨트롤에서 바인드컨텍스트를 이용해 값이 변경된 후에 발생하는 이벤트.
 */
function onGrd1ContextValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var updateColName = e.columnName;
	if(["weight", "svhc", "export_amt"].indexOf(updateColName) == -1) {
		return;
	}
	
	var rowIndex = e.context.rowIndex;
	var rowGroup = grd1.getGridRowGroup(rowIndex);
	
	if(rowGroup) {
		for(rowGroup = rowGroup.parent; rowGroup != null; rowGroup = rowGroup.parent) {
			// 합산을 구할 때 현재 RowGroup에 매핑된 GridRow의 값은 제외됩니다.
			var columnSumValue = rowGroup.getSum(updateColName);

			// RowGroup과 매핑된 GridRow 객체
			var row = rowGroup.target;
			row.setValue(updateColName, columnSumValue);
		}
	}
	grd1.redraw();
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var cellInfo = grd1.getCellInfo(e.cellIndex);
	var rowIndex = e.row.getIndex();
	var colName = cellInfo.columnName;
	var rowGroup = grd1.getGridRowGroup(rowIndex);
	
	// 트리셀 최하위 노드 존재 여부.
	console.log("최하위 노드 존재 여부 : "+e.row.isFolder());
	
	console.log(rowGroup.getSum(colName));
}



/*
 * "클릭" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var treegrid_nbe = app.lookup("treegrid_nbe");
	var dstreeCount = app.lookup("dstree").getRowCount();
	if(treegrid_nbe.value == null){
		alert("입력해주세요.")
		return;
	}
	
	if(treegrid_nbe.value > dstreeCount){
		alert("데이터 수 보다 큰 수를 입력하셨습니다.");
		return;
	}
	
	var row = app.lookup("grd1").getRow(Number(treegrid_nbe.value));
	if(row.isFolder()){
		row.expanded = !row.expanded;
	}else{
		alert("하위노드가 존재하지 않습니다.");
	}
	
}
