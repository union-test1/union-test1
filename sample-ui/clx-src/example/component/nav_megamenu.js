function convertRadioValue(value){
	if(typeof value == "string"){
		if(value == "true"){
			return true;
		}else if(value == "false"){
			return false;
		}
	}
	return value;
}
/*
 * "Apply" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var id = "col2_"+btn1.userattr("index");
	var property = btn1.userattr("property");
	var control = app.lookup(id);
	var nav = app.lookup("nav1");
	if(control.type == "radiobutton"){
		nav[property] = convertRadioValue(control.value);
	}else{
		nav[property] = control.value;
	}
	
}
/*
 * "execute" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	
	var txa = app.lookup("txa1");
	eval(txa.value);
}
