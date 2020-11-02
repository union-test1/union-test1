/************************************************
 * listbox_ex.js
 * Created at 2018. 8. 13. 오후 4:59:31.
 * 
 * @author leeds
 ************************************************/



/*
 * "select" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	app.lookup("llb1").selectItemByValue("Item 1.2.2");
}


/*
 * "select" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	app.lookup("lcb1").selectItemByValue("Item 1.2.2");
}
