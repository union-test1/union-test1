function animateButton( /* cpr.events.CMouseEvent */ e) {
	/** @type cpr.controls.Button */
	var control = e.control;
	var timingFunction = cpr.animation.TimingFunction[control.value];

	animate(control, timingFunction);
}

/**
 * 
 * @param {cpr.controls.UIControl} control
 * @param {String} timingFunction
 */
function animate(control, timingFunction) {
	var oldTransform = control.style.css("transform");
	if (!oldTransform || oldTransform == "none") {
		control.style.animateTo({
			transform: "translateX(300px)"
		}, 1, timingFunction);
	} else {
		control.style.animateTo({
			transform: "none"
		}, 1, timingFunction);
	}
}

/*
 * "All" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	app.lookup("grp").getChildren().forEach(function(each, idx) {
		if (each != button) {
			/** @type cpr.controls.Button */
			var btn = each;
			var timingFunction = cpr.animation.TimingFunction[btn.value];
			animate(btn, timingFunction);
		}
	});
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	app.lookup("grp").getChildren().forEach(function( /* cpr.controls.UIControl */ each) {
		each.style.animateFrom({
			opacity: "0",
			filter: "alpha(opacity=10)",
			transform: "translateX(-50%) rotateY(-90deg)"
		}, Math.random() * 1 + 0.3);
	});

	app.lookup("grp").style.animateFrom({
		"transform": "translateZ(-2000px) rotateY(-180deg)"
	}, 0.5, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
}