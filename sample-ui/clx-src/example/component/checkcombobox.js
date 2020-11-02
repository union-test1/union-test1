
/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx_multipleValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbx_multiple = e.control;
	var combo = app.lookup("checkCombo");
	combo.multiple = cbx_multiple.value == "true";
	
	print("multiple", combo.multiple);
}

/*
 * "label 표기 방식 설정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var combo = app.lookup("checkCombo");
	var input = app.lookup("ipb_displayExp");
	var inputValue = input.value;
	if(inputValue != ""){
		combo.displayExp = inputValue;
	}
	
	print("displayExp", combo.displayExp);
}

/*
 * "다중 선택 시 구분자 설정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var combo = app.lookup("checkCombo");
	var input = app.lookup("ipb_delimiter");
	var inputValue = input.value;
	if(inputValue != ""){
		combo.delimiter = inputValue;
	}
	
	print("delimiter", combo.delimiter);
}

/*
 * "콤보 박스의 값 변경" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var combo = app.lookup("checkCombo");
	var input = app.lookup("ipb_value");
	var inputValue = input.value;
	if(inputValue != ""){
		combo.value = inputValue;
	}
	
	print("value", combo.value);
}


function print(name, value){
	var textarea = app.lookup("txa_print");
	var text = name + " : " + value + "\n";
	textarea.value += text;
}

/*
 * 콤보 박스에서 before-selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onCheckComboBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var checkCombo = e.control;
	print("before-selection-change", checkCombo.value);
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCheckComboSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var checkCombo = e.control;
	print("selection-change", checkCombo.value);
}
