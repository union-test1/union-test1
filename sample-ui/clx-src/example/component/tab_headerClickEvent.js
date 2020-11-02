
var tabctxmenu = null;

// tabItem 추가 번호
var cnt = 1;

/**
 * contextmenu 생성
 * @return menu
 * */
function createContextMenu(tabFolder){
	// 메뉴 컨트롤 동적 생성
	var menu = new cpr.controls.Menu("ctxmenu");
	
	// blur이벤트 핸들러 입니다.
	menu.addEventListener("blur", function() {
		// 컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();
	});
	
	// selection-change이벤트 핸들러 입니다.
	menu.addEventListener("selection-change", function(/* cpr.events.CSelectionEvent */e){
		// 컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();
		
		// 새롭게 선택된 아이템
		var newSelect = e.newSelection[0];
		
		// "closeTab" 아이템 선택 시
		if(newSelect.label == "closeTab"){
			// 선택된 탭 아이템을 제거합니다.
			tabFolder.removeTabItem(tabFolder.getSelectedTabItem());
		}
		// "closeOthers" 아이템 선택 시
		else if(newSelect.label == "closeOthers"){
			// 파라미터로 넘겨받은 탭 아이템을 제외한 나머지 탭 아이템을 닫습니다.
			tabFolder.closeOthers(tabFolder.getSelectedTabItem());
		}
		// "closeAll" 아이템 선택 시
		else{
			// 모든 탭 아이템을 닫습니다.
			tabFolder.closeAll();
		}
	});
	
	// contextmenu 아이템 입니다.
	(function(ctxmenu){
		ctxmenu.addItem(new cpr.controls.MenuItem("closeTab", "value1", "root"));
		ctxmenu.addItem(new cpr.controls.MenuItem("closeOthers", "value2", "root"));
		ctxmenu.addItem(new cpr.controls.MenuItem("closeAll", "value3", "root"));
	})(menu);
	return menu;
}

/*
 * 탭 폴더에서 tabheader-click 이벤트 발생 시 호출.
 * 탭 아이템의 헤더 영역을 클릭하였을 때 발생하는 이벤트 입니다.
 */
function onTabFolderTabheaderClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tabFolder = e.control;
	
	// 마우스를 눌렀을 때 이벤트를 트리거 한 버튼을 나타냅니다.
	// no button = 0, left button = 1,
	// middle button = 2, right button = 3
	if(e.which == 3){
		
		var targetItem = e.item;
		// 우클릭 했을 때 targetItem으로 탭 아이템을 지정합니다.
		tabFolder.setSelectedTabItem(targetItem);
		
		// 다음 기본 동작을 방지합니다.
		e.preventDefault();
		
		// 캡처 및 버블링 단계에서 현재 이벤트의 추가 전파를 방지합니다.
		e.stopPropagation(true);
		
		if (tabctxmenu) {
			// 앱에 띄워져 있는 tabctxmenu를 제거합니다.
			app.removeFloatingControl(tabctxmenu, false);
		}
		
		// 앱이 실제 그려진 사이즈를 반환합니다. 화면에 그려지지 않은 상태인 경우는 모든 값이 0인 객체가 반환됩니다.
		var appRect = app.getActualRect();
		
		tabctxmenu = createContextMenu(tabFolder);
		tabctxmenu.style.css({
			position : "absolute",
			top : "" + (e.clientY - appRect.top) + "px",
			left : "" + (e.clientX - appRect.left) + "px",
			width : "150px"
		});
		
		// 앱 내부 특정 위치에 컨트롤을 위치시킵니다.
		app.floatControl(tabctxmenu);
		
		// tabctxmenu에 포커스 설정합니다.
		tabctxmenu.focus();
	}
}

/*
 * "addTab" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var tabItem = new cpr.controls.TabItem();
	tabItem.text = "tabItem" + cnt;
	
	var tabFolder = app.lookup("tab");
	// 탭 아이템을 추가합니다.
	tabFolder.addTabItem(tabItem);
	cnt ++;
}
