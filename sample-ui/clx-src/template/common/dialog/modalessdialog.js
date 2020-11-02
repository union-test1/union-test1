// 공통 Util
var comUtil = createComUtil(app);

/*
 * "open" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	comUtil.openModalessDialog("example/dialog/popup/popup1", 500, 300, function(/* cpr.events.CUIEvent */e) {
		var dialog = e.control;
		var returnValue = dialog.returnValue;
		if (returnValue == null) {
			return;
		}
		
		var dm1 = app.lookup("dm1");
		dm1.build(dialog.returnValue);
		app.lookup("grp1").redraw();
		
	})
}
