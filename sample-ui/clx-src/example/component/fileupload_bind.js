/************************************************
 * fileupload.js
 * Created at 2018. 8. 13. 오후 5:38:01.
 * 
 * @author leeds
 ************************************************/



/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	
	if(cmb1.value == "en"){
		cpr.I18N.INSTANCE.currentLanguage = "en";
	}else if(cmb1.value == "ja"){
		cpr.I18N.INSTANCE.currentLanguage = "ja";
	}else{
		cpr.I18N.INSTANCE.currentLanguage = "ko";
	}
}


