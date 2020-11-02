var menuHidden = false;
var menuLockedByUser = false;

/**
 * MDI 폴더에 새 앱을 추가합니다.
 * 
 * @param {String} appID 열 App ID
 * @param {Object} initValue 앱에 전달할 initValue
 * @param {Boolean} selected 탭 선택 여부.
 */
function openApp(appID, initValue, selected) {
	app.lookup("mdi").addItemWithApp(appID, selected, function(item) {
		/** 
		 * 탭 아이템에 앱 ID및 초기 벨류를 사용자 정의 속성으로 등록합니다.
		 * 해당 탭이 추가되었더라도, 사용자가 선택하여 열지 않으면, 임베딩 된 앱이 실행되지 않기 때문에, 
		 * 앱 속성에 접근할 수 없을 수도 있기 때문입니다.
		 */
		item.userAttr({
			"appID": appID,
			"initValue": JSON.stringify(initValue) // 사용자 정의 속성은 문자열만 저장할 수 있습니다.
		});

		/** @type cpr.controls.EmbeddedApp */
		var embeddedApp = item.content;
		// 내장된 앱의 인스턴스가 만들어져 실행 된 후에 init Value를 전달합니다.
		embeddedApp.addEventListenerOnce("app-ready", function(e) {
			embeddedApp.setAppProperty("initValue", initValue);
		})
	});
}

function saveTabs() {
	var mdi = app.lookup("mdi");

	var data = [];
	// 열려있는 모든 탭 아이템을 데이터로 변환.
	mdi.getTabItems().forEach(function( /* cpr.controls.TabItem */ item) {
		data.push({
			// 앱 ID
			appID: item.userAttr("appID"),
			// 앱의 initValue
			initValue: JSON.parse(item.userAttr("initValue")),
			selected: mdi.getSelectedTabItem() == item
		});
	});

	localStorage.setItem("mdi-items", JSON.stringify(data));

	console.log("saved");
}

/**
 * 탭을 로드 합니다.
 */
function loadTabs() {
	// 저장된 데이터가 없는 경우.
	if (localStorage.getItem("mdi-items") == null) {
		return;
	}

	// 로컬스토리에서 탭 상태를 불러 옵니다.
	/** @type Array */
	var storedItemList = JSON.parse(localStorage.getItem("mdi-items"));

	var mdi = app.lookup("mdi");

	// 각각의 아이템들을 복원합니다.
	storedItemList.forEach(function(each) {
		openApp(each.appID, each.initValue, each.selected);
	});
}

function onLbx1Dblclick( /* cpr.events.CMouseEvent */ e) {
	/**
	 * @type cpr.controls.ListBox
	 */
	var lbx1 = e.control;
	var selection = lbx1.getSelection()[0];
	openApp(selection.value, {
		a: 4
	}, true);
}

/*
 * "모두 닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	/** @type cpr.controls.Button */
	var button = e.control;
	app.lookup("mdi").closeAll();

}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	loadTabs();

	// 페이지가 종료될 경우, 탭들을 저장함.
	window.addEventListener("beforeunload", function(e) {
		saveTabs();
	});
}

/*
 * "테스트" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var mdi = app.lookup("mdi");
	var item = mdi.findItemWithAppID("5-Grid/Massive-Grid");
	item.text = "Test";
}

/**
 * 
 * @param {Boolean} byUser
 */
function toggleMenu(byUser) {
	if (menuLockedByUser && !byUser) {
		return;
	}
	if (byUser) {
		menuLockedByUser = true;
	}

	var leftMenu = app.lookup("lbx1");
	var mdi = app.lookup("mdi");
	var mnuBtn = app.lookup("mnuBtn");

	if (!menuHidden) {
		var container = app.getContainer();

		container.updateConstraint(leftMenu, {
			left: "-220px"
		});

		container.updateConstraint(mdi, {
			left: "10px"
		});

	} else {
		var container = app.getContainer();

		container.updateConstraint(leftMenu, {
			left: "10px"
		});

		container.updateConstraint(mdi, {
			left: "220px"
		});
	}
	menuHidden = !menuHidden;

	if (menuHidden) {
		mnuBtn.value = "메뉴 열기";
	} else {
		mnuBtn.value = "메뉴 닫기";
	}
	mnuBtn.style.animateFrom({
		"opacity": "0"
	});

}

/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange( /* cpr.events.CScreenChangeEvent */ e) {
	if (e.screen.name != "default" && !menuHidden) {
		toggleMenu(false);
	} else if (e.screen.name == "default" && menuHidden) {
		toggleMenu(false);
	}
}

/*
 * "<" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4( /* cpr.events.CMouseEvent */ e) {
	toggleMenu(true);
}