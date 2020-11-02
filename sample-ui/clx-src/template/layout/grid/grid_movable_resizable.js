/************************************************
 * grid_movable_resizable.js
 * Created at 2018. 8. 14. 오전 9:23:03.
 * 
 * @author leeds
 ************************************************/



/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	
	app.lookup("sms_list").send();
}
