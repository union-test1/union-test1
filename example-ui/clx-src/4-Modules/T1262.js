/************************************************
 * T1262.js
 * Created at 2018. 9. 17. 오전 10:07:56.
 *
 * @author jeeeyul
 ************************************************/

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	var chlidren = app.getContainer().getChildren();
	chlidren.forEach(function( /* cpr.controls.UIControl */ each) {
		if (each instanceof cpr.controls.Grid) {
			setup(each);
		}
	});
}

/**
 * 그리드를 더블 클릭할 경우, 전체 화면으로 열리도록 셋업 합니다.
 * @param {cpr.controls.Grid} grid
 */
function setup(grid) {
	grid.addEventListener("dblclick", function(e){
		grid.getPopOutKit().popout();
	});
}