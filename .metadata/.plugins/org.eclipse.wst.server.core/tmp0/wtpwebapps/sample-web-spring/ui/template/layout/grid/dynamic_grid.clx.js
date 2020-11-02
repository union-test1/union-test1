/*
 * App URI: template/layout/grid/dynamic_grid
 * Source Location: template/layout/grid/dynamic_grid.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("template/layout/grid/dynamic_grid", {
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
				
				//선택한 컬럼 수만큼 그리드의 컬럼 수를 추가한다.
				addColumn();
				
				cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
					rendered = new Date().getTime();
			//		alert("received : " + (received - start) + "\nrender : " + (rendered - received));
				});
			}
			
			//그리드 컬럼 추가
			function addColumn(){
				var grd = app.lookup("grd");
				var ds_list = app.lookup("ds_list");
				
				//그리드 컬럼을 추가하기 위해 데이터셋의 컬럼명을 가지고 온다.
				var columnNames = ds_list.getColumnNames();
				var col_length = columnNames.length;
				
				//그리드 컬럼을 그리기 위한 정보
				var col_layout = [];	//컬럼 레이아웃
				var col_header = [];	//컬럼 헤더
				var col_detail = [];	//컬럼 디테일
				
				//이전에 추가한 컬럼이 존재하고 그 수가 0이 아니라면
				//이전에 추가한 컬럼을 삭제해준다.
				var before_col = grd.header.cellCount;
				if(before_col && before_col != 0){
					for(var i = before_col ; i >=0 ; i--) {
						grd.deleteColumn(i + 1);
					}
				}
				
				//추가할 컬럼의 수만큼
				for(var j = 0 ; j < col_length ; j ++){
					
					(function(data) {
						/* <컬럼 레이아웃> */
						col_layout[j] = {
							"width" : "100px"
						};
						
						/* <컬럼 헤더 정보>
						 colIndex는 index 정보가 있는 그리드의 첫 번째 컬럼을 다음부터 추가된다. : (i + 1)
						 text는 데이터셋의 컬럼명으로 구성한다. 
						 */
						col_header[j] = {
							"constraint" : {
								"rowIndex" : 0,
								"colIndex" : (j+1)
							},
							"configurator": function(cell) {
								cell.style.css({"text-align":"center"})
								cell.text = data
							}
								
						};
						
						/* <컬럼 디테일 정보 > 컬럼 헤더 정보와 동일*/
						col_detail[j] = {
							"constraint" : {
								"rowIndex" : 0,
								"colIndex" : (j+1)
							},
							"configurator": function(cell) {
								cell.style.css({"text-align":"center"});
								cell.columnName = data;
							}
						};
					})(columnNames[j]);
					
					
				}
			
				/* 위에서 구성한 컬럼 정보로 그리드에 컬럼을 추가한다 */
				grd.addColumn({
					"columnLayout" : col_layout,
					"header" : col_header,
					"detail" : col_detail
				});
				
				grd.redraw();
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
				submission.action = "/export/" + fileName;
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
			
				// // 스타일 설정을 위한 로직 추가
				if (exportData != null) {
					var headerStyle = {
						"background-color" : "#f2f2f2",
						"border-top-color" : "#b4b8c4",
						"border-bottom-color" : "#b4b8c4",
						"border-left-color" : "#b4b8c4",
						"border-right-color" : "#b4b8c4",
						"border-top-style" : "solid",
						"border-bottom-style" : "solid",
						"border-left-style" : "solid",
						"border-right-style" : "solid"
					};
					var detailStyle = {
						"border-top-color" : "#b4b8c4",
						"border-bottom-color" : "#b4b8c4",
						"border-left-color" : "#b4b8c4",
						"border-right-color" : "#b4b8c4",
						"border-top-style" : "solid",
						"border-bottom-style" : "solid",
						"border-left-style" : "solid",
						"border-right-style" : "solid"
					};
					var rowgroups = exportData["rowgroups"];
					var rgLength = rowgroups.length;
					var region = null;
					var styles = null;
					var style = null;
					var columnLength = 0;
			
					for (var i = 0; i < rgLength; i++) {
						region = rowgroups[i]["region"];
						styles = [].concat(rowgroups[i]["style"]);
			
						if (region == "header" || region == "footer" || region == "gheader" || region == "gfooter") {
							columnLength = styles.length;
							for (var j = 0; j < columnLength; j++) {
								style = _.extend({}, headerStyle, styles[j]["style"]);
								styles[j]["style"] = style;
							}
						} else {
							columnLength = styles.length;
							for (var k = 0; k < columnLength; k++) {
								style = _.extend({}, detailStyle, styles[k]["style"]);
								styles[k]["style"] = style;
							}
						}
						rowgroups[i]["style"] = styles;
					}
				}
			
				submission.setRequestObject(exportData);
			
				// success listener
				var successListener = function(e) {
					// 정상적으로 처리되었습니다.
					alert("정상적으로 처리되었습니다.");
				};
				submission.addEventListener("submit-success", successListener);
			
				submission.addEventListenerOnce("submit-done", function(e) {
					// done에서 팝업 화면을 닫을 경우, loadMask 를 찾지 못해 오류 발생하여 순서변경
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
					{"name": "TEST_COL020"},
					{"name": "TEST_COL021"},
					{"name": "TEST_COL022"},
					{"name": "TEST_COL023"},
					{"name": "TEST_COL024"},
					{"name": "TEST_COL025"},
					{"name": "TEST_COL026"},
					{"name": "TEST_COL027"},
					{"name": "TEST_COL028"},
					{"name": "TEST_COL029"},
					{"name": "TEST_COL030"},
					{"name": "TEST_COL031"},
					{"name": "TEST_COL032"},
					{"name": "TEST_COL033"},
					{"name": "TEST_COL034"},
					{"name": "TEST_COL035"},
					{"name": "TEST_COL036"},
					{"name": "TEST_COL037"},
					{"name": "TEST_COL038"},
					{"name": "TEST_COL039"},
					{"name": "TEST_COL040"},
					{"name": "TEST_COL041"},
					{"name": "TEST_COL042"},
					{"name": "TEST_COL043"},
					{"name": "TEST_COL044"},
					{"name": "TEST_COL045"},
					{"name": "TEST_COL046"},
					{"name": "TEST_COL047"},
					{"name": "TEST_COL048"},
					{"name": "TEST_COL049"},
					{"name": "TEST_COL050"},
					{"name": "TEST_COL051"},
					{"name": "TEST_COL052"},
					{"name": "TEST_COL053"},
					{"name": "TEST_COL054"},
					{"name": "TEST_COL055"},
					{"name": "TEST_COL056"},
					{"name": "TEST_COL057"},
					{"name": "TEST_COL058"},
					{"name": "TEST_COL059"},
					{"name": "TEST_COL060"},
					{"name": "TEST_COL061"},
					{"name": "TEST_COL062"},
					{"name": "TEST_COL063"},
					{"name": "TEST_COL064"},
					{"name": "TEST_COL065"},
					{"name": "TEST_COL066"},
					{"name": "TEST_COL067"},
					{"name": "TEST_COL068"},
					{"name": "TEST_COL069"},
					{"name": "TEST_COL070"},
					{"name": "TEST_COL071"},
					{"name": "TEST_COL072"},
					{"name": "TEST_COL073"},
					{"name": "TEST_COL074"},
					{"name": "TEST_COL075"},
					{"name": "TEST_COL076"},
					{"name": "TEST_COL077"},
					{"name": "TEST_COL078"},
					{"name": "TEST_COL079"},
					{"name": "TEST_COL080"},
					{"name": "TEST_COL081"},
					{"name": "TEST_COL082"},
					{"name": "TEST_COL083"},
					{"name": "TEST_COL084"},
					{"name": "TEST_COL085"},
					{"name": "TEST_COL086"},
					{"name": "TEST_COL087"},
					{"name": "TEST_COL088"},
					{"name": "TEST_COL089"},
					{"name": "TEST_COL090"},
					{"name": "TEST_COL091"},
					{"name": "TEST_COL092"},
					{"name": "TEST_COL093"},
					{"name": "TEST_COL094"},
					{"name": "TEST_COL095"},
					{"name": "TEST_COL096"},
					{"name": "TEST_COL097"},
					{"name": "TEST_COL098"},
					{"name": "TEST_COL099"},
					{"name": "TEST_COL100"},
					{"name": "TEST_COL101"},
					{"name": "TEST_COL102"},
					{"name": "TEST_COL103"},
					{"name": "TEST_COL104"},
					{"name": "TEST_COL105"},
					{"name": "TEST_COL106"},
					{"name": "TEST_COL107"},
					{"name": "TEST_COL108"},
					{"name": "TEST_COL109"},
					{"name": "TEST_COL110"},
					{"name": "TEST_COL111"},
					{"name": "TEST_COL112"},
					{"name": "TEST_COL113"},
					{"name": "TEST_COL114"},
					{"name": "TEST_COL115"},
					{"name": "TEST_COL116"},
					{"name": "TEST_COL117"},
					{"name": "TEST_COL118"},
					{"name": "TEST_COL119"},
					{"name": "TEST_COL120"},
					{"name": "TEST_COL121"},
					{"name": "TEST_COL122"},
					{"name": "TEST_COL123"},
					{"name": "TEST_COL124"},
					{"name": "TEST_COL125"},
					{"name": "TEST_COL126"},
					{"name": "TEST_COL127"},
					{"name": "TEST_COL128"},
					{"name": "TEST_COL129"},
					{"name": "TEST_COL130"},
					{"name": "TEST_COL131"},
					{"name": "TEST_COL132"},
					{"name": "TEST_COL133"},
					{"name": "TEST_COL134"},
					{"name": "TEST_COL135"},
					{"name": "TEST_COL136"},
					{"name": "TEST_COL137"},
					{"name": "TEST_COL138"},
					{"name": "TEST_COL139"},
					{"name": "TEST_COL140"},
					{"name": "TEST_COL141"},
					{"name": "TEST_COL142"},
					{"name": "TEST_COL143"},
					{"name": "TEST_COL144"},
					{"name": "TEST_COL145"},
					{"name": "TEST_COL146"},
					{"name": "TEST_COL147"},
					{"name": "TEST_COL148"},
					{"name": "TEST_COL149"},
					{"name": "TEST_COL150"},
					{"name": "TEST_COL151"},
					{"name": "TEST_COL152"},
					{"name": "TEST_COL153"},
					{"name": "TEST_COL154"},
					{"name": "TEST_COL155"},
					{"name": "TEST_COL156"},
					{"name": "TEST_COL157"},
					{"name": "TEST_COL158"},
					{"name": "TEST_COL159"},
					{"name": "TEST_COL160"}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dm_request");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "COL",
						"defaultValue": "10"
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
			formLayout_1.setColumns(["100px", "150px", "100px", "150px", "1fr", "70px", "100px"]);
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
					"colIndex": 2,
					"rowIndex": 0
				});
				var comboBox_1 = new cpr.controls.ComboBox("cmb_col");
				comboBox_1.bind("value").toDataMap(app.lookup("dm_request"), "COL");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("10", "10"));
					comboBox_1.addItem(new cpr.controls.Item("20", "20"));
					comboBox_1.addItem(new cpr.controls.Item("30", "30"));
					comboBox_1.addItem(new cpr.controls.Item("50", "50"));
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "컬럼 수";
				output_2.style.css({
					"background-color" : "#f4f4f4",
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var comboBox_2 = new cpr.controls.ComboBox("cmb_data");
				comboBox_2.bind("value").toDataMap(app.lookup("dm_request"), "DATA");
				(function(comboBox_2){
					comboBox_2.addItem(new cpr.controls.Item("10", "10"));
					comboBox_2.addItem(new cpr.controls.Item("20", "20"));
					comboBox_2.addItem(new cpr.controls.Item("50", "50"));
					comboBox_2.addItem(new cpr.controls.Item("100", "100"));
					comboBox_2.addItem(new cpr.controls.Item("1,000", "1000"));
				})(comboBox_2);
				container.addChild(comboBox_2, {
					"colIndex": 3,
					"rowIndex": 0
				});
				var button_1 = new cpr.controls.Button("btn_search");
				button_1.value = "조회";
				if(typeof onBtn_searchClick == "function") {
					button_1.addEventListener("click", onBtn_searchClick);
				}
				container.addChild(button_1, {
					"colIndex": 5,
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
					"colIndex": 6,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1
				});
				var grid_1 = new cpr.controls.Grid("grd");
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("ds_list"),
					"columns": [{"width": "61px"}],
					"header": {
						"rows": [{"height": "22"}],
						"cells": [{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.text = "INDEX";
								cell.style.css({
									"text-align" : "center"
								});
							}
						}]
					},
					"detail": {
						"rows": [{"height": "22"}],
						"cells": [{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnName = "INDEX";
								cell.columnType = "rowindex";
								cell.style.css({
									"text-align" : "center"
								});
							}
						}]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1,
					"colSpan": 7,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "44px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
			});
			
			var userDefinedControl_1 = new udc.pagetitle();
			userDefinedControl_1.bind("title").toAppProperty("title");
			container.addChild(userDefinedControl_1, {
				"top": "10px",
				"right": "10px",
				"left": "10px",
				"height": "24px"
			});
		}
	});
	app.title = "dynamic_grid";
	cpr.core.Platform.INSTANCE.register(app);
})();