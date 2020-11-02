/*
 * Body에서 init 이벤트 발생 시 호출. 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */e) {
	// 콤보박스의 데이터셋 Submission send
	app.lookup("subDeptList").send();
}
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
	/**
	 * @type cpr.protocols.Submission
	 */
	var subDeptList = e.control;

	var grd_dept = app.lookup("grd_dept");

	var cmb_ldept = app.lookup("cmb_ldept");
	var cmb_mdept = app.lookup("cmb_mdept");
	var cmb_sdept = app.lookup("cmb_sdept");

	// 모든 콤보박스의 filter를 제거
	cmb_ldept.clearFilter();
	cmb_mdept.clearFilter();
	cmb_sdept.clearFilter();

	grd_dept.redraw();

}

/*
 * 그리드에서 before-editrow-change 이벤트 발생 시 호출. Grid의 edit row가 변경되기 전에 발생하는 이벤트 입니다.
 */
function onGrd1BeforeEditrowChange(/* cpr.events.CGridEvent */e) {
	/**
	 * @type cpr.controls.Grid
	 */
	var grd_dept = e.control;
	/**
	 * @type cpr.controls.provider.GridRow
	 */
	var newRow = e.newSelection; // editing mode의 row
	var cmb_ldept = app.lookup("cmb_ldept");
	var cmb_mdept = app.lookup("cmb_mdept");
	var cmb_sdept = app.lookup("cmb_sdept");
	if (newRow) {
		// 콤보박스에 filter(regex)를 설정
		cmb_ldept.setFilter("parent == '00000'");
		cmb_mdept.setFilter("parent == '" + newRow.getValue("ldept") + "'");
		cmb_sdept.setFilter("parent == '" + newRow.getValue("mdept") + "'");
	}
	grd_dept.redraw();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출. ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb_ldeptSelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.ComboBox
	 */
	var cmb_ldept = e.control;
	var cmb_mdept = app.lookup("cmb_mdept");
	// 콤보박스에 filter(regex)를 설정
	cmb_mdept.setFilter("parent == '" + cmb_ldept.value + "'");

	cmb_mdept.redraw();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출. ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb_mdeptSelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.ComboBox
	 */
	var cmb_mdept = e.control;
	var cmb_sdept = app.lookup("cmb_sdept");
	// 콤보박스에 filter(regex)를 설정
	cmb_sdept.setFilter("parent == '" + cmb_mdept.value + "'");
	cmb_sdept.redraw();
}
