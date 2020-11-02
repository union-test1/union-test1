/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange( /* cpr.events.CScreenChangeEvent */ e) {
	var showDetail = e.screen.name == "default"
	/** @type cpr.controls.layouts.FormLayout */
	var layout = app.lookup("grp").getLayout();
	layout.setColumnVisible(2, showDetail);
	layout.setColumnVisible(3, showDetail);
}