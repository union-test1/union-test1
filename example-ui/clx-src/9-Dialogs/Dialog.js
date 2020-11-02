/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	if (app.getHost() == null) {
		close();
	} else {
		app.getHost().style.animateTo({
			"opacity": "0",
			"transform": "translateY(50px) rotateX(-90deg)"
		});
		app.getHost().addEventListenerOnce("animation-end", function() {
			close();
		});
	}

}

function close() {
	app.close({
		name: app.lookup("nameField").value,
		gender: app.lookup("genderField").value,
		age: app.lookup("ageField").value
	});
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	if (e.property == "initData") {
		app.lookup("genderField").value = e.newValue["gender"];
		app.lookup("nameField").value = e.newValue["name"];
		app.lookup("ageField").value = e.newValue["age"];
	}
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	if (app.getHost() == null) {
		app.close(null);
	} else {
		app.getHost().style.animateTo({
			"transform": "translateY(-200px)",
			"opacity": "0"
		});
		app.getHost().addEventListenerOnce("animation-end", function(e) {
			app.close(null);
		});
	}
}