/* Factory Function을 통해 공통 유틸 클래스 생성 */
var comutil = createComUtil(app);


/*
 * "클리어" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("main").clear();
	app.lookup("sub1").clear();
	app.lookup("sub2").clear();
	app.lookup("sub3").clear();
	
	app.lookup("grd_main").redraw();
	app.lookup("grd_sub1").redraw();
	app.lookup("grd_sub2").redraw();
	app.lookup("grd_sub3").redraw();
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// Send Submission
	comutil.send("subMain");
	comutil.send("subSub1");
	comutil.send("subSub2");
	comutil.send("subSub3");
	
}

/*
 * "Excel Export" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grdMain = app.lookup("grd_main");
	var grdSub1 = app.lookup("grd_sub1");
	var grdSub2 = app.lookup("grd_sub2");
	var grdSub3 = app.lookup("grd_sub3");
	
	// 그리드 데이터를 json 형식으로 전환
	var data1 = grdMain.getExportData(false);
	data1.name = "시트1";
	var data2 = grdSub1.getExportData(false);
	data2.name = "시트2";
	var data3 = grdSub2.getExportData(false);
	data3.name = "시트3";
	var data4 = grdSub3.getExportData(false);
	data4.name = "시트4";
	
	var exportData = cpr.controls.gridpart.GridExportUtil.merge([data1, data2, data3, data4]);
	
	var subExport = app.lookup("subExport");
	// 전환된 데이터를 submission request data로 설정
	subExport.setRequestObject(exportData);
	subExport.send();
}
