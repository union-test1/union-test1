
/*
 * "적용닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	
	var dm_option = app.lookup("dm_option");
	
	// 모든 컬럼에 대한 값을 json object로 반환합니다.
	var returnValue = dm_option.getDatas(); 
	
	// 임베디드 앱의 속성: "returnValue", 속성 값: returnValue로 설정합니다.
	app.setHostProperty("returnValue", returnValue);
	
	// 앱을 닫습니다.
	app.close();
	
}
