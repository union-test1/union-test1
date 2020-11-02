/*
 * App URI: example/grid/grid_split
 * Source Location: example/grid/grid_split.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/grid/grid_split", {
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
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("mainDS");
			dataSet_1.parseData({
				"columns" : [
					{
						"name": "column1",
						"dataType": "string",
						"displayOnly": false
					},
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
			var submission_1 = new cpr.protocols.Submission("subMain");
			submission_1.action = "../example/gridcrud/splitData.do";
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
				"right": "90px",
				"width": "70px",
				"height": "20px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.readOnly = true;
			grid_1.init({
				"dataSet": app.lookup("mainDS"),
				"columnMovable": true,
				"columnResizable": true,
				"leftSplit": 5,
				"leftSplitWidth": 550,
				"columns": [
					{"width": "40px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "110px"},
					{"width": "110px"},
					{"width": "110px"},
					{"width": "110px"},
					{"width": "110px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "230px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "200px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "187px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 2},
							"configurator": function(cell){
								cell.text = "헤더1";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.text = "헤더2";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.text = "헤더3";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.text = "헤더4";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.text = "헤더5";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.text = "헤더6";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.text = "헤더7";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.text = "헤더8";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.text = "헤더9";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.text = "헤더10";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더11";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더12";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더13";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 14},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더14";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 15},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더15";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 16},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더16";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 17},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더17";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 18},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더18";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 19},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더19";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 20},
							"configurator": function(cell){
								cell.visible = false;
								cell.text = "헤더20";
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
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "column2";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "column3";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "column4";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "column5";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "column6";
								cell.control = (function(){
									var output_1 = new cpr.controls.Output();
									output_1.dataType = "number";
									output_1.format = "000,000,000,000";
									output_1.style.css({
										"text-align" : "right"
									});
									output_1.bind("value").toDataColumn("column6");
									return output_1;
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
									var output_2 = new cpr.controls.Output();
									output_2.dataType = "number";
									output_2.format = "000,000,000,000";
									output_2.style.css({
										"text-align" : "right"
									});
									output_2.bind("value").toDataColumn("column7");
									return output_2;
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
									var output_3 = new cpr.controls.Output();
									output_3.dataType = "number";
									output_3.format = "000,000,000,000";
									output_3.style.css({
										"text-align" : "right"
									});
									output_3.bind("value").toDataColumn("column8");
									return output_3;
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
									var output_4 = new cpr.controls.Output();
									output_4.dataType = "number";
									output_4.format = "000,000,000,000";
									output_4.style.css({
										"text-align" : "right"
									});
									output_4.bind("value").toDataColumn("column9");
									return output_4;
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
								cell.control = (function(){
									var output_5 = new cpr.controls.Output();
									output_5.dataType = "number";
									output_5.format = "000,000,000,000";
									output_5.style.css({
										"text-align" : "right"
									});
									output_5.bind("value").toDataColumn("column10");
									return output_5;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.columnName = "column11";
								cell.control = (function(){
									var output_6 = new cpr.controls.Output();
									output_6.format = "0000-00-00";
									output_6.style.css({
										"text-align" : "center"
									});
									output_6.bind("value").toDataColumn("column11");
									return output_6;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.columnName = "column12";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.columnName = "column13";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 14},
							"configurator": function(cell){
								cell.columnName = "column14";
								cell.control = (function(){
									var output_7 = new cpr.controls.Output();
									output_7.format = "0000-00-00";
									output_7.style.css({
										"text-align" : "center"
									});
									output_7.bind("value").toDataColumn("column14");
									return output_7;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 15},
							"configurator": function(cell){
								cell.columnName = "column15";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 16},
							"configurator": function(cell){
								cell.columnName = "column16";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 17},
							"configurator": function(cell){
								cell.columnName = "column17";
								cell.control = (function(){
									var output_8 = new cpr.controls.Output();
									output_8.value = "Output";
									output_8.format = "0000-00-00";
									output_8.style.css({
										"text-align" : "center"
									});
									output_8.bind("value").toDataColumn("column17");
									return output_8;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 18},
							"configurator": function(cell){
								cell.columnName = "column18";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 19},
							"configurator": function(cell){
								cell.columnName = "column19";
								cell.style.css({
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 20},
							"configurator": function(cell){
								cell.columnName = "column20";
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
				},
				"footer": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 6},
							"configurator": function(cell){
								cell.expr = "총계";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.expr = "getSum(\"column6\")";
								cell.control = (function(){
									var output_9 = new cpr.controls.Output();
									output_9.dataType = "number";
									output_9.format = "999,999,999,999";
									return output_9;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.expr = "getSum(\"column7\")";
								cell.control = (function(){
									var output_10 = new cpr.controls.Output();
									output_10.dataType = "number";
									output_10.format = "999,999,999,999";
									return output_10;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.expr = "getSum(\"column8\")";
								cell.control = (function(){
									var output_11 = new cpr.controls.Output();
									output_11.dataType = "number";
									output_11.format = "999,999,999,999";
									return output_11;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.expr = "getSum(\"column9\")";
								cell.control = (function(){
									var output_12 = new cpr.controls.Output();
									output_12.dataType = "number";
									output_12.format = "999,999,999,999";
									return output_12;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.expr = "getSum(\"column10\")";
								cell.control = (function(){
									var output_13 = new cpr.controls.Output();
									output_13.dataType = "number";
									output_13.format = "999,999,999,999";
									return output_13;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.expr = "";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.expr = "";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 14},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 15},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 16},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 17},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 18},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 19},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 20},
							"configurator": function(cell){
								cell.expr = "0";
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
				"right": "10px",
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
	app.title = "그리드(스플릿)";
	cpr.core.Platform.INSTANCE.register(app);
})();
