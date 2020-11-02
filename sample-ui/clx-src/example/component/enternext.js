
/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
	var ctrl = e.control;
	
	if(e.keyCode == 13) {
		// 다음 컨트롤로 포커스를 이동합니다.
		app.focusNext(ctrl);
	}
}
