/*
 * App URI: template/layout/grid/copytogrid
 * Source Location: template/layout/grid/copytogrid.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("template/layout/grid/copytogrid", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			// 공통 Util
			var comUtil = createComUtil(app);
			
			/*
			 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 변경 데이터 체크
				if (comUtil.isUpdated("resList1") == true || comUtil.isUpdated("resList2") == true) {
					var isOk = confirm("변경된 정보가 있습니다. 저장하시겠습니까?");
					;
					if (isOk == true) {
						doSave();
						return;
					}
				}
			
				/** 화면 초기화 */
				// 검색조건 초기화
				var reqKey = app.lookup("reqKey")
				reqKey.reset();
			
				var grp_search_cond = app.lookup("grp_search_cond");
				grp_search_cond.redraw();
			
				// 목록 초기화
				var resList = app.lookup("resList1");
				resList.clear();
				var grdMain = app.lookup("grdMain1");
				grdMain.redraw();
			
				var resList = app.lookup("resList2");
				resList.clear();
				var grdMain = app.lookup("grdMain2");
				grdMain.redraw();
			}
			
			/*
			 * "검색" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				// 화면 조회
				doSearch();
			}
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGroupKeydown(/* cpr.events.CKeyboardEvent */e) {
				/**
				 * @type cpr.controls.Container
				 */
				var group = e.control;
				// 검색부에서 enter key가 입력되면 자동 조회
				if (e.keyCode == cpr.events.KeyCode.ENTER) {
					// 화면 조회
					doSearch();
				}
			}
			
			/*
			 * "<" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick4(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 선택 복사
				comUtil.copyGridData("grdMain2", "grdMain1");
			}
			
			/*
			 * ">" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick5(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 선택 복사
				comUtil.copyGridData("grdMain1", "grdMain2");
			}
			
			/*
			 * "<<" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick3(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 전체 복사
				comUtil.copyAllGridData("grdMain2", "grdMain1");
			}
			
			/*
			 * ">>" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick6(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 전체 복사
				comUtil.copyAllGridData("grdMain1", "grdMain2");
			}
			
			/*
			 * "저장" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick7(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				// 목록 저장
				doSave();
			}
			
			/*
			 * 화면 검색 Function
			 */
			function doSearch() {
				// validation 검색 조건 입력 검증.
				var isValid = comUtil.validate("grp_search_cond");
				if (isValid == false) {
					return;
				}
			
				// 조회 Submission send
				comUtil.send("subMainList");
			
				// copy datamap(조건 복사)
				var reqKey = app.lookup("reqKey");
				var reqKeyCopy = app.lookup("reqKeyCopy");
				reqKey.copyToDataMap(reqKeyCopy);
			}
			
			/*
			 * 메인 저장 Function
			 */
			function doSave() {
				// copy dataset(row 이동 결과 복사)
				var resList1 = app.lookup("resList1");
				var resList2 = app.lookup("resList2");
			
				var resMain1 = app.lookup("reqList1");
				var resMain2 = app.lookup("reqList2");
			
				resMain1.clear();
				resMain2.clear();
			
				resList1.copyToDataSet(resMain1);
				resList2.copyToDataSet(resMain2);
			
				// 저장 Submission send
				comUtil.send("subSave");
			}
			
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
			 */
			function onSubMainListSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
				/**
				 * @type cpr.protocols.Submission
				 */
				var subMain = e.control;
			
				// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
				var message = subMain.getMetadata("msg");
				if (message) {
					comUtil.alert(message);
				}
			
				// 메인그리드1을 redraw
				var grdMain1 = app.lookup("grdMain1");
				grdMain1.redraw();
			
				// 메인그리드2를 redraw
				var grdMain2 = app.lookup("grdMain2");
				grdMain2.redraw();
			}
			
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
			 */
			function onSubSaveSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
				/**
				 * @type cpr.protocols.Submission
				 */
				var subSave = e.control;
			
				// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
				var message = subSave.getMetadata("msg");
				if (message) {
					comUtil.alert(message);
				}
			
				// dataset clear
				app.lookup("reqList1").clear();
				app.lookup("reqList2").clear();
			
				// 화면 재조회
				doSearch();
			}
			
			/*
			 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
			 */
			function onIpbColumn1Search(/* cpr.events.CUIEvent */e) {
				/**
				 * @type udc.search.search_type1
				 */
				// 인풋박스 초기화
				var ipdColumn1 = e.control;
				var initValue = ipdColumn1.value;
			//	ipdColumn1.value = "";
				// 팝업창 추가
				var _app = app;
				cpr.core.App.load("template/layout/popup/popup01", function(app) {
					var dialog = new cpr.controls.Dialog(app);
					// 다이얼로그 설정
					dialog.headerTitle = "popup01";
					dialog.headerVisible = true;
					dialog.headerClose = true;
					// 다이얼로그 위치 지정
					dialog.style.css({
						top : "calc(50% - 300px)",
						left : "calc(50% - 400px)",
						width : "800px",
						height : "600px",
						backgroundColor : "white"
					});
					
					if(initValue){
						dialog.initValue = initValue;
					}
			
					// 다이얼로그 close 시 발생하는 이벤트 handler
					dialog.addEventListener("close", function(e) {
						// 종료 시 반환되는 returnValue를 설정
						var returnValue = dialog.returnValue;
						if (returnValue == null) {
							return;
						}
						ipdColumn1.value = returnValue.column1;
					});
			
					// app에 다이얼로그 추가
					_app.getContainer().addChild(dialog);
				});
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			var dataSet_1 = new cpr.data.DataSet("resList1");
			dataSet_1.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("resList2");
			dataSet_2.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("reqList1");
			dataSet_3.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("reqList2");
			dataSet_4.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataSet_4);
			var dataMap_1 = new cpr.data.DataMap("reqKey");
			dataMap_1.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("reqKeyCopy");
			dataMap_2.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subMainList");
			submission_1.action = "../template/copytogrid/getMainList.do";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			if(typeof onSubMainListSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubMainListSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "../template/copytogrid/save.do";
			submission_2.addRequestData(dataSet_3);
			submission_2.addRequestData(dataSet_4);
			submission_2.addRequestData(dataMap_2);
			if(typeof onSubSaveSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSubSaveSubmitSuccess);
			}
			app.register(submission_2);
			
			app.supportMedia("all and (min-width: 1024px)", "main");
			app.supportMedia("all and (max-width: 1023px)", "default");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var userDefinedControl_1 = new udc.pagetitle();
			userDefinedControl_1.bind("title").toAppProperty("title");
			container.addChild(userDefinedControl_1, {
				"top": "10px",
				"right": "10px",
				"left": "10px",
				"height": "24px"
			});
			
			var group_1 = new cpr.controls.Container();
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["1fr", "11px", "1fr"]);
			formLayout_1.setRows(["40px", "1fr", "40px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grdMain1");
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("resList1"),
					"columnMovable": true,
					"columnResizable": true,
					"selectionMulti": "multi",
					"showDeletedRow": false,
					"noDataMessage": "조회된 데이터가 없습니다.",
					"columns": [
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column6";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "column7";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "column8";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "column9";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "column10";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnName = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column6";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column7";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "column8";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "column9";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "column10";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var group_2 = new cpr.controls.Container();
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr"]);
				formLayout_2.setRows(["1fr", "11px", "11px", "11px", "11px", "1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var button_1 = new cpr.controls.Button();
					button_1.style.css({
						"background-repeat" : "no-repeat",
						"background-size" : "11px",
						"background-position" : "center",
						"background-image" : "url('images/btn_grid_leftall.gif')"
					});
					if(typeof onButtonClick3 == "function") {
						button_1.addEventListener("click", onButtonClick3);
					}
					container.addChild(button_1, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var button_2 = new cpr.controls.Button();
					button_2.style.css({
						"background-repeat" : "no-repeat",
						"background-size" : "11px",
						"background-image" : "url('images/btn_grid_left.gif')",
						"background-position" : "center"
					});
					if(typeof onButtonClick4 == "function") {
						button_2.addEventListener("click", onButtonClick4);
					}
					container.addChild(button_2, {
						"colIndex": 0,
						"rowIndex": 2
					});
					var button_3 = new cpr.controls.Button();
					button_3.style.css({
						"background-repeat" : "no-repeat",
						"background-size" : "11px",
						"background-image" : "url('images/btn_grid_right.gif')",
						"background-position" : "center"
					});
					if(typeof onButtonClick5 == "function") {
						button_3.addEventListener("click", onButtonClick5);
					}
					container.addChild(button_3, {
						"colIndex": 0,
						"rowIndex": 3
					});
					var button_4 = new cpr.controls.Button();
					button_4.style.css({
						"background-repeat" : "no-repeat",
						"background-size" : "11px",
						"background-image" : "url('images/btn_grid_rightall.gif')",
						"background-position" : "center"
					});
					if(typeof onButtonClick6 == "function") {
						button_4.addEventListener("click", onButtonClick6);
					}
					container.addChild(button_4, {
						"colIndex": 0,
						"rowIndex": 4
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 1,
					"rowIndex": 1,
					"verticalAlign": "fill"
				});
				var grid_2 = new cpr.controls.Grid("grdMain2");
				grid_2.readOnly = true;
				grid_2.init({
					"dataSet": app.lookup("resList2"),
					"bufferedScroll": true,
					"columnMovable": true,
					"columnResizable": true,
					"selectionMulti": "multi",
					"showDeletedRow": false,
					"noDataMessage": "조회된 데이터가 없습니다.",
					"columns": [
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column6";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "column7";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "column8";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "column9";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "column10";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnName = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column6";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column7";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "column8";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "column9";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "column10";
								}
							}
						]
					}
				});
				container.addChild(grid_2, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var group_3 = new cpr.controls.Container();
				group_3.style.setClasses(["grp-buttons"]);
				// Layout
				var formLayout_3 = new cpr.controls.layouts.FormLayout();
				formLayout_3.setColumns(["1fr", "90px"]);
				formLayout_3.setRows(["1fr"]);
				group_3.setLayout(formLayout_3);
				(function(container){
					var button_5 = new cpr.controls.Button();
					button_5.value = "저장";
					button_5.style.setClasses(["cl-button-box"]);
					if(typeof onButtonClick7 == "function") {
						button_5.addEventListener("click", onButtonClick7);
					}
					container.addChild(button_5, {
						"colIndex": 1,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1,
						"horizontalAlign": "fill",
						"verticalAlign": "fill"
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 0,
					"rowIndex": 2,
					"colSpan": 3,
					"rowSpan": 1
				});
				var group_4 = new cpr.controls.Container("grp_search_cond");
				group_4.style.setClasses(["grp-search"]);
				var dataMapContext_1 = new cpr.bind.DataMapContext(app.lookup("reqKey"));
				group_4.setBindContext(dataMapContext_1);
				// Layout
				var formLayout_4 = new cpr.controls.layouts.FormLayout();
				formLayout_4.setColumns(["100px", "150px", "1fr", "90px", "90px"]);
				formLayout_4.setRows(["1fr"]);
				group_4.setLayout(formLayout_4);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "column1";
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0,
						"horizontalAlign": "fill",
						"verticalAlign": "fill"
					});
					var userDefinedControl_2 = new udc.search.search_type1("ipdColumn1");
					userDefinedControl_2.required = "required";
					userDefinedControl_2.userAttr({
						"required": "Y",
						"name": "컬럼1"
					});
					userDefinedControl_2.bind("value").toDataColumn("column1");
					if(typeof onIpbColumn1Search == "function") {
						userDefinedControl_2.addEventListener("search", onIpbColumn1Search);
					}
					container.addChild(userDefinedControl_2, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var button_6 = new cpr.controls.Button();
					button_6.value = "검색";
					if(typeof onButtonClick2 == "function") {
						button_6.addEventListener("click", onButtonClick2);
					}
					container.addChild(button_6, {
						"colIndex": 4,
						"rowIndex": 0,
						"verticalAlign": "fill"
					});
					var button_7 = new cpr.controls.Button();
					button_7.value = "초기화";
					if(typeof onButtonClick == "function") {
						button_7.addEventListener("click", onButtonClick);
					}
					container.addChild(button_7, {
						"colIndex": 3,
						"rowIndex": 0
					});
				})(group_4);
				if(typeof onGroupKeydown == "function") {
					group_4.addEventListener("keydown", onGroupKeydown);
				}
				container.addChild(group_4, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 3,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "44px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
			});
		}
	});
	app.title = "copytogrid";
	cpr.core.Platform.INSTANCE.register(app);
})();
