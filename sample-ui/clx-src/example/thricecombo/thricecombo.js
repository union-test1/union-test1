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
function onSubDeptListSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {

	var cmb1 = app.lookup("cmb1");
	var cmb2 = app.lookup("cmb2");
	var cmb3 = app.lookup("cmb3");

	// 콤보박스에 filter(regex)를 설정
	cmb1.setFilter("parent == \"00000\"");
	cmb2.setFilter("parent == \"" + cmb1.value + "\"");
	cmb3.setFilter("parent == \"" + cmb2.value + "\"");

	app.lookup("grp").redraw();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출. ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;

	var cmb2 = app.lookup("cmb2");
	// 콤보박스에 filter(regex)를 설정
	cmb2.setFilter("parent == \"" + cmb1.value + "\"");
	cmb2.redraw();
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출. ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb2SelectionChange(/* cpr.events.CSelectionEvent */e) {
	/**
	 * @type cpr.controls.ComboBox
	 */
	var cmb2 = e.control;

	var cmb3 = app.lookup("cmb3");
	// 콤보박스에 filter(regex)를 설정
	cmb3.setFilter("parent == \"" + cmb2.value + "\"");
	cmb3.redraw();
}
