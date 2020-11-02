

/*
 * 사용자 정의 컨트롤에서 logout 이벤트 발생 시 호출.
 */
function onHeaderLogout(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.main.header
	 */
	var header = e.control;
	
	var subLogout = app.lookup("subLogout");
	subLogout.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubLogoutSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subLogout = e.control;
	
	var appId = subLogout.getMetadata("uri");
	var msg = subLogout.getMetadata("message");
	if(msg != null) {
		alert(msg);
	}
	if (appId != null) {
		// 화면이동
		cpr.core.App.load(appId, function(newapp) {
			app.close();
			newapp.createNewInstance().run();
		});
		return;
	}
}

/*
 * 사용자 정의 컨트롤에서 close 이벤트 발생 시 호출.
 */
function onHeaderClose(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.main.header
	 */
	var header = e.control;
	
	self.close();
}


/*
 * 사용자 정의 컨트롤에서 menu_before_select 이벤트 발생 시 호출.
 */
function onLeftMenu_before_select(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.main.left
	 */
	var left = e.control;
	e.preventDefault(); // Tree의 선택 차단
}

/*
 * 사용자 정의 컨트롤에서 menu_select 이벤트 발생 시 호출.
 */
function onLeftMenu_select(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.main.left
	 */
	var left = e.control;
}

/*
 * 사용자 정의 컨트롤에서 menu_click 이벤트 발생 시 호출.
 */
function onLeftMenu_click(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type udc.main.left
	 */
	var left = e.control;
	
	var selectedMenu = e.item;
	
	var appId = selectedMenu.appId;
	if(appId) {
		var mainMdi = app.lookup("main_mdi");
		var items = mainMdi.getTabItems();
		if(items != null && items.length > 0) {
			var alreadyOpened = items.some(function(item) {
				if(item.content.app) { // embeddedApp
					if(item.content.app.id == appId) {
						mainMdi.setSelectedTabItem(item);
						return true;
					}
				} else { // embeddedPage
					if(item.content.src == appId) {
						mainMdi.setSelectedTabItem(item);
						return true;
					}
				}
				return false;
			});
			if(alreadyOpened == true) {
				return;
			} 
		};
		
		if(/.html$/.test(appId)) {
			mainMdi.addItemWithPage(appId, true, function(tabItem) {
				tabItem.text = selectedMenu.menuNm;
			});
		} else {
			mainMdi.addItemWithApp(appId, true, function(/* cpr.controls.TabItem */tabItem) {
				tabItem.text = selectedMenu.menuNm;
				
				tabItem.content.addEventListener("init", function(/* cpr.events.CEvent */e) {
					e.control.setAppProperty("title", selectedMenu.menuNm);
					e.control.setAppProperty("explain", selectedMenu.menuExplain);
				});
			});
		}
	}
}

var leftmenuexpended = true;

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var container = app.getContainer();
	var leftmenu = app.lookup("left_menu");
	var mainmdi = app.lookup("main_mdi");
	
	if(leftmenuexpended == true) {
		container.updateConstraint(leftmenu, {
			"top" : "50px",
			"width" : "0px",
			"left" : "0px",
			"bottom" : "0px"
		});
		container.updateConstraint(button, {
			"top" : "75px",
			"width" : "10px",
			"left" : "0",
			"bottom" : "0px"
		});
		container.updateConstraint(mainmdi, {
			"top" : "50px",
			"right" : "0px",
			"left" : "10px",
			"bottom" : "0px"
		});
		
		leftmenuexpended = false;
	} else {
		container.updateConstraint(leftmenu, {
			"top" : "50px",
			"width" : "300px",
			"left" : "0px",
			"bottom" : "0px"
		});
		container.updateConstraint(button, {
			"top" : "75px",
			"width" : "10px",
			"left" : "300px",
			"bottom" : "0px"
		});
		container.updateConstraint(mainmdi, {
			"top" : "50px",
			"right" : "0px",
			"left" : "310px",
			"bottom" : "0px"
		});
		
		leftmenuexpended = true;
	}

}

/*
 * "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	var treemenu = app.lookup("left_menu");
	treemenu.expand = true;
}

/*
 * "-" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	var treemenu = app.lookup("left_menu");
	treemenu.expand = false;
}

/*
 * "전체 닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	var main_mdi = app.lookup("main_mdi");
	main_mdi.closeAll();
}

/*
 * "기타 닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	var main_mdi = app.lookup("main_mdi");
	var selectItem = main_mdi.getSelectedTabItem();
	main_mdi.closeOthers(selectItem);
	
}

/*
 * 사용자 정의 컨트롤에서 keyup 이벤트 발생 시 호출.
 */
function onLeft_menuKeyup(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type udc.main.left
	 */
	var left_menu = e.control;
	left_menu.filterTree();
}
