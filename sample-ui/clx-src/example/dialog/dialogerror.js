
/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 데이터를 전송합니다.
	app.lookup("subMain").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubMainSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subMain = e.control;
	
	app.lookup("grd1").redraw();
}

/*
 * 그리드에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGrd1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	// 현재 선택된 row index 배열을 반환합니다.
	var selectedRowIndexes = grd1.getSelectedRowIndices();
	if(Array.isArray(selectedRowIndexes) && selectedRowIndexes.length > 0) {
		
		// 해당하는 row index의 GridRow객체를 반환합니다.
		var gridRow = grd1.getRow(selectedRowIndexes[0]);
		
		// 입력 받은 컬럼명에 해당하는 값을 반환합니다.
		var col1 = gridRow.getValue("column1");
		var col2 = gridRow.getValue("column2");
		var col3 = gridRow.getValue("column3");
		var col4 = gridRow.getValue("column4");
		
		var colValue = col1 + col2 + col3 + col4;
		
		// 앱에서 다이얼로그를 open합니다.
		app.openDialog("example/dialog/dialogerror", {width:500, height:450}, function(/* cpr.controls.Dialog */dlg) {
			dlg.style.overlay.css({
				backgroundColor : "#000000",
				opacity : "0.6"
			});
			
		});
	}
}
