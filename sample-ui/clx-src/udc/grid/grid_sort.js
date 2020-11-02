exports.getCondition = function() {
	
	var dm = app.lookup("dm1");
	var condition = "";
	var columnName =  dm.getValue("columnName");
	var sortType =  dm.getValue("sortType");
	
	if (columnName != "" && sortType != "") {
		condition = dm.getValue("columnName") + " " + dm.getValue("sortType");
//		condition += dm.getValue("sortType") + "'";
	}
	
	return condition;
};

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	var propertyName = e.property;
	
	if(propertyName == "column_dataset"){
		var cmb1 = app.lookup("cmb1");
		cmb1.setItemSet(e.newValue, {label: "label", value: "value"});
		cmb1.redraw();
		
		var cmb2 = app.lookup("cmb2");
		cmb2.selectItemByLabel("ASC");
	}
}
