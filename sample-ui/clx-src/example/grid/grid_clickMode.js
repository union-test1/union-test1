
/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb1 = e.control;
	var grd1 = app.lookup("grd1");

	var selection = e.newSelection;
	if(selection.value == "edit") {
		grd1.clickMode = "edit";
	} else {
		grd1.clickMode = "select";
	}
}
