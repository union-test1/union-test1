/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	// 콤보박스에서 선택된 아이템 값으로 locale을 설정합니다.
	cpr.I18N.INSTANCE.currentLanguage = e.newSelection[e.newSelection.length-1].value;
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출. detail의 cell 클릭하여 설정된 selectionunit에 해당되는
 * 단위가 선택될 때 발생하는 이벤트입니다.
 */
function onMasterSelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var master = e.control;
	var detail = app.lookup("detail");
	var ds = app.lookup("ds1");
	var master = app.lookup("master");
	var selection = master.getSelectedRowIndices();
	// 바인드 문맥을 설정합니다.
	// detail에 그리드의 선택된 row가 바인딩 됩니다.
	detail.setBindContext(new cpr.bind.DataRowContext(ds, selection[0]));
	detail.redraw();
}
