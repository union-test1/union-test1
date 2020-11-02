function eventLog(text) {
	
	var txa1 = app.lookup("txa1");
	var date = new Date();
	var hours = date.getHours();
	hours = (hours < 10) ? "0"+hours : ""+hours;
	var minutes = date.getMinutes();
	minutes = (minutes < 10) ? "0"+minutes : ""+minutes;
	var seconds = date.getSeconds();
	seconds = (seconds < 10) ? "0"+seconds : ""+seconds;
	var time = hours + ":" + minutes + ":" + seconds;

	var value = time + " : " + text;
	if (txa1.value != null && txa1.value != "") {
		value += "\n" +txa1.value;
	}
	txa1.value = value;
	
}

/*
 * "insert" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd = app.lookup("grd1");
	var selectRow = grd.getSelectedRow();
	
	if (selectRow != null) {
		grd.insertRow(selectRow.getIndex(), true);
	} else {
		grd.insertRow(0, false);
	}
	
}

/*
 * "delete" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd = app.lookup("grd1");
	var selectRow = grd.getSelectedRow();
	
	if (selectRow != null) {
		grd.deleteRow(selectRow.getIndex());
	} else {
		alert("선택된 행이 없습니다.");
	}
	
}

/*
 * "clear" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){

	var txa1 = app.lookup("txa1");
	txa1.value = "";
}

/*
 * 그리드에서 before-insert 이벤트 발생 시 호출.
 * Grid의 행이 추가되기 전에 발생하는 이벤트.
 */
function onGrd1BeforeInsert(/* cpr.events.CGridEvent */ e){
	
	eventLog("grid before-insert");
}

/*
 * 그리드에서 insert 이벤트 발생 시 호출.
 * Grid의 행이 추가되었을 때 이벤트.
 */
function onGrd1Insert(/* cpr.events.CGridEvent */ e){
	
	eventLog("grid insert");
	
}

/*
 * 그리드에서 before-update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되기 전에 발생하는 이벤트.
 */
function onGrd1BeforeUpdate(/* cpr.events.CGridEvent */ e){
	
	eventLog("grid before-update");
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrd1Update(/* cpr.events.CGridEvent */ e){

	eventLog("grid update");
	
}

/*
 * 그리드에서 before-delete 이벤트 발생 시 호출.
 * Grid의 행이 삭제되기 전에 발생하는 이벤트.
 */
function onGrd1BeforeDelete(/* cpr.events.CGridEvent */ e){

	eventLog("grid before-delete");
}

/*
 * 그리드에서 delete 이벤트 발생 시 호출.
 * Grid의 행이 삭제되었을 때 이벤트.
 */
function onGrd1Delete(/* cpr.events.CGridEvent */ e){
	
	eventLog("grid delete");
}
