/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
}

/*
 * "나타나기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	var btn1 = app.lookup("btn1");
	btn1.visible = true
	btn1.style.animateFrom({
		"transform": "rotateX(-90deg)"
	}, 0.3, cpr.animation.TimingFunction.EASE_OUT_BACK);
}

/*
 * "강조" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	var btn2 = app.lookup("btn2");
	btn2.style.animateAndReverse({
		"transform": "translateZ(500px) rotateZ(45deg)",
		"color": "red"
	});
}

/*
 * "사라지기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3( /* cpr.events.CMouseEvent */ e) {
	var btn3 = app.lookup("btn3");
	btn3.style.animateTo({
		"transform": "translateZ(-500px)",
		"opacity": "0"
	});
}