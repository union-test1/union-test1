var comUtil = createComUtil(app);

exports.filterTree = function(){
	/**
	 * @type cpr.controls.InputBox
	 */
	var ipb_search = app.lookup("ipb_search");
	var arr = []
	var nArr = arr.concat(ipb_search.displayText);
	
	/**
	 * @type cpr.data.DataSet
	 */	
	var leftMenuList = app.lookup("leftMenuList");
	leftMenuList.setFilter("menuNm *= '" + nArr[0] +"'");
	
	 app.lookup("menuTree").redraw();
}

/**
 * 외부에서 메뉴 선택처리
 **/
exports.selectMenu = function(menuId) {
	alert("select menu");
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var subGetMenuList = app.lookup("subGetMenuList");
	subGetMenuList.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubGetMenuListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	var menuTree = app.lookup("menuTree");
	menuTree.expandAllItems();
	menuTree.redraw();
}

function createEventParam(selection) {
	var param = {menuId : null, menuNm : null, appId : null, menuExplain: null};
	if(selection) {
		var item;
		if(Array.isArray(selection)) {
			if(selection.length > 0) {
				item = selection[0].row;
			} else {
				return param;
			}
		} else {
			item = selection.row;
		}
		param.menuId = item.getValue("menuId");
		param.menuNm = item.getValue("menuNm");
		param.appId = item.getValue("appId");
		param.menuExplain = item.getValue("menuExplain");
	}
	
	return param;
}

/*
 * 트리에서 before-selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장되기 전에 발생하는 이벤트. 다음 이벤트로 selection-change가 발생합니다.
 */
function onMenuTreeBeforeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var menuTree = e.control;
	var oldSelection = e.oldSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	var newSelection = e.newSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	
	var eventObject = new cpr.events.CSelectionEvent("menu_before_select", { oldSelection: createEventParam(oldSelection), newSelection: createEventParam(newSelection) });
	app.dispatchEvent(eventObject);
	
	// 메뉴의 선택 차단
	if(eventObject.defaultPrevented == true) {
		e.preventDefault();
	}
}

/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onMenuTreeSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var menuTree = e.control;
	var oldSelection = e.oldSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조
	var newSelection = e.newSelection; // event 객체에 대한 명세(어떤 객체들이 들어가 있는지, API 또는 도움말) --> API를 통해 세부 메소드 및 객체 접근 참조

	var eventObject = new cpr.events.CSelectionEvent("menu_select", { oldSelection: createEventParam(oldSelection), newSelection: createEventParam(newSelection) });
	app.dispatchEvent(eventObject);
}

/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onMenuTreeItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var menuTree = e.control;
	
	var selectedItem = e.item;
	
	var eventObject = new cpr.events.CItemEvent("menu_click", { item: createEventParam(selectedItem) });
	app.dispatchEvent(eventObject);
}



/*
 * "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	var menuTree = app.lookup("menuTree");
	menuTree.expandAllItems();
	menuTree.redraw();
}

/*
 * "-" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	var menuTree = app.lookup("menuTree");
	menuTree.collapseAllItems();
	menuTree.redraw();
	
}


/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트.
 */
function onIpb_searchKeyup(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb_search = e.control;
	var eventObject = new cpr.events.CKeyboardEvent("keyup");
	app.dispatchEvent(eventObject);
}
