/************************************************
 * PopUpTextArea.js
 * Created at 2018. 8. 8. 오전 10:50:52.
 *
 * @autohr jeeeyul
 ************************************************/

/** @type cpr.controls.TextArea */
var knownTextArea;

function disposeKnownTextAreaIfNeeded() {
	if (knownTextArea) {
		knownTextArea.dispose();
		knownTextArea = null;
	}
}

/**
 * 줄바꿈 및 공백을 정리 하여 한 줄의 텍스트로 만듭니다.
 * @param {String} text 정리할 문자열.
 */
function trimText(text) {
	return (text || "").replace(/[\r\n\s]+/g, " ");
}

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function() {
	return trimText(app.getAppProperty("value"));
};

/*
 * 그리드 편집모드에서, UDC 컨트롤을 그리기 직전에 호출 됩니다.
 */
function onBodyBeforeDraw( /* cpr.events.CUIEvent */ e) {
	// 아웃풋의 값을 앱 속성에서 가져와 넣습니다.
	app.lookup("output").value = trimText(app.getAppProperty("value"));
}

/*
 * 아웃풋에서 click 이벤트 발생 시 호출.
 */
function onOutputClick( /* cpr.events.CMouseEvent */ e) {
	var output = e.control;

	disposeKnownTextAreaIfNeeded();

	// 텍스트 에리어를 만듭니다.
	var ta = new cpr.controls.TextArea();
	ta.autoSelect = false;

	//readOnly속성 전달받아 셋팅함 - 2018.08.10 dnsgml
	var vbReadOnly = app.getAppProperty("readOnly");
	ta.readOnly = vbReadOnly;

	// 현재 value 값을 텍스트 에리어에 넣습니다.
	ta.value = app.getAppProperty("value");

	// 텍스트 에리어를 표시할 위치 및 크기 를 잡습니다.
	var offset = output.getActualRect();
	ta.style.css({
		"position": "absolute",
		"left": offset.left + "px",
		"top": offset.top + offset.height + "px",
		"width": offset.width + "px",
		"min-width": "200px" /* 컬럼으 너무 좁을 경우를 대비 */ ,
		"height": "100px"
	});

	// 텍스트 에리어가 포커스를 잃으면 value를 수정하고, 텍스트 에리어를 파기 시킵니다.
	ta.addEventListenerOnce("blur", function(e) {
		console.log("blur");
		if (app.getAppProperty("value") != ta.value) {
			app.setAppProperty("value", ta.value, true);
		}
		ta.dispose();
	});

	// 텍스트 에리어를 플로팅 시킵니다.
	app.getRootAppInstance().floatControl(ta);

	// 포커스 지정.
	ta.focus();

	knownTextArea = ta;

	console.log("ta.uuid :: " + ta.uuid);
}