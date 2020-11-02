/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubGetMenuListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	var grid = app.lookup("grd1");
	grid.redraw();
}
/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("subGetMenuList").send();
}



/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrd1RowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	var selectedRow = e.row;
	
	var appId = selectedRow.getValue("appId");
	if(appId) {
		var mainApp = app.getHostAppInstance();
		var mainMdi = mainApp.lookup("main_mdi");
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
				tabItem.text = selectedRow.getValue("menuNm");
			});
		} else {
			mainMdi.addItemWithApp(appId, true, function(/* cpr.controls.TabItem */tabItem) {
				tabItem.text = selectedRow.getValue("menuNm");
				
				tabItem.content.addEventListener("init", function(/* cpr.events.CEvent */e) {
					e.control.setAppProperty("title", selectedRow.getValue("menuNm"));
				});
			});
		}
	}
}
