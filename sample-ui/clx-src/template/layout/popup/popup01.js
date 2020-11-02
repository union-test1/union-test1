//공통 Util
var comUtil = createComUtil(app);

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var initValue = app.getHostProperty("initValue");
	// 페이지 인덱서 초기화
	comUtil.setPagingInfo("resPage", "pageIndexer");
	
	var column1 = app.lookup("ipb11");
	if(initValue != null){
		column1.value = initValue;
	}
	column1.focus();
}

/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 페이지 인덱서 설정 초기화
	var resPage = app.lookup("resPage");
	resPage.reset();
	
	// 페이지 인덱서 초기화
	comUtil.setPagingInfo("resPage", "pageIndexer");
	
	// 화면 조회
	doSearch();
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 변경 데이터 체크
	if(comUtil.isUpdated("resList") == true) {
		var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");;
		if(isOk == true) {
			doSave();
			return;
		}
	}
	
	/** 화면 초기화	 */
	// 검색조건 초기화
	var reqKey= app.lookup("reqKey")
	reqKey.reset();
	
	var grp_search_cond= app.lookup("grp_search_cond");
	grp_search_cond.redraw();
	
	// 목록 초기화
	var resList = app.lookup("resList");
	resList.clear();	
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();

	// 페이지 인덱서 설정 초기화
	var resPage = app.lookup("resPage");
	resPage.reset();
	
	// 페이지 인덱서 초기화
	comUtil.setPagingInfo("resPage", "pageIndexer");
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubMainListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subMainList = e.control;
	
	// 메인 Grid를 redraw
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();
	
	if(grdMain.rowCount > 0) {
		// 첫번째 row 선택
		grdMain.selectRows([0]);
	}
	
	// 페이지 인덱서 반영
	comUtil.setPagingInfo("resPage", "pageIndexer");
}

/*
 * 사용자 정의 컨트롤에서 before-pagechange 이벤트 발생 시 호출.
 */
function onPageIndexerBeforePagechange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.pageindex
	 */
	var pageIndexer = e.control;
	if(comUtil.isUpdated("resList") == true) {
		var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");
		if(isOk == true){
			// 목록 저장
			doSave();
			e.preventDefault();
			return;
		}
	}
	
	// validation 검색 조건 입력 검증.
	var isValid = comUtil.validate("grp_search_cond");
	if(isValid == false) {
		e.preventDefault();
		return;
	}
}

/*
 * 사용자 정의 컨트롤에서 pagechange 이벤트 발생 시 호출.
 */
function onPageindexPagechange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.pageindex
	 */
	var pageindex = e.control;
	
	// 변경된 페이지 인덱스를 DataMap에 반영.
	var resPage = app.lookup("resPage");
	resPage.setValue("pageIdx", e.newSelection);
	
	// 화면 조회
	doSearch();
}

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrp_search_condKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp_search_cond = e.control;
	
	// 검색부에서 Enter Key가 입력되면 자동 조회
	if(e.keyCode == cpr.events.KeyCode.ENTER) {
		// 페이지 인덱서 설정 초기화
		var resPage = app.lookup("resPage");
		resPage.reset();
		
		// 페이지 인덱서 초기화
		comUtil.setPagingInfo("resPage", "pageIndexer");
		// 화면 조회
		doSearch();
	}
}

/*
 * 화면 검색 Function
 */
function doSearch() {
	// validation 검색 조건 입력 검증.
	var isValid = comUtil.validate("grp_search_cond");
	if(isValid == false){
		return;
	}
	
	// 조회 Submission send
	comUtil.send("subMainList");
}

/*
 * "닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 앱을 종료
	app.close();
}

/*
 * "선택" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	// 그리드의 선택된 row를 선택하여 앱을 종료
	doSelect();
}

/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트입니다.
 */
function onGrdMainRowDblclick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grdMain = e.control;
	// 그리드의 선택된 row를 선택하여 앱을 종료
	doSelect();
}


/*
 * 선택된 row를 returnValue로 설정한 후 앱을 종료합니다. 
 */
function doSelect(){
	var grdMain = app.lookup("grdMain");
	// 선택된 row
	var row = grdMain.getSelectedRow();
	
	// row가 존재하지 않을시 skip
	if(row == null){
		return;
	}
	
	// returnValue 설정
	app.setHostProperty("returnValue", row.getRowData());
	// app을 종료
	app.close();
}

/*
 * 사용자 정의 컨트롤에서 pagechange 이벤트 발생 시 호출.
 */
function onPageIndexerPagechange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.pageindex
	 */
	var pageIndexer = e.control;
	// 변경된 페이지 인덱스를 DataMap에 반영.
	var resPage = app.lookup("resPage");
	resPage.setValue("pageIdx", e.newSelection);
	
	// 화면 조회
	doSearch();
}

/*
 * 사용자 정의 컨트롤에서 before-pagechange 이벤트 발생 시 호출.
 */
function onPageIndexerBeforePagechange2(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type udc.pageindex
	 */
	var pageIndexer = e.control;
	if(comUtil.isUpdated("resList") == true) {
		var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");
		if(isOk == true){
			// 목록 저장
			doSave();
			e.preventDefault();
			return;
		}
	}
	
	// validation 검색 조건 입력 검증.
	var isValid = comUtil.validate("grp_search_cond");
	if(isValid == false) {
		e.preventDefault();
		return;
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubMainListSubmitSuccess2(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subMainList = e.control;
	// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
	var message = subMainList.getMetadata("msg");
	if(message) {
		comUtil.alert(message);
	}
	
	// 메인 그리드를 redraw
	var grdMain = app.lookup("grdMain");
	grdMain.redraw();
	
	if(grdMain.rowCount > 0) {
		// 첫번째 row 선택
		grdMain.selectRows([0]);
	}
	
	// 페이지 인덱서 반영
	comUtil.setPagingInfo("resPage", "pageIndexer");
}
