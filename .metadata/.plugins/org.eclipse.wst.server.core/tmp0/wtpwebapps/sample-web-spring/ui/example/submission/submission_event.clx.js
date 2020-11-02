/*
 * App URI: example/submission/submission_event
 * Source Location: example/submission/submission_event.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/submission/submission_event", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			// report
			var start = null;
			var received = null;
			var rendered = null;
			
			//공통 Util
			var comUtil = createComUtil(app);
			
			/*
			 * "조회" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn_searchClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn_search = e.control;
				
				app.lookup("sms_list").send();
			}
			
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSms_listSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms_list = e.control;
				
				cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
					rendered = new Date().getTime();
			//		alert("received : " + (received - start) + "\nrender : " + (rendered - received));
				});
			}
			
			/* ---------------------- CSV 다운로드 ------------------------ */
			/*
			 * "CSV 다운로드" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn_csvClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn_csv = e.control;
				
				var fileName = "grid.csv";
				excelExport("grd", fileName);
			}
			
			//CSV EXPORT
			function excelExport(gridId, fileName){
				
				//파일명에 "."이 포함되어 있지 않다면 ".xlsx"를 확장자로 설정해준다.
				if (fileName.indexOf(".") == -1) {
					fileName += ".xlsx";
				}
				
				//서브미션 생성
				var submission = new cpr.protocols.Submission("sub_excelExport");
				//전송할 url 설정
				submission.action = submission.contextPath + "export/" + fileName;
				//mediaType 설정
				submission.mediaType = "application/json";
				//response data의 type 설정
				submission.responseType = "blob";
			
				// grid export data 가져오기
				/** 
				 * @type cpr.controls.Grid
				 */
				var grid = app.lookup(gridId);
				//그리드의 스타일을 제외하지 않은 채 그리드의 데이터를 JSON 형식으로 반환합니다.
				var exportData = grid.getExportData(false);
			
				submission.setRequestObject(exportData);
			
				// success listener
				var successListener = function(e) {
					// 정상적으로 처리되었습니다.
			//		alert("정상적으로 처리되었습니다.");
				};
				submission.addEventListener("submit-success", successListener);
				submission.addEventListener("submit-upload-progress", function(e) {
					console.log("-- upload progress --");
					app.lookup("grp_loadmask").visible = true;
					
					var prg = app.lookup("prg1");
					prg.max = e.nativeEvent.total;
					prg.numberValue = e.nativeEvent.loaded;
					prg.redraw();
				});
			
				submission.addEventListenerOnce("submit-done", function(e) {
					app.lookup("grp_loadmask").visible = false;
					submission.removeEventListener("submit-success", successListener);
					submission.removeAllParameters();
				});
			
				submission.send();
			}
			
			/*
			 * 서브미션에서 before-submit 이벤트 발생 시 호출.
			 * 통신을 시작하기전에 발생합니다.
			 */
			function onSms_listBeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms_list = e.control;
			
				start = new Date().getTime();
			}
			
			/*
			 * 서브미션에서 receive 이벤트 발생 시 호출.
			 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
			 */
			function onSms_listReceive(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms_list = e.control;
				
				received = new Date().getTime();
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			var dataSet_1 = new cpr.data.DataSet("ds_list");
			dataSet_1.parseData({
				"alterColumnLayout": "server",
				"columns": [
					{"name": "TEST_COL001"},
					{"name": "TEST_COL002"},
					{"name": "TEST_COL003"},
					{"name": "TEST_COL004"},
					{"name": "TEST_COL005"},
					{"name": "TEST_COL006"},
					{"name": "TEST_COL007"},
					{"name": "TEST_COL008"},
					{"name": "TEST_COL009"},
					{"name": "TEST_COL010"},
					{"name": "TEST_COL011"},
					{"name": "TEST_COL012"},
					{"name": "TEST_COL013"},
					{"name": "TEST_COL014"},
					{"name": "TEST_COL015"},
					{"name": "TEST_COL016"},
					{"name": "TEST_COL017"},
					{"name": "TEST_COL018"},
					{"name": "TEST_COL019"},
					{"name": "TEST_COL020"}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dm_request");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "COL",
						"defaultValue": "20"
					},
					{
						"name": "DATA",
						"defaultValue": "1000"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("sms_list");
			submission_1.action = "../template/dynamicgrid/massdata.do";
			submission_1.responseType = "text";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSms_listSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSms_listSubmitSuccess);
			}
			if(typeof onSms_listBeforeSubmit == "function") {
				submission_1.addEventListener("before-submit", onSms_listBeforeSubmit);
			}
			if(typeof onSms_listReceive == "function") {
				submission_1.addEventListener("receive", onSms_listReceive);
			}
			app.register(submission_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
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
			var group_1 = new cpr.controls.Container();
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["100px", "150px", "1fr", "70px", "100px"]);
			formLayout_1.setRows(["30px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "데이터 양";
				output_1.style.css({
					"background-color" : "#f4f4f4",
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var comboBox_1 = new cpr.controls.ComboBox("cmb_data");
				comboBox_1.bind("value").toDataMap(app.lookup("dm_request"), "DATA");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("10", "10"));
					comboBox_1.addItem(new cpr.controls.Item("20", "20"));
					comboBox_1.addItem(new cpr.controls.Item("50", "50"));
					comboBox_1.addItem(new cpr.controls.Item("100", "100"));
					comboBox_1.addItem(new cpr.controls.Item("1,000", "1000"));
					comboBox_1.addItem(new cpr.controls.Item("5,000", "5000"));
					comboBox_1.addItem(new cpr.controls.Item("10,000", "10000"));
					comboBox_1.addItem(new cpr.controls.Item("20,000", "20000"));
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var button_1 = new cpr.controls.Button("btn_search");
				button_1.value = "조회";
				if(typeof onBtn_searchClick == "function") {
					button_1.addEventListener("click", onBtn_searchClick);
				}
				container.addChild(button_1, {
					"colIndex": 3,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1
				});
				var button_2 = new cpr.controls.Button("btn_csv");
				button_2.value = "CSV 다운로드";
				if(typeof onBtn_csvClick == "function") {
					button_2.addEventListener("click", onBtn_csvClick);
				}
				container.addChild(button_2, {
					"colIndex": 4,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1
				});
				var grid_1 = new cpr.controls.Grid("grd");
				grid_1.init({
					"dataSet": app.lookup("ds_list"),
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
						{"width": "100px"},
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
									cell.text = "TEST_COL001";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "TEST_COL002";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "TEST_COL003";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "TEST_COL004";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "TEST_COL005";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "TEST_COL006";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "TEST_COL007";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "TEST_COL008";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "TEST_COL009";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "TEST_COL010";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.text = "TEST_COL011";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.text = "TEST_COL012";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.text = "TEST_COL013";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.text = "TEST_COL014";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.text = "TEST_COL015";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.text = "TEST_COL016";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.text = "TEST_COL017";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.text = "TEST_COL018";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.text = "TEST_COL019";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.text = "TEST_COL020";
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
									cell.columnName = "TEST_COL001";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "TEST_COL002";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "TEST_COL003";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "TEST_COL004";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "TEST_COL005";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "TEST_COL006";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "TEST_COL007";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "TEST_COL008";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "TEST_COL009";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "TEST_COL010";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "TEST_COL011";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 11},
								"configurator": function(cell){
									cell.columnName = "TEST_COL012";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 12},
								"configurator": function(cell){
									cell.columnName = "TEST_COL013";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 13},
								"configurator": function(cell){
									cell.columnName = "TEST_COL014";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 14},
								"configurator": function(cell){
									cell.columnName = "TEST_COL015";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 15},
								"configurator": function(cell){
									cell.columnName = "TEST_COL016";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 16},
								"configurator": function(cell){
									cell.columnName = "TEST_COL017";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 17},
								"configurator": function(cell){
									cell.columnName = "TEST_COL018";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 18},
								"configurator": function(cell){
									cell.columnName = "TEST_COL019";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 19},
								"configurator": function(cell){
									cell.columnName = "TEST_COL020";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1,
					"colSpan": 5,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "90px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
			});
			
			var group_2 = new cpr.controls.Container("grp_loadmask");
			group_2.visible = false;
			group_2.style.css({
				"background-color" : "white"
			});
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_2);
			(function(container){
				var progress_1 = new cpr.controls.Progress("prg1");
				progress_1.value = "0";
				container.addChild(progress_1, {
					"top": "70px",
					"width": "360px",
					"height": "20px",
					"left": "calc(50% - 180px)"
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "Loading...";
				output_2.style.css({
					"font-weight" : "bold",
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"top": "120px",
					"width": "140px",
					"height": "20px",
					"left": "calc(50% - 70px)"
				});
			})(group_2);
			container.addChild(group_2, {
				"width": "400px",
				"height": "200px",
				"left": "calc(50% - 200px)",
				"top": "calc(50% - 100px)"
			});
			
			var userDefinedControl_1 = new udc.pagetitle2();
			userDefinedControl_1.bind("title").toAppProperty("title");
			userDefinedControl_1.bind("explain").toAppProperty("explain");
			container.addChild(userDefinedControl_1, {
				"top": "10px",
				"right": "10px",
				"left": "10px",
				"height": "70px"
			});
		}
	});
	app.title = "submission_event";
	cpr.core.Platform.INSTANCE.register(app);
})();