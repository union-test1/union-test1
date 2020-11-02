/************************************************
 * dialogevent.js
 * Created at 2018. 8. 27. 오전 10:39:26.
 *
 * @author hyeran
 ************************************************/



/*
 * "openDialog" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.openDialog("example/dialog/popup/dialogevent_popup", {width:500, height:400}, function(dialog) {
		
//		dialog.addEventListener("close", function(e){
//			console.log("dialog.returnValue : " + dialog.returnValue);
//		});
		
	}).then(function(returnValue){
		console.log("returnValue : " + returnValue);
		app.lookup("opt_result").value = returnValue;
	});
}
