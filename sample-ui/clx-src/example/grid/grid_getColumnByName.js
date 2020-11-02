/*
 * Body에서 load 이벤트 발생 시 호출. 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */e) {
	var cmb1 = app.lookup("cmb1");
	var cmb2 = app.lookup("cmb2");

	var dataSet = app.lookup("list");
	// 모든 컬럼의 Header들을 배열형태로 반환합니다.
	var dsHeader = dataSet.getHeaders(cpr.data.header.HeaderType.ALL);

	var cmb1_items = [];
	var cmb2_items = [];
	for (var i = 0; i < dsHeader.length; i++) {
		// 데이터셋 Header명으로 아이템을 생성합니다.
		cmb1_items[i] = new cpr.controls.Item(dsHeader[i].getName(), i);
		cmb2_items[i] = new cpr.controls.Item(dsHeader[i].getName(), dsHeader[i].getName());
	}
	// 콤보박스 아이템 목록을 설정합니다.
	cmb1.setItems(cmb1_items);
	cmb2.setItems(cmb2_items);
}

/*
 * "getColumn" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {
	var cmb1 = app.lookup("cmb1");
	// 선택된 아이템들을 반환합니다.
	var selection = cmb1.getSelection();

	if (selection.length == 0) {
		alert("콤보박스를 선택해 주세요.");
		return;
	}

	var value = selection[0].value;
	var grdMain = app.lookup("grdMain");
	alert("[getColumn을 통해 가져온 GridColumn 객체의 columnName]: " + grdMain.detail.getColumn(Number(value)).columnName);

}

/*
 * "getColumnByName" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */e) {
	var cmb2 = app.lookup("cmb2");
	// 선택된 아이템들을 반환합니다.
	var selection = cmb2.getSelection();

	if (selection.length == 0) {
		alert("콤보박스를 선택해 주세요.");
		return;
	}

	var value = selection[0].value;
	var grdMain = app.lookup("grdMain");
	alert("[getColumnByName을 통해 가져온 GridColumn 배열의 length]: " + grdMain.detail.getColumnByName(value).length);

}
