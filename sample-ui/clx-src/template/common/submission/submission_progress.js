
/* Factory Function을 통해 공통 유틸 클래스 생성 */
var comutil = createComUtil(app);

/*
 * "send" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	
	comutil.send("sms1");
	
	var btn1 = app.lookup("btn1");
	btn1.blur();
}
