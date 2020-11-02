var _controls = ["hour", "min"];//컨트롤의 아이디


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	if (e.property == "opt1") {
		
		/**
		 * @type string
		 */
		var splitedValue = e.newValue.split(":");
		//UDC의 변경된 속성 값을 컨트롤과 UDC의 value를 설정합니다. 
		for (var i = 0; i < splitedValue.length; i++) {
			var control = app.lookup(_controls[i]);
			control.value = splitedValue[i];
		}
	}
}

/*
 * 콤보 박스에서 before-selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onMinBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	var oldValue = app.getAppProperty("value");
	var values = oldValue.split(":");
	
	if (cmb1.userAttr("type") == "hour") {
		values[0] = e.newSelection[0].value;
	} else {
		values[1] = e.newSelection[0].value;
	}
	
	var newValue = values.join(":");

	app.setAppProperty("value", newValue, false); //속성 값 설정
	var event = new cpr.events.CUIEvent("selection-change", {
		content: newValue
	});
	app.dispatchEvent(event);
	e.preventDefault();
}

if(!cpr.expression.ExpressionEngine.INSTANCE.getFunction("val")){
	cpr.expression.ExpressionEngine.INSTANCE.registerFunction("val",function(opt,index){
		if(opt){
			var value = opt.value;
			return value.split(":")[index];
		}
		return "";
	});

}

