/*
 * App URI: example/grid/grid_cellstyle2
 * Source Location: example/grid/grid_cellstyle2.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/grid/grid_cellstyle2", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/*
			 * 그리드에서 selection-change 이벤트 발생 시 호출.
			 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트입니다.
			 */
			function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
				/** 
				 * @type cpr.controls.Grid
				 */
				var grd1 = e.control;
				
				var rowIndex = grd1.getSelectedRowIndices()[0]
				var detail = app.lookup("detailGroup");
				
				// 디테일 그룹의 바인딩 문맥 전환
				detail.setBindContext(new cpr.bind.DataRowContext(grd1.dataSet, rowIndex));
			};
			// End - User Script
			
			// Header
			app.declareAppProperty("title", null);
			app.declareAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("sampleDatas");
			dataSet_1.parseData({
				"sortCondition": "scoreGroup DESC",
				"filterCondition": "",
				"columns": [
					{"name": "name"},
					{
						"name": "score",
						"dataType": "number"
					},
					{"name": "tel"},
					{"name": "address"},
					{"name": "color"},
					{
						"name": "scoreGroup",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "floor(score / 10) * 10"
					}
				],
				"rows": [
					{"name": "홍길동", "score": "100", "tel": "1234", "address": "서울", "color": "tomato"},
					{"name": "스티브", "score": "95", "tel": "2345", "address": "대전", "color": "orange"},
					{"name": "김빌더", "score": "91", "tel": "6789", "address": "대구", "color": "blue"},
					{"name": "토마토", "score": "40", "tel": "3212", "address": "부산", "color": "magenta"},
					{"name": "이지율", "score": "43", "tel": "4578", "address": "광주", "color": "green"},
					{"name": "박빌더", "score": "75", "tel": "2164", "address": "제주", "color": "brown"},
					{"name": "머시깽이", "score": "85", "tel": "1234-1234", "address": "어딘가", "color": "aliceblue"}
				]
			});
			(function(dataSet){
				var dataView_1 = new cpr.data.DataView("dv1", dataSet);
				dataView_1.parseData({"filterCondition": "score >= 40"});
				app.register(dataView_1);
			})(dataSet_1);
			app.register(dataSet_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-position" : "90% 90%",
				"background-size" : "100px auto",
				"background-repeat" : "no-repeat",
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px",
				"background-image" : "url('images/air.png')"
			});
			
			// Layout
			var responsiveXYLayout_1 = new cpr.controls.layouts.ResponsiveXYLayout();
			container.setLayout(responsiveXYLayout_1);
			
			// UI Configuration
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("sampleDatas"),
				"collapsible": true,
				"columns": [
					{"width": "161px"},
					{"width": "100px"},
					{"width": "79px"},
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
								cell.text = "이름";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.text = "평점";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.text = "전화번호";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.text = "주소";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.text = "선호 색상";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.text = "-";
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
								cell.columnName = "name";
								cell.style.css({
									"padding" : "0px 0px 0px 30px"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "score";
								cell.control = (function(){
									var output_1 = new cpr.controls.Output();
									output_1.value = "Output";
									output_1.style.css({
										"padding-top" : "0px",
										"background-repeat" : "no-repeat",
										"color" : "#ffffff",
										"padding-left" : "5px",
										"padding-bottom" : "0px",
										"background-image" : "linear-gradient(orange, red)",
										"text-align" : "left",
										"padding-right" : "5px"
									});
									output_1.style.bind("background-size").toExpression("score + \"% 100%\"");
									output_1.bind("value").toDataColumn("score");
									return output_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "tel";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "address";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "color";
								cell.control = (function(){
									var output_2 = new cpr.controls.Output();
									output_2.value = "Output";
									output_2.style.bind("color").toDataColumn("color");
									output_2.bind("value").toDataColumn("color");
									return output_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "score";
							}
						}
					]
				},
				"footer": {
					"rows": [{"height": "20px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.expr = "\"총계: \" + getSum(\"score\")";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.expr = "getSum(\"tel\")";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.expr = "0";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.expr = "0";
							}
						}
					]
				},
				"rowGroup": [{
					"groupCondition": "scoreGroup",
					"gheader": {
						"rows": [{"height": "20px"}],
						"cells": [{
							"constraint": {"rowIndex": 0, "colIndex": 0, "rowSpan": 1, "colSpan": 6},
							"configurator": function(cell){
								cell.expr = "scoreGroup + \"점 대\"";
							}
						}]
					}
				}]
			});
			if(typeof onGrd1SelectionChange == "function") {
				grid_1.addEventListener("selection-change", onGrd1SelectionChange);
			}
			container.addChild(grid_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "70px",
						"right": "532px",
						"bottom": "20px",
						"left": "20px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "20px",
						"right": "20px",
						"left": "9px",
						"height": "261px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"hidden": false,
						"top": "20px",
						"right": "7px",
						"left": "3px",
						"height": "261px"
					}
				]
			});
			
			var group_1 = new cpr.controls.Container("detailGroup");
			group_1.style.css({
				"border-right-style" : "solid",
				"border-radius" : "10px",
				"border-top-width" : "4px",
				"border-right-width" : "4px",
				"border-left-style" : "solid",
				"border-bottom-width" : "4px",
				"border-bottom-style" : "solid",
				"border-left-width" : "4px",
				"border-top-style" : "solid"
			});
			var dataRowContext_1 = new cpr.bind.DataRowContext(app.lookup("sampleDatas"), 0);
			group_1.setBindContext(dataRowContext_1);
			group_1.style.bind("border-color").toDataColumn("color");
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_1);
			(function(container){
				var output_3 = new cpr.controls.Output();
				output_3.value = "이름";
				container.addChild(output_3, {
					"top": "20px",
					"left": "20px",
					"width": "100px",
					"height": "20px"
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "평점";
				container.addChild(output_4, {
					"top": "50px",
					"left": "20px",
					"width": "100px",
					"height": "20px"
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "전화번호";
				container.addChild(output_5, {
					"top": "80px",
					"left": "20px",
					"width": "100px",
					"height": "20px"
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "주소";
				container.addChild(output_6, {
					"top": "110px",
					"left": "20px",
					"width": "100px",
					"height": "20px"
				});
				var output_7 = new cpr.controls.Output();
				output_7.value = "선호색상";
				output_7.style.bind("color").toDataColumn("color");
				container.addChild(output_7, {
					"top": "140px",
					"left": "20px",
					"width": "100px",
					"height": "20px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.bind("value").toDataColumn("name");
				container.addChild(inputBox_1, {
					"top": "20px",
					"left": "130px",
					"width": "100px",
					"height": "20px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipb2");
				inputBox_2.bind("value").toDataColumn("score");
				container.addChild(inputBox_2, {
					"top": "50px",
					"left": "130px",
					"width": "100px",
					"height": "20px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipb3");
				inputBox_3.bind("value").toDataColumn("tel");
				container.addChild(inputBox_3, {
					"top": "80px",
					"left": "130px",
					"width": "100px",
					"height": "20px"
				});
				var inputBox_4 = new cpr.controls.InputBox("ipb4");
				inputBox_4.bind("value").toDataColumn("address");
				container.addChild(inputBox_4, {
					"top": "110px",
					"left": "130px",
					"width": "100px",
					"height": "20px"
				});
				var inputBox_5 = new cpr.controls.InputBox("ipb5");
				inputBox_5.bind("value").toDataColumn("color");
				container.addChild(inputBox_5, {
					"top": "140px",
					"left": "130px",
					"width": "100px",
					"height": "20px"
				});
				var button_1 = new cpr.controls.Button("btn1");
				button_1.value = "Button";
				button_1.bind("tooltip").toExpression("name + \"에 관한 정보입니다, \" + tel + \"로 연락 주십시오.\"");
				button_1.bind("value").toExpression("name + \"(\" + address + \"), \" + tel");
				container.addChild(button_1, {
					"top": "20px",
					"left": "255px",
					"width": "146px",
					"height": "20px"
				});
			})(group_1);
			container.addChild(group_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "70px",
						"right": "20px",
						"bottom": "20px",
						"width": "502px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "291px",
						"right": "20px",
						"left": "9px",
						"height": "261px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"hidden": false,
						"top": "291px",
						"right": "7px",
						"left": "3px",
						"height": "261px"
					}
				]
			});
			
			var userDefinedControl_1 = new udc.pagetitle2();
			userDefinedControl_1.bind("title").toAppProperty("title");
			userDefinedControl_1.bind("explain").toAppProperty("explain");
			container.addChild(userDefinedControl_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "10px",
						"right": "10px",
						"left": "10px",
						"height": "50px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"hidden": false,
						"top": "10px",
						"right": "5px",
						"left": "5px",
						"height": "50px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"hidden": false,
						"top": "10px",
						"right": "3px",
						"left": "3px",
						"height": "50px"
					}
				]
			});
		}
	});
	app.title = "마스터/디테일2";
	cpr.core.Platform.INSTANCE.register(app);
})();
