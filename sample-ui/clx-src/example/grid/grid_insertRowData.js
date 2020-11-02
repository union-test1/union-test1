
/*
 * "insertRowData" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	
	var grd = app.lookup("grdMain");
	
	// 선택된 row index를 반환합니다.
	var rowIndex = grd.getSelectedRowIndex();
	
	// 그리드에 신규 Row를 추가합니다.
	var gridRow = grd.insertRowData(rowIndex, true,
			{"column1": "newValue","column2": "newValue","column3": "newValue","column4": "newValue","column5": "newValue","column6": "newValue","column7": "newValue","column8": "newValue","column9": "newValue","column10": "newValue"});
	
	// 현재 row의 index를 반환합니다.
	rowIndex = gridRow.getIndex();
	
	// rowIndex의 row를 선택합니다.
	grd.selectRows([ rowIndex ]);
}
