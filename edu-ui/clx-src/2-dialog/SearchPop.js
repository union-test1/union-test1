

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 다이얼로그로 화면이 열릴 때 initValue를 가져옴
	var initValue = app.getHostProperty("initValue");
	var empName = (initValue != null)? initValue["empName"] : null;
	
	// initValue가 존재할 때 해당 값을 인풋박스에 넣어줌
	if(empName != null && empName != ""){
		app.lookup("ipb1").value = empName;
		app.lookup("btnSearch").click(); //조회 버튼 클릭
	}
}


/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	// 서브미션 통신
	app.lookup("subList").send();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubListSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
	//데이터셋과 연결된 컨트롤(그리드) 리드로우
	app.lookup("grd1").redraw();
}


/*
 * "화면닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClose = e.control;
	//앱을 닫음
	app.close();
}


/*
 * "선택닫기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSelect = e.control;
	// 그리드를 선언
	var grid = app.lookup("grd1");
	var selectedRowIdx = grid.getSelectedRowIndices();
	
	// 선택된 행이 없으면 메세지를 띄운다.
	if (selectedRowIdx == null || selectedRowIdx.length == 0) {
		// 메세지 : 선택된 자료가 없습니다.
		cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
				"warning" : true,
				msg : "선택된 자료가 없습니다."
		});
		return;
	}
	
	// 선택한 행을 returnValue 로 내보낸다. (해당 앱을 호출한 쪽에 데이터 전송)
	var ds = app.lookup("ds1");
	var rowData = ds.getRowData(selectedRowIdx[0]);
	
	app.setHostProperty("returnValue", rowData);
	app.close();
}
