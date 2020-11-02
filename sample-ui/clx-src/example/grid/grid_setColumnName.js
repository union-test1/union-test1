
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var fromCmb = app.lookup("from_cmb");
	var toCmb = app.lookup("to_cmb");
	var dataSet = app.lookup("resList");
	// 모든 컬럼의 컬럼명을 배열형식으로 반환합니다.
	var dsHeader = dataSet.getColumnNames(cpr.data.header.HeaderType.ALL);
	var items = [];
	
	for(var i=0; i<dsHeader.length; i++){
		// 데이터셋 Header명으로 아이템을 생성합니다.
		items[i] = new cpr.controls.Item(dsHeader[i], i);
	}
	
	// 콤보박스 아이템 목록을 설정합니다.
	fromCmb.setItems(items);
	toCmb.setItems(items);
}

/*
 * "setColumnName" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var setColumnName = e.control;
	var fromCmb = app.lookup("from_cmb");
	var toCmb = app.lookup("to_cmb");
	var grdMain = app.lookup("grdMain");
	// 콤보박스 데이터 중 선택된 첫번째 데이터를 반환합니다.
	var fromCmbSelect = fromCmb.getSelectionFirst();
	var toCmbSelect = toCmb.getSelectionFirst();

	if(fromCmbSelect == null || toCmbSelect == null){
		cpr.core.NotificationCenter.INSTANCE.post("notice", "콤보박스를 선택해 주세요.");
		return;
	}else if(fromCmbSelect == toCmbSelect){
		cpr.core.NotificationCenter.INSTANCE.post("notice", "같은 값을 선택 할 수 없습니다.");
		return;
	}
	
	// 해당 cell에 매핑된 데이터셋의 컬럼명을 설정합니다. (Detail 영역의 셀에만 컬럼명이 존재할 수 있습니다.)
	grdMain.detail.getColumn(Number(fromCmbSelect.value)).columnName = toCmbSelect.label;
}

