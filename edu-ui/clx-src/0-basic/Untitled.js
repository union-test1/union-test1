/************************************************
 * Untitled.js
 * Created at 2019. 5. 22. 오후 3:20:18.
 *
 * @author joymrk
 ************************************************/


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/*
	var dm = app.lookup("dm1");
	dm.setValue("column1", 5);
	console.log(dm.getDatas());
	dm.reset();
	console.log(dm.getDatas());
	dm.clear();
	console.log(dm.getDatas());
	*/
	
	var a = " 1 2 3 ";
	var str = a.replace(/\s/g, "");
	console.log(str);
}
