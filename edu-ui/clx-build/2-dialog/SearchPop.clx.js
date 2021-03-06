/*
 * App URI: 2-dialog/SearchPop
 * Source Location: 2-dialog/SearchPop.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("2-dialog/SearchPop", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns" : [
					{"name": "ID"},
					{"name": "NAME"},
					{"name": "GENDER"},
					{"name": "BIRTH"},
					{"name": "DEPT"},
					{
						"name": "SALARY",
						"dataType": "number"
					},
					{
						"name": "BONUS",
						"dataType": "number"
					},
					{
						"name": "TOTAL",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "SALARY + BONUS + \"원\""
					}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dm1");
			dataMap_1.parseData({
				"columns" : [{"name": "strName"}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "data/emp.json";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSubListSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubListSubmitSuccess);
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
			formLayout_1.setColumns(["100px", "1fr", "70px", "2fr", "220px"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "이름";
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0,
					"horizontalAlign": "fill",
					"verticalAlign": "center"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.bind("value").toDataMap(app.lookup("dm1"), "strName");
				container.addChild(inputBox_1, {
					"colIndex": 1,
					"rowIndex": 0,
					"verticalAlign": "center"
				});
				var button_1 = new cpr.controls.Button("btnSearch");
				button_1.value = "조회";
				if(typeof onBtnSearchClick == "function") {
					button_1.addEventListener("click", onBtnSearchClick);
				}
				container.addChild(button_1, {
					"colIndex": 2,
					"rowIndex": 0,
					"verticalAlign": "center"
				});
				var userDefinedControl_1 = new udc.GridButtons();
				userDefinedControl_1.gridId = "grd1";
				container.addChild(userDefinedControl_1, {
					"colIndex": 4,
					"rowIndex": 0,
					"verticalAlign": "center"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"right": "20px",
				"left": "20px",
				"height": "50px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.readOnly = false;
			grid_1.init({
				"dataSet": app.lookup("ds1"),
				"columnMovable": false,
				"columnResizable": false,
				"autoFit": "2, 3, 4, 5, 6, 7, 8, 9",
				"columns": [
					{"width": "25px"},
					{"width": "50px"},
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
								cell.filterable = false;
								cell.sortable = false;
								cell.columnType = "checkbox";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.targetColumnName = "ID";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.targetColumnName = "NAME";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "NAME";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.targetColumnName = "GENDER";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "GENDER";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.targetColumnName = "BIRTH";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "BIRTH";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.targetColumnName = "DEPT";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "DEPT";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.targetColumnName = "SALARY";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "SALARY";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.targetColumnName = "BONUS";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "BONUS";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.targetColumnName = "TOTAL";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "TOTAL";
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
								cell.columnType = "checkbox";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnType = "rowindex";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "ID";
								cell.control = (function(){
									var inputBox_2 = new cpr.controls.InputBox("ipb2");
									inputBox_2.bind("value").toDataColumn("ID");
									return inputBox_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "NAME";
								cell.control = (function(){
									var inputBox_3 = new cpr.controls.InputBox("ipb3");
									inputBox_3.bind("value").toDataColumn("NAME");
									return inputBox_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "GENDER";
								cell.control = (function(){
									var comboBox_1 = new cpr.controls.ComboBox("cmb1");
									(function(comboBox_1){
										comboBox_1.addItem(new cpr.controls.Item("여성", "F"));
										comboBox_1.addItem(new cpr.controls.Item("남성", "M"));
									})(comboBox_1);
									comboBox_1.bind("value").toDataColumn("GENDER");
									return comboBox_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "BIRTH";
								cell.control = (function(){
									var dateInput_1 = new cpr.controls.DateInput("dti1");
									dateInput_1.bind("value").toDataColumn("BIRTH");
									return dateInput_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "DEPT";
								cell.control = (function(){
									var comboBox_2 = new cpr.controls.ComboBox();
									(function(comboBox_2){
										comboBox_2.addItem(new cpr.controls.Item("개발부", "D"));
										comboBox_2.addItem(new cpr.controls.Item("영업부", "B"));
										comboBox_2.addItem(new cpr.controls.Item("인사부", "H"));
									})(comboBox_2);
									comboBox_2.bind("value").toDataColumn("DEPT");
									return comboBox_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "SALARY";
								cell.control = (function(){
									var numberEditor_1 = new cpr.controls.NumberEditor("nbe2");
									numberEditor_1.bind("value").toDataColumn("SALARY");
									return numberEditor_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "BONUS";
								cell.control = (function(){
									var numberEditor_2 = new cpr.controls.NumberEditor("nbe1");
									numberEditor_2.bind("value").toDataColumn("BONUS");
									return numberEditor_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.columnName = "TOTAL";
								cell.control = (function(){
									var output_2 = new cpr.controls.Output();
									output_2.value = "Output";
									output_2.bind("value").toDataColumn("TOTAL");
									return output_2;
								})();
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "80px",
				"right": "20px",
				"bottom": "55px",
				"left": "20px"
			});
			
			var button_2 = new cpr.controls.Button("btnSelect");
			button_2.value = "선택닫기";
			if(typeof onBtnSelectClick == "function") {
				button_2.addEventListener("click", onBtnSelectClick);
			}
			container.addChild(button_2, {
				"right": "20px",
				"bottom": "20px",
				"width": "100px",
				"height": "25px"
			});
			
			var button_3 = new cpr.controls.Button("btnClose");
			button_3.value = "화면닫기";
			if(typeof onBtnCloseClick == "function") {
				button_3.addEventListener("click", onBtnCloseClick);
			}
			container.addChild(button_3, {
				"bottom": "20px",
				"left": "20px",
				"width": "100px",
				"height": "25px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "SearchPop";
	cpr.core.Platform.INSTANCE.register(app);
})();
