function onCmb1SelectionChange( /* cpr.events.CSelectionEvent */ e) {
	app.lookup("sbtn").redraw();
}

function onSegmentedButtonValueChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type udc.SegmentedButton
	 */
	var segmentedButton = e.control;
	app.lookup("cmb1").redraw();
}

/*
 * "차트 로드" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("densitySms").send().then(function() {
		var map = app.lookup("densityMap");
		map.redraw();
		map.style.animateFrom({
			"opacity": "0"
		});
	})
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("grd2").commitData();
	app.lookup("densityMap").redraw();
}

/*
 * "추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var grid = app.lookup("grd3");
	var row = grid.insertRow();
	row.setValue("label", "신규")
	row.setValue("value", "value" + row.getIndex());

	grid.selectRows(row.getIndex());
	grid.focusCell(row.getIndex(), 0);
	grid.setEditRowIndex(row.getIndex(), true);
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("grd3").commitData();
	app.lookup("treeGraph").redraw();
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var dataURL = app.lookup("signPad").getData();
	app.lookup("signImg").src = dataURL;
	app.lookup("signDataField").value = dataURL;
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("signPad").clear();
}
