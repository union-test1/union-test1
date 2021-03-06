/*
 * App URI: example/grid/grid_crud
 * Source Location: example/grid/grid_crud.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/grid/grid_crud", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * "조회" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				// 조회 submission, 데이터를 전송합니다. 이미 동일한 서브미션으로 전송 중인 경우 실행되지 않습니다.
				app.lookup("subMain").send();
			}
			
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubMainSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var subMain = e.control;
				
				// 그리드 컨트롤을 다시 그립니다.
				app.lookup("grd1").redraw();
				
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
				
				// 모든 데이터셋 정보를 제거합니다.
				app.lookup("mainDS").clear();
				
				// 그리드 컨트롤을 다시 그립니다.
				app.lookup("grd1").redraw();
			}
			
			/*
			 * "신규" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick5(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				var grd1 = app.lookup("grd1");
				var rowIdx = 0;
				// 선택된 row index 배열을 반환합니다.
				var rowIdices = grd1.getSelectedRowIndices();
				if(rowIdices && rowIdices.length > 0) {
					rowIdx = rowIdices[rowIdices.length - 1];
				}
				
				// 그리드에 신규 Row를 추가합니다.
				grd1.insertRow(rowIdx, true);
			}
			
			
			/*
			 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick6(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				var grd1 = app.lookup("grd1");
				// 선택된 row index 배열을 반환합니다.
				var rowIdices = grd1.getSelectedRowIndices();
				
				// 선택된 row 를 삭제합니다.
				grd1.deleteRow(rowIdices);
				
				// 선택을 모두 제거합니다.
				grd1.clearSelection();
			}
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("mainDS");
			dataSet_1.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{
						"name": "column6",
						"dataType": "number"
					},
					{
						"name": "column7",
						"dataType": "number"
					},
					{
						"name": "column8",
						"dataType": "number"
					},
					{
						"name": "column9",
						"dataType": "number"
					},
					{
						"name": "column10",
						"dataType": "number"
					},
					{"name": "column11"},
					{"name": "column12"},
					{"name": "column13"},
					{"name": "column14"},
					{"name": "column15"},
					{"name": "column16"},
					{"name": "column17"},
					{"name": "column18"},
					{"name": "column19"},
					{"name": "column20"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds1");
			dataSet_2.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31"},
					{"column1": "column12", "column2": "column22", "column3": "column32"},
					{"column1": "column13", "column2": "column23", "column3": "column33"},
					{"column1": "column14", "column2": "column24", "column3": "column34"},
					{"column1": "column15", "column2": "column25", "column3": "column35"},
					{"column1": "column16", "column2": "column26", "column3": "column36"},
					{"column1": "column17", "column2": "column27", "column3": "column37"},
					{"column1": "column18", "column2": "column28", "column3": "column38"},
					{"column1": "column19", "column2": "column29", "column3": "column39"},
					{"column1": "column110", "column2": "column210", "column3": "column310"},
					{"column1": "column111", "column2": "column211", "column3": "column311"},
					{"column1": "column112", "column2": "column212", "column3": "column312"},
					{"column1": "column113", "column2": "column213", "column3": "column313"},
					{"column1": "column114", "column2": "column214", "column3": "column314"},
					{"column1": "column115", "column2": "column215", "column3": "column315"},
					{"column1": "column116", "column2": "column216", "column3": "column316"},
					{"column1": "column117", "column2": "column217", "column3": "column317"},
					{"column1": "column118", "column2": "column218", "column3": "column318"}
				]
			});
			app.register(dataSet_2);
			var submission_1 = new cpr.protocols.Submission("subMain");
			submission_1.async = false;
			submission_1.action = "../example/gridcrud/splitData2.do";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSubMainSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubMainSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subExport");
			submission_2.action = "../export/그리드.xlsx";
			submission_2.responseType = "blob";
			app.register(submission_2);
			
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
			var button_1 = new cpr.controls.Button();
			button_1.value = "조회";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "70px",
				"right": "250px",
				"width": "70px",
				"height": "20px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("mainDS"),
				"columnMovable": true,
				"columnResizable": true,
				"selectionUnit": "row",
				"selectionMulti": "multi",
				"leftSplit": 0,
				"leftSplitWidth": 600,
				"columns": [
					{"width": "43px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "110px"},
					{"width": "110px"},
					{"width": "110px"},
					{"width": "110px"},
					{"width": "110px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 2},
							"configurator": function(cell){
								cell.text = "헤더1";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-left-style" : "solid",
									"border-right-width" : "1px",
									"border-left-color" : "#000000",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-left-width" : "1px",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.text = "헤더2";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.text = "헤더3";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.text = "헤더4";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.text = "헤더5";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.text = "헤더6";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.text = "헤더7";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.text = "헤더8";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.text = "헤더9";
								cell.style.css({
									"border-right-style" : "dotted",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.text = "헤더10";
								cell.style.css({
									"border-right-style" : "solid",
									"border-top-width" : "1px",
									"border-right-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-top-style" : "solid"
								});
							}
						}
					]
				},
				"detail": {
					"rows": [
						{"height": "24px"},
						{"height": "24px"},
						{"height": "24px"}
					],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 3, "colSpan": 1},
							"configurator": function(cell){
								cell.columnType = "rowindex";
								cell.style.css({
									"border-right-style" : "solid",
									"border-bottom-color" : "#000000",
									"border-left-style" : "solid",
									"border-right-width" : "1px",
									"border-left-color" : "#000000",
									"border-bottom-width" : "1px",
									"vertical-align" : "middle",
									"border-bottom-style" : "solid",
									"border-right-color" : "#000000",
									"border-left-width" : "1px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "column1";
								cell.control = (function(){
									var inputBox_1 = new cpr.controls.InputBox("ipb1");
									inputBox_1.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									inputBox_1.bind("value").toDataColumn("column1");
									return inputBox_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "column2";
								cell.control = (function(){
									var inputBox_2 = new cpr.controls.InputBox("ipb2");
									inputBox_2.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									inputBox_2.bind("value").toDataColumn("column2");
									return inputBox_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "column3";
								cell.control = (function(){
									var inputBox_3 = new cpr.controls.InputBox("ipb3");
									inputBox_3.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									inputBox_3.bind("value").toDataColumn("column3");
									return inputBox_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "column4";
								cell.control = (function(){
									var inputBox_4 = new cpr.controls.InputBox("ipb4");
									inputBox_4.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									inputBox_4.bind("value").toDataColumn("column4");
									return inputBox_4;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "column5";
								cell.control = (function(){
									var inputBox_5 = new cpr.controls.InputBox("ipb5");
									inputBox_5.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									inputBox_5.bind("value").toDataColumn("column5");
									return inputBox_5;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "column6";
								cell.control = (function(){
									var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
									numberEditor_1.format = "s000,000,000,000,000";
									numberEditor_1.style.css({
										"font-size" : "12px",
										"text-align" : "right"
									});
									numberEditor_1.bind("value").toDataColumn("column6");
									return numberEditor_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "column7";
								cell.columnType = "normal";
								cell.suppressible = false;
								cell.suppressRef = -1;
								cell.control = (function(){
									var numberEditor_2 = new cpr.controls.NumberEditor();
									numberEditor_2.format = "s000,000,000,000,000";
									numberEditor_2.style.css({
										"font-size" : "12px",
										"text-align" : "right"
									});
									numberEditor_2.bind("value").toDataColumn("column7");
									return numberEditor_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "column8";
								cell.columnType = "normal";
								cell.suppressible = false;
								cell.suppressRef = -1;
								cell.control = (function(){
									var numberEditor_3 = new cpr.controls.NumberEditor();
									numberEditor_3.format = "s000,000,000,000,000";
									numberEditor_3.style.css({
										"font-size" : "12px",
										"text-align" : "right"
									});
									numberEditor_3.bind("value").toDataColumn("column8");
									return numberEditor_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.columnName = "column9";
								cell.columnType = "normal";
								cell.suppressible = false;
								cell.suppressRef = -1;
								cell.control = (function(){
									var numberEditor_4 = new cpr.controls.NumberEditor();
									numberEditor_4.format = "s000,000,000,000,000";
									numberEditor_4.style.css({
										"font-size" : "12px",
										"text-align" : "right"
									});
									numberEditor_4.bind("value").toDataColumn("column9");
									return numberEditor_4;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.columnName = "column10";
								cell.columnType = "normal";
								cell.suppressible = false;
								cell.suppressRef = -1;
								cell.style.css({
									"border-right-style" : "solid",
									"border-right-width" : "1px",
									"border-right-color" : "#000000"
								});
								cell.control = (function(){
									var numberEditor_5 = new cpr.controls.NumberEditor();
									numberEditor_5.format = "s000,000,000,000,000";
									numberEditor_5.style.css({
										"font-size" : "12px",
										"text-align" : "right"
									});
									numberEditor_5.bind("value").toDataColumn("column10");
									return numberEditor_5;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 1, "rowSpan": 1, "colSpan": 1},
							"configurator": function(cell){
								cell.columnName = "column11";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "column12";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "column13";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "column14";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "column15";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "column16";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "column17";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "column18";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 1, "colIndex": 9, "rowSpan": 1, "colSpan": 2},
							"configurator": function(cell){
								cell.columnName = "column19";
								cell.style.css({
									"border-right-style" : "solid",
									"border-right-width" : "1px",
									"border-right-color" : "#000000",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 2, "colIndex": 1, "rowSpan": 1, "colSpan": 10},
							"configurator": function(cell){
								cell.columnName = "column20";
								cell.style.css({
									"border-right-style" : "solid",
									"background-color" : "rgba(232, 221, 88, 0.3)",
									"border-top-width" : "1px",
									"border-bottom-color" : "#000000",
									"border-right-width" : "1px",
									"border-bottom-width" : "1px",
									"border-top-color" : "#000000",
									"border-right-color" : "#000000",
									"border-bottom-style" : "solid",
									"border-top-style" : "dashed",
									"text-align" : "right"
								});
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "100px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
			});
			
			var button_2 = new cpr.controls.Button();
			button_2.value = "초기화";
			if(typeof onButtonClick2 == "function") {
				button_2.addEventListener("click", onButtonClick2);
			}
			container.addChild(button_2, {
				"top": "70px",
				"right": "170px",
				"width": "70px",
				"height": "20px"
			});
			
			var button_3 = new cpr.controls.Button();
			button_3.value = "삭제";
			if(typeof onButtonClick6 == "function") {
				button_3.addEventListener("click", onButtonClick6);
			}
			container.addChild(button_3, {
				"top": "70px",
				"right": "10px",
				"width": "70px",
				"height": "20px"
			});
			
			var button_4 = new cpr.controls.Button();
			button_4.value = "신규";
			if(typeof onButtonClick5 == "function") {
				button_4.addEventListener("click", onButtonClick5);
			}
			container.addChild(button_4, {
				"top": "70px",
				"right": "90px",
				"width": "70px",
				"height": "20px"
			});
			
			var userDefinedControl_1 = new udc.pagetitle2();
			userDefinedControl_1.bind("title").toAppProperty("title");
			userDefinedControl_1.bind("explain").toAppProperty("explain");
			container.addChild(userDefinedControl_1, {
				"top": "10px",
				"right": "10px",
				"left": "10px",
				"height": "50px"
			});
		}
	});
	app.title = "그리트(신규 + 삭제)";
	cpr.core.Platform.INSTANCE.register(app);
})();
