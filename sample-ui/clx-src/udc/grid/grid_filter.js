exports.getCondition = function() {
	
	var dm = app.lookup("dm1");
	var condition = "";
	var columnName =  dm.getValue("columnName");
	var compareOperator =  dm.getValue("compareOperator");
	var value =  dm.getValue("columnName");
	
	if (columnName != "" && compareOperator != "" && value != "") {
		if (dm.getValue("logicalOperator") != "") {
			condition += dm.getValue("logicalOperator") + " "; 
		}
		condition += dm.getValue("columnName") + " ";
		condition += dm.getValue("compareOperator") + " "; 
		condition += "'" + dm.getValue("value") + "'";
	}

	
	return condition;
};

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
	var propertyName = e.property;
	
	if (propertyName == "visible_logical_operator") {
		app.lookup("cmb1").redraw();
		
	} else if (propertyName == "column_dataset") {
		var cmb2 = app.lookup("cmb2");
		cmb2.setItemSet(e.newValue, {label : "label", value : "value"});
		cmb2.redraw();
	}
}

