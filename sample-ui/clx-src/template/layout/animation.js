/************************************************
 * animation.js
 * Created at 2018. 8. 14. 오전 10:46:32.
 * 
 * @author leeds
 ************************************************/



/*
 * "나타나기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
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
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
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
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = app.lookup("btn3");
	btn3.style.animateTo({
		"transform": "translateZ(-500px)",
		"opacity": "0"
	});
}

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
