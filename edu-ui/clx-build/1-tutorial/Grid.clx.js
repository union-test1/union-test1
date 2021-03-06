/*
 * App URI: 1-tutorial/Grid
 * Source Location: 1-tutorial/Grid.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("1-tutorial/Grid", {
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
				//서브미션 통신
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
				app.lookup("grd1").redraw();
			}
			
			
			/*
			 * "추가" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnAdd = e.control;
				//그리드를 선언한다.
				var grid = app.lookup("grd1");
				
				var selectedRow = grid.getSelectedRowIndex();
				
				//그리드에 행 추가
				// 1) 선택한 행이 있으면 선택한 행 아래에 행을 추가한다.
				// 2) 선택한 행이 없으면 0번째에 행을 추가한다.
				if(selectedRow != -1){
					grid.insertRow(selectedRow, true);
				}else{
					grid.insertRow(0, false);
				}
			}
			
			
			/*
			 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnDel = e.control;
				// 그리드를 선언한다.
				var grid = app.lookup("grd1");
				
				var selectedRow = grid.getSelectedRowIndex();
				
				// 그리드의 행을 삭제한다.
				// 1) 선택한 행이 있으면 선택한 행을 삭제한다.
				// 2) 선택한 행이 없으면 "선택된 행이 없습니다." 라는 메세지를 띄운다.
				if(selectedRow != -1){
					grid.deleteRow(selectedRow, true);
				}else{
					alert("선택된 행이 없습니다.");
				}
			}
			
			
			/*
			 * "저장" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSave = e.control;
				// 데이터셋을 선언한다.
				var ds = app.lookup("ds1");
				
				// 데이터셋을 커밋한다.
				ds.commit();
				
				// 데이터셋과 연결된 컨트롤(그리드)를 리드로우한다.
				app.lookup("grd1").redraw();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"sortCondition": "DEPT",
				"columns": [
					{"name": "ID"},
					{"name": "NAME"},
					{"name": "GENDER"},
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
						"name": "SUM",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "SALARY + BONUS + \"원\"",
						"info": ""
					},
					{
						"name": "TOTAL",
						"dataType": "number"
					}
				]
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("subList");
			submission_1.action = "data/emp.json";
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
			formLayout_1.setColumns(["1fr", "1fr", "1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button("btnAdd");
				button_1.value = "추가";
				if(typeof onBtnAddClick == "function") {
					button_1.addEventListener("click", onBtnAddClick);
				}
				container.addChild(button_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_2 = new cpr.controls.Button("btnDel");
				button_2.value = "삭제";
				if(typeof onBtnDelClick == "function") {
					button_2.addEventListener("click", onBtnDelClick);
				}
				container.addChild(button_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var button_3 = new cpr.controls.Button("btnSave");
				button_3.value = "저장";
				if(typeof onBtnSaveClick == "function") {
					button_3.addEventListener("click", onBtnSaveClick);
				}
				container.addChild(button_3, {
					"colIndex": 2,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"right": "20px",
				"width": "210px",
				"height": "25px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.readOnly = false;
			grid_1.init({
				"dataSet": app.lookup("ds1"),
				"columnMovable": false,
				"columnResizable": false,
				"autoFit": "2, 3, 4, 5, 6, 7, 8, 9",
				"collapsible": true,
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
								cell.sortable = true;
								cell.text = "사번";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.targetColumnName = "NAME";
								cell.filterable = false;
								cell.sortable = true;
								cell.text = "이름";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.targetColumnName = "GENDER";
								cell.filterable = false;
								cell.sortable = true;
								cell.text = "성별";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.targetColumnName = "DEPARTMENT";
								cell.filterable = false;
								cell.sortable = true;
								cell.text = "부서";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.targetColumnName = "SALARY";
								cell.filterable = false;
								cell.sortable = true;
								cell.text = "급여";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.targetColumnName = "BONUS";
								cell.filterable = false;
								cell.sortable = true;
								cell.text = "상여금";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.targetColumnName = "TOTAL";
								cell.filterable = false;
								cell.sortable = true;
								cell.text = "합계";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.targetColumnName = "SUM";
								cell.filterable = false;
								cell.sortable = true;
								cell.visible = false;
								cell.text = "합계";
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
									var inputBox_1 = new cpr.controls.InputBox("ipb1");
									inputBox_1.bind("value").toDataColumn("ID");
									return inputBox_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "NAME";
								cell.control = (function(){
									var inputBox_2 = new cpr.controls.InputBox("ipb2");
									inputBox_2.bind("value").toDataColumn("NAME");
									return inputBox_2;
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
								cell.columnName = "DEPT";
								cell.control = (function(){
									var inputBox_3 = new cpr.controls.InputBox("ipb3");
									inputBox_3.bind("value").toDataColumn("DEPT");
									return inputBox_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "SALARY";
								cell.style.css({
									"text-align" : "right"
								});
								cell.control = (function(){
									var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
									numberEditor_1.style.css({
										"text-align" : "right"
									});
									numberEditor_1.bind("value").toDataColumn("SALARY");
									return numberEditor_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "BONUS";
								cell.style.css({
									"text-align" : "right"
								});
								cell.control = (function(){
									var numberEditor_2 = new cpr.controls.NumberEditor("nbe2");
									numberEditor_2.style.css({
										"text-align" : "right"
									});
									numberEditor_2.bind("value").toDataColumn("BONUS");
									return numberEditor_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "TOTAL";
								cell.style.css({
									"text-align" : "right"
								});
								cell.control = (function(){
									var output_1 = new cpr.controls.Output();
									output_1.dataType = "number";
									output_1.style.css({
										"text-align" : "right"
									});
									output_1.bind("value").toDataColumn("TOTAL");
									return output_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.columnName = "SUM";
								cell.style.css({
									"text-align" : "right"
								});
								cell.control = (function(){
									var output_2 = new cpr.controls.Output();
									output_2.style.css({
										"text-align" : "right"
									});
									output_2.bind("value").toDataColumn("SUM");
									return output_2;
								})();
							}
						}
					]
				},
				"footer": {
					"rows": [
						{"height": "24px"},
						{"height": "24px"}
					],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 6},
							"configurator": function(cell){
								cell.expr = "\"SUM\"";
								cell.style.css({
									"background-color" : "#f0f0f0",
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.expr = "getSum(\"SALARY\") + \"원\"";
								cell.style.css({
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.expr = "getSum(\"BONUS\") + \"원\"";
								cell.style.css({
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.expr = "getSum(\"TOTAL\") + \"원\"";
								cell.style.css({
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 0, "rowSpan": 1, "colSpan": 6},
							"configurator": function(cell){
								cell.expr = "\"AVG\"";
								cell.style.css({
									"background-color" : "#f0f0f0",
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 6},
							"configurator": function(cell){
								cell.expr = "round(getAvg(\"SALARY\")) + \"원\"";
								cell.style.css({
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 7},
							"configurator": function(cell){
								cell.expr = "round(getAvg(\"BONUS\")) + \"원\"";
								cell.style.css({
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 8},
							"configurator": function(cell){
								cell.expr = "round(getAvg(\"TOTAL\")) + \"원\"";
								cell.style.css({
									"text-align" : "right"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 9},
							"configurator": function(cell){
							}
						}
					]
				},
				"rowGroup": [{
					"groupCondition": "DEPT",
					"startCollapse": true,
					"gheader": {
						"rows": [{"height": "24px"}],
						"cells": [{
							"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 10},
							"configurator": function(cell){
								cell.expr = "DEPT";
								cell.style.css({
									"background-color" : "#fffee0"
								});
							}
						}]
					},
					"gfooter": {
						"rows": [
							{"height": "24px"},
							{"height": "24px"}
						],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 8},
								"configurator": function(cell){
									cell.expr = "\"MAX\"";
									cell.style.css({
										"background-color" : "#f0f0f0",
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8, "rowSpan": 1, "colSpan": 1},
								"configurator": function(cell){
									cell.expr = "getMax(\"TOTAL\") + \"원\"";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 0, "rowSpan": 1, "colSpan": 8},
								"configurator": function(cell){
									cell.expr = "\"MIN\"";
									cell.style.css({
										"background-color" : "#f0f0f0",
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 8},
								"configurator": function(cell){
									cell.expr = "getMin(\"TOTAL\") + \"원\"";
									cell.style.css({
										"text-align" : "right"
									});
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 9},
								"configurator": function(cell){
								}
							}
						]
					}
				}]
			});
			container.addChild(grid_1, {
				"top": "55px",
				"right": "20px",
				"bottom": "20px",
				"left": "20px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "Grid";
	cpr.core.Platform.INSTANCE.register(app);
})();
