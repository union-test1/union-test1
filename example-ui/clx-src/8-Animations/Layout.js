/*
 * 
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	var combo = app.lookup("cmb1");

	/*
	 * 타이밍 함수들을 콤보 박스의 아이템으로 등록.
	 */
	Object.keys(cpr.animation.TimingFunction).forEach(function( /* String */ each) {
		if (typeof cpr.animation.TimingFunction[each] == "string") {
			combo.addItem(new cpr.controls.Item(each, cpr.animation.TimingFunction[each]));
		}
	});

	combo.value = cpr.animation.TimingFunction.EASE_IN_OUT_BACK;
}

/*
 * "Click Me" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	app.getContainer().updateConstraint(button, {
		left: Math.random() * 400 + "px",
		top: Math.random() * 300 + 60 + "px",
		width: Math.random() * 100 + 100 + "px",
		height: Math.random() * 30 + 25 + "px"
	});
}

/*
 * 슬라이더에서 value-change 이벤트 발생 시 호출.
 * 애니메이션 길이 변경.
 */
function onSld1ValueChange( /* cpr.events.CValueChangeEvent */ e) {
	cpr.animation.TimingFunction
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	app.getContainer().getLayout().animationDuration = parseFloat(sld1.value);
	app.lookup("durationLabel").value = sld1.value + "s";

}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * 애니메이션 타이밍 함수 변경.
 */
function onCmb1SelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cmb1 = e.control;
	app.getContainer().getLayout().animationTimingFunction = cmb1.value;
}