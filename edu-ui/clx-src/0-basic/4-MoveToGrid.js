/************************************************
 * MoveToGrid.js
 * Created at 2018. 10. 8. 오전 10:49:45.
 *
 * @author ryu
 ************************************************/

/**
 * 선택된 Row를 이동시킨다.
 * @param fromGridId
 * @param toGridId
 */
function moveGridData(fromGridId, toGridId){
	/** @type cpr.controls.Grid */
	var fromGrid = app.lookup(fromGridId);
	
	/** @type cpr.controls.Grid */
	var toGrid = app.lookup(toGridId);
	
	var indices = fromGrid.getSelectedRowIndices();
	if(!indices || indices.length == 0){
		return;
	}
	
	var rows = fromGrid.getSelectedRows();
	
	rows.forEach(function(/* cpr.controls.provider.GridRow */ row){
		var insertRow = toGrid.insertRowData(toGrid.rowCount, true, row.getRowData());
	});
	
	fromGrid.deleteRow(indices);
	
	fromGrid.clearSelection();
	toGrid.clearSelection();
}

/**
 * Grid의 모든 Row를 이동시킨다.
 * @param fromGridId
 * @param toGridId
 */
function moveAllGridData(fromGridId, toGridId){
	/** @type cpr.controls.Grid */
	var fromGrid = app.lookup(fromGridId);
	
	/** @type cpr.controls.Grid */
	var toGrid = app.lookup(toGridId);
	
	if(fromGrid.rowCount == 0){
		return;
	}
	
	var indices = [];
	for(var rowIndex = 0 ; rowIndex < fromGrid.rowCount ; rowIndex++){
		var insertRow = toGrid.insertRowData(toGrid.rowCount, true, fromGrid.getRow(rowIndex).getRowData());
		indices.push(rowIndex);
	}
	
	fromGrid.deleteRow(indices);
}

/*
 * ">" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	moveGridData("grd1", "grd2");
}


/*
 * "<" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	moveGridData("grd2", "grd1");
}


/*
 * ">>" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var button = e.control;
	moveAllGridData("grd1", "grd2");
}


/*
 * "<<" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(e){
	var button = e.control;
	moveAllGridData("grd2", "grd1");
}


/*
 * "적용" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(e){
	var button = e.control;
	// 이동이 이루어진 데이터셋 상태를 기억한다.
	app.lookup("ds1").commit();
	app.lookup("ds2").commit();
	
	// 그리드에 변경사항이 표시되도록 다시 그려준다.
	app.lookup("grd1").redraw();
	app.lookup("grd2").redraw();
}
