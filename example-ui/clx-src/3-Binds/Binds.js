function onRdb1SelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb1 = e.control;
	cpr.I18N.INSTANCE.currentLanguage = rdb1.value;
}

/*
 * Triggered when click event is fired from Button "Show a message".
 */
function onButtonClick7( /* cpr.events.CMouseEvent */ e) {
	alert(cpr.I18N.INSTANCE.message("hello"));
}

function updateResult(/* cpr.events.CValueChangeEvent */ e){
	app.lookup("resultField").redraw();	
}
