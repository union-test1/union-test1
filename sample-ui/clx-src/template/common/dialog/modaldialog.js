// 공통 Util
var comUtil = createComUtil(app);

/*
 * "open" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {

	// 공통 Util의 openDialog를 사용해서 다이얼로그를 띄웁니다.
	comUtil.openDialog("example/dialog/popup/popup1", 500, 300, function(/* cpr.events.CUIEvent */e) {
		var dialog = e.control;
		// 다이얼로그의 returnValue를 반환합니다.
		var returnValue = dialog.returnValue;
		if (returnValue == null) {
			return;
		}
		
		var dm1 = app.lookup("dm1");
		dm1.build(dialog.returnValue);
		app.lookup("grp1").redraw();
		
	});
}
