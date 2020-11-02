
/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if(e.property == "format"){
		app.lookup("label").format = e.newValue;
	}else if(e.property == "dataType"){
		app.lookup("dataType").datatype = e.newValue;
	}
}
