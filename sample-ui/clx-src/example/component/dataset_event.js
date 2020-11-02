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
 * 데이터셋에서 before-insert 이벤트 발생 시 호출.
 * row가 추가되기 전에 발생하는 이벤트. 발생 메소드 : addRow, addRowData, insertRow, insertRowData
 */
function onDs1BeforeInsert(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	eventLog("dataset before-insert");
}

/*
 * 데이터셋에서 insert 이벤트 발생 시 호출.
 * row가 추가되는 경우 발생하는 이벤트. 발생 메소드 : addRow, addRowData, insertRow, insertRowData
 */
function onDs1Insert(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	eventLog("dataset insert");
}

/*
 * 데이터셋에서 before-update 이벤트 발생 시 호출.
 * 데이터가 수정되기 전에 발생하는 이벤트. 발생 메소드 : setValue, updateRow
 */
function onDs1BeforeUpdate(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	eventLog("dataset before-update");
}

/*
 * 데이터셋에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue, updateRow
 */
function onDs1Update(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	eventLog("dataset update");
}

/*
 * 데이터셋에서 before-delete 이벤트 발생 시 호출.
 * 로우가 삭제되기 전에 발생하는 이벤트. 발생 메소드 : deleteRow
 */
function onDs1BeforeDelete(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	eventLog("dataset before-delete");
}
/*
 * 데이터셋에서 delete 이벤트 발생 시 호출.
 * 로우가 삭제되는 경우 발생하는 이벤트. 발생 메소드 : deleteRow
 */
function onDs1Delete(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	eventLog("dataset delete");
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
