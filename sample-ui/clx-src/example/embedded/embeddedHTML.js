
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){

	var embp1 = app.lookup("embp1");
	
	// 임베디드 페이지의 property를 반환합니다.
	var name = embp1.getPageProperty("name");
	
	// 임베디드 페이지의 해당 method를 호출합니다.
	embp1.callPageMethod("messagebox", "welcome "+ name);
	
}
