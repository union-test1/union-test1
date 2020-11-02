/*
 * App URI: 0-basic/3-ContextMenu
 * Source Location: 0-basic/3-ContextMenu.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("0-basic/3-ContextMenu", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * ContextMenu.js
			 * Created at 2018. 10. 8. 오전 10:25:57.
			 *
			 * @author ryu
			 ************************************************/
			
			
			
			/*
			 * 그리드에서 contextmenu 이벤트 발생 시 호출.
			 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
			 */
			function onGrd1Contextmenu(e){
				var grd1 = e.control;
				
				// 다음 기본 동작을 방지합니다.
				e.preventDefault();
			
				// 앱이 실제 그려진 사이즈를 반환합니다. 화면에 그려지지 않은 상태인 경우는 모든 값이 0인 객체가 반환됩니다.
				var appRect = app.getActualRect();
			
				// 메뉴 컨트롤 동적 생성
				var menu = new cpr.controls.Menu("ctxmenu");
				
				menu.addItem(new cpr.controls.MenuItem("추가", "value1", "root"));
				menu.addItem(new cpr.controls.MenuItem("수정", "value2", "root"));
				menu.addItem(new cpr.controls.MenuItem("삭제", "value3", "root"));
				
				// blur이벤트 핸들러 입니다.
				menu.addEventListener("blur", function() {
					// 컨트롤에 포함되어 있는 객체들을 제거합니다.
					menu.dispose();
				});
			
				menu.addEventListener("selection-change", function(/* cpr.events.CSelectionEvent */e) {
					// 컨트롤에 포함되어 있는 객체들을 제거합니다.
					menu.dispose();
					
					// 새롭게 선택된 아이템
					var newSelect = e.newSelection[0];
					var grd = app.lookup("grd1");
					var grdSelectionRow = grd.getSelectedRowIndices()[0];
					
					// "추가" 아이템 선택 시
					if (newSelect.label == "추가") {
						// 그리드에 신규 Row를 추가합니다.
						grd.insertRow(grdSelectionRow, true);
					}
					// "수정" 아이템 선택 시
					else if (newSelect.label == "수정") {
						// 전달된 행을 편집모드로 전환합니다.
						grd.setEditRowIndex(grdSelectionRow, true);
					}
					// "삭제" 아이템 선택 시
					else if (newSelect.label == "삭제") {
						// 그리드의 선택된 Row를 삭제합니다.
						grd.deleteRow(grdSelectionRow);
					}
				});
			
				menu.style.css({
					position : "absolute",
					top : "" + (e.clientY - appRect.top) + "px",
					left : "" + (e.clientX - appRect.left) + "px",
					width : "150px"
				});
				// 앱 내부 특정 위치에 컨트롤을 위치시킵니다.
				app.floatControl(menu);
				
				// gridctxmenu에 포커스 설정합니다
				menu.focus();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31", "column4": "column41", "column5": "column51"},
					{"column1": "column12", "column2": "column22", "column3": "column32", "column4": "column42", "column5": "column52"},
					{"column1": "column13", "column2": "column23", "column3": "column33", "column4": "column43", "column5": "column53"},
					{"column1": "column14", "column2": "column24", "column3": "column34", "column4": "column44", "column5": "column54"},
					{"column1": "column15", "column2": "column25", "column3": "column35", "column4": "column45", "column5": "column55"},
					{"column1": "column16", "column2": "column26", "column3": "column36", "column4": "column46", "column5": "column56"},
					{"column1": "column17", "column2": "column27", "column3": "column37", "column4": "column47", "column5": "column57"},
					{"column1": "column18", "column2": "column28", "column3": "column38", "column4": "column48", "column5": "column58"},
					{"column1": "column19", "column2": "column29", "column3": "column39", "column4": "column49", "column5": "column59"},
					{"column1": "column110", "column2": "column210", "column3": "column310", "column4": "column410", "column5": "column510"},
					{"column1": "column111", "column2": "column211", "column3": "column311", "column4": "column411", "column5": "column511"},
					{"column1": "column112", "column2": "column212", "column3": "column312", "column4": "column412", "column5": "column512"}
				]
			});
			app.register(dataSet_1);
			
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
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.readOnly = false;
			grid_1.init({
				"dataSet": app.lookup("ds1"),
				"columnMovable": true,
				"columnResizable": true,
				"autoFit": "2, 3, 4, 5, 6",
				"columns": [
					{"width": "25px"},
					{"width": "50px"},
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
								cell.targetColumnName = "column1";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column1";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.targetColumnName = "column2";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column2";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.targetColumnName = "column3";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column3";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.targetColumnName = "column4";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column4";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.targetColumnName = "column5";
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "column5";
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
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "column1";
								cell.control = (function(){
									var inputBox_1 = new cpr.controls.InputBox("ipb1");
									inputBox_1.bind("value").toDataColumn("column1");
									return inputBox_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "column2";
								cell.control = (function(){
									var inputBox_2 = new cpr.controls.InputBox("ipb2");
									inputBox_2.bind("value").toDataColumn("column2");
									return inputBox_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "column3";
								cell.control = (function(){
									var inputBox_3 = new cpr.controls.InputBox("ipb3");
									inputBox_3.bind("value").toDataColumn("column3");
									return inputBox_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "column4";
								cell.control = (function(){
									var inputBox_4 = new cpr.controls.InputBox("ipb4");
									inputBox_4.bind("value").toDataColumn("column4");
									return inputBox_4;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "column5";
								cell.control = (function(){
									var inputBox_5 = new cpr.controls.InputBox("ipb5");
									inputBox_5.bind("value").toDataColumn("column5");
									return inputBox_5;
								})();
							}
						}
					]
				}
			});
			if(typeof onGrd1Contextmenu == "function") {
				grid_1.addEventListener("contextmenu", onGrd1Contextmenu);
			}
			container.addChild(grid_1, {
				"top": "20px",
				"right": "20px",
				"bottom": "20px",
				"left": "20px"
			});
		}
	});
	app.title = "3-ContextMenu";
	cpr.core.Platform.INSTANCE.register(app);
})();