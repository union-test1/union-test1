/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	var grid = app.lookup("grd1");
	var data = grid.getSelectedRow().getRowData();

	app.openDialog("9-Dialogs/Dialog", {
		width: 400,
		height: 300
	}, function(dialog) {
		dialog.ready(function() {
			dialog.setAppProperty("initData", data);
		});
		dialog.style.animateFrom({
			"opacity": "0",
			"transform": "translateY(-100px) rotateX(90deg)"
		});
	}).then(function(returnValue) {
		console.log("값이 수정되었습니다.");
		grid.getSelectedRow().setRowData(returnValue);
		grid.redraw();
	});
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick( /* cpr.events.CGridEvent */ e) {
	if (e.cellIndex == 1) {
		onButtonClick2(null);
	}
}