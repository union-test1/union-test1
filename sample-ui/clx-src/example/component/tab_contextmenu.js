function convertBooleanByValue(value) {
	if (value == "true") {
		return true;
	}
	return false;
}

function convertNumberByValue(value) {
	if (!isNaN(value)) {
		return parseInt(value);
	}
	return 0;
}
/*
 * "Apply" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var id = "col2_" + btn1.userattr("index");
	var property = btn1.userattr("property");
	var control = app.lookup(id);
	var tree = app.lookup("tab1");
	if (control.type == "radiobutton") {
		tree[property] = convertBooleanByValue(control.value);
	} else if (control.type == "numbereditor") {
		tree[property] = convertNumberByValue(control.value);
	} else {
		tree[property] = control.value;
	}
	tree.redraw();

}

/*
 * "execute" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	var textarea = app.lookup("txa1");
	eval(textarea.value);
}

/*
 * 탭 폴더에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onTab1Contextmenu( /* cpr.events.CMouseEvent */ e) {
	//시스템 컨텍스트 메뉴를 방지합니다.
	e.preventDefault();
	
	var targetItem = e.targetObject.item; //마우스 포인터에 해당되는 탭아이템을 가져옵니다.
	var menu = new cpr.controls.Menu("ctxmenu"); // 메뉴를 생성합니다.

	// blur이벤트 핸들러 입니다.
	menu.addEventListener("blur", function(e) {
		// 컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();
	});

	menu.addEventListener("selection-change", function(e) {
		//컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();

		var newSelection = e.newSelection[0];
		var tabFolder = app.lookup("tab1");

		if (newSelection.label == "모든 탭 닫기") {
			tabFolder.closeAll();
		}
		if (newSelection.label == "다른 탭 닫기") {
			tabFolder.closeOthers(targetItem);
		}
	});

	//탭폴더 버튼과 헤더에 따른 메뉴 구성
	if (targetItem) {
		// contextmenu 아이템 입니다.
		(function(ctxmenu) {
			ctxmenu.addItem(new cpr.controls.MenuItem("다른 탭 닫기", "value1", ""));
			ctxmenu.addItem(new cpr.controls.MenuItem("모든 탭 닫기", "value2", ""));

		})(menu);

	} else {
		// contextmenu 아이템 입니다.
		(function(ctxmenu) {
			ctxmenu.addItem(new cpr.controls.MenuItem("모든 탭 닫기", "value2", ""));
		})(menu);

	}

	//메뉴가 마우스 포인터에 위치 할 수 있도록 조정
	var appRect = app.getActualRect();
	menu.style.css({
		position: "absolute",
		top: "" + (e.clientY - appRect.top) + "px",
		left: "" + (e.clientX - appRect.left) + "px",
		width: "180px"
	});

	//컨트롤을 최상위 위치에 설정
	app.floatControl(menu);

	//blur되었을시 사라질수 있도록 focus 할당
	menu.focus();
}