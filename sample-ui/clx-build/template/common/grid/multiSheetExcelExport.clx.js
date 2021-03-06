/*
 * App URI: template/common/grid/multiSheetExcelExport
 * Source Location: template/common/grid/multiSheetExcelExport.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("template/common/grid/multiSheetExcelExport", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
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
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			var dataSet_1 = new cpr.data.DataSet("main");
			dataSet_1.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{
						"name": "column4",
						"dataType": "number"
					},
					{"name": "column5"},
					{"name": "column6"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("sub1");
			dataSet_2.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{
						"name": "column4",
						"dataType": "number"
					},
					{"name": "column5"},
					{"name": "column6"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("sub2");
			dataSet_3.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{
						"name": "column4",
						"dataType": "number"
					},
					{"name": "column5"},
					{"name": "column6"}
				]
			});
			app.register(dataSet_3);
			
			var dataSet_4 = new cpr.data.DataSet("sub3");
			dataSet_4.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{
						"name": "column4",
						"dataType": "number"
					},
					{"name": "column5"},
					{"name": "column6"}
				]
			});
			app.register(dataSet_4);
			var submission_1 = new cpr.protocols.Submission("subMain");
			submission_1.action = "../example/promise/submain.do";
			submission_1.addResponseData(dataSet_1, false);
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSub1");
			submission_2.action = "../example/promise/subsub1.do";
			submission_2.addResponseData(dataSet_2, false);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("subSub2");
			submission_3.action = "../example/promise/subsub2.do";
			submission_3.addResponseData(dataSet_3, false);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("subSub3");
			submission_4.action = "../example/promise/subsub3.do";
			submission_4.addResponseData(dataSet_4, false);
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("subExport");
			submission_5.action = "../export/그리드.xls";
			submission_5.responseType = "blob";
			app.register(submission_5);
			
			app.supportMedia("all", "default");
			
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
			formLayout_1.horizontalSeparatorWidth = 1;
			formLayout_1.horizontalSeparatorColor = "#a4a4a4";
			formLayout_1.verticalSeparatorWidth = 1;
			formLayout_1.verticalSeparatorColor = "#a4a4a4";
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setRows(["30px", "1fr", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grd_main");
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("main"),
					"bufferedScroll": true,
					"columns": [
						{"width": "45px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [
							{"height": "24px"},
							{"height": "24px"}
						],
						"cells": [
							{
								"constraint": {"rowIndex": 1, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column1";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column2";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 1, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column3";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.text = "column4";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.text = "column5";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.text = "column6";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 2, "colSpan": 1},
								"configurator": function(cell){
									cell.text = "No.";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1, "rowSpan": 1, "colSpan": 3},
								"configurator": function(cell){
									cell.text = "분류";
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column1";
									cell.suppressRef = -1;
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column2";
									cell.suppressRef = -1;
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column3";
									cell.suppressRef = -1;
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column4";
									cell.style.css({
										"background-color" : "#FFF000"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column5";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("dti1");
										dateInput_1.style.css({
											"text-align" : "center"
										});
										dateInput_1.bind("value").toDataColumn("column5");
										return dateInput_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column6";
									cell.suppressible = false;
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					}
				});
				grid_1.style.css({
					"font-size" : "12px"
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var grid_2 = new cpr.controls.Grid("grd_sub1");
				grid_2.readOnly = true;
				grid_2.init({
					"dataSet": app.lookup("sub1"),
					"bufferedScroll": true,
					"columns": [
						{"width": "45px"},
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
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column1";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column2";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column3";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column4";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column5";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "column6";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "No.";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column4";
									cell.style.css({
										"background-color" : "#00ffff"
									});
									cell.control = (function(){
										var numberEditor_1 = new cpr.controls.NumberEditor("nbe2");
										numberEditor_1.format = "s000,000,000,000,000";
										numberEditor_1.style.css({
											"text-align" : "right"
										});
										numberEditor_1.bind("value").toDataColumn("column4");
										return numberEditor_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column5";
									cell.control = (function(){
										var dateInput_2 = new cpr.controls.DateInput("dti2");
										dateInput_2.style.css({
											"text-align" : "center"
										});
										dateInput_2.bind("value").toDataColumn("column5");
										return dateInput_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column6";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					}
				});
				grid_2.style.css({
					"font-size" : "12px"
				});
				container.addChild(grid_2, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var grid_3 = new cpr.controls.Grid("grd_sub2");
				grid_3.readOnly = true;
				grid_3.init({
					"dataSet": app.lookup("sub2"),
					"bufferedScroll": true,
					"columns": [
						{"width": "45px"},
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
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column1";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column2";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column3";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column4";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column5";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "column6";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "No.";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column4";
									cell.control = (function(){
										var numberEditor_2 = new cpr.controls.NumberEditor("nbe3");
										numberEditor_2.format = "s000,000,000,000,000";
										numberEditor_2.style.css({
											"text-align" : "right"
										});
										numberEditor_2.bind("value").toDataColumn("column4");
										return numberEditor_2;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column5";
									cell.control = (function(){
										var dateInput_3 = new cpr.controls.DateInput("dti3");
										dateInput_3.style.css({
											"text-align" : "center"
										});
										dateInput_3.bind("value").toDataColumn("column5");
										return dateInput_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column6";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					}
				});
				grid_3.style.css({
					"font-size" : "12px"
				});
				container.addChild(grid_3, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var grid_4 = new cpr.controls.Grid("grd_sub3");
				grid_4.readOnly = true;
				grid_4.init({
					"dataSet": app.lookup("sub3"),
					"bufferedScroll": true,
					"columns": [
						{"width": "45px"},
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
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column1";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column2";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column3";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column4";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column5";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "column6";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.text = "No.";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column4";
									cell.control = (function(){
										var numberEditor_3 = new cpr.controls.NumberEditor("nbe4");
										numberEditor_3.format = "s000,000,000,000,000";
										numberEditor_3.style.css({
											"text-align" : "right"
										});
										numberEditor_3.bind("value").toDataColumn("column4");
										return numberEditor_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column5";
									cell.control = (function(){
										var dateInput_4 = new cpr.controls.DateInput("dti4");
										dateInput_4.style.css({
											"text-align" : "center"
										});
										dateInput_4.bind("value").toDataColumn("column5");
										return dateInput_4;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column6";
									cell.style.css({
										"text-align" : "center"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					}
				});
				grid_4.style.css({
					"font-size" : "12px"
				});
				container.addChild(grid_4, {
					"colIndex": 1,
					"rowIndex": 2
				});
				var group_2 = new cpr.controls.Container();
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr", "70px", "70px", "100px"]);
				formLayout_2.setRows(["25px", "1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var button_1 = new cpr.controls.Button();
					button_1.value = "Excel Export";
					button_1.style.css({
						"font-size" : "12px"
					});
					if(typeof onButtonClick3 == "function") {
						button_1.addEventListener("click", onButtonClick3);
					}
					container.addChild(button_1, {
						"colIndex": 3,
						"rowIndex": 0
					});
					var button_2 = new cpr.controls.Button();
					button_2.value = "클리어";
					button_2.style.css({
						"font-size" : "12px"
					});
					if(typeof onButtonClick2 == "function") {
						button_2.addEventListener("click", onButtonClick2);
					}
					container.addChild(button_2, {
						"colIndex": 2,
						"rowIndex": 0
					});
					var button_3 = new cpr.controls.Button();
					button_3.value = "조회";
					button_3.style.css({
						"font-size" : "12px"
					});
					if(typeof onButtonClick == "function") {
						button_3.addEventListener("click", onButtonClick);
					}
					container.addChild(button_3, {
						"colIndex": 1,
						"rowIndex": 0
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 2,
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
	app.title = "프라미스 예제";
	cpr.core.Platform.INSTANCE.register(app);
})();
