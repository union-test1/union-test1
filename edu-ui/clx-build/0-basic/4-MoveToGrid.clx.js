/*
 * App URI: 0-basic/4-MoveToGrid
 * Source Location: 0-basic/4-MoveToGrid.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("0-basic/4-MoveToGrid", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * MoveToGrid.js
			 * Created at 2018. 10. 8. 오전 10:49:45.
			 *
			 * @author ryu
			 ************************************************/
			
			/**
			 * 선택된 Row를 이동시킨다.
			 * @param fromGridId
			 * @param toGridId
			 */
			function moveGridData(fromGridId, toGridId){
				/** @type cpr.controls.Grid */
				var fromGrid = app.lookup(fromGridId);
				
				/** @type cpr.controls.Grid */
				var toGrid = app.lookup(toGridId);
				
				var indices = fromGrid.getSelectedRowIndices();
				if(!indices || indices.length == 0){
					return;
				}
				
				var rows = fromGrid.getSelectedRows();
				
				rows.forEach(function(/* cpr.controls.provider.GridRow */ row){
					var insertRow = toGrid.insertRowData(toGrid.rowCount, true, row.getRowData());
				});
				
				fromGrid.deleteRow(indices);
				
				fromGrid.clearSelection();
				toGrid.clearSelection();
			}
			
			/**
			 * Grid의 모든 Row를 이동시킨다.
			 * @param fromGridId
			 * @param toGridId
			 */
			function moveAllGridData(fromGridId, toGridId){
				/** @type cpr.controls.Grid */
				var fromGrid = app.lookup(fromGridId);
				
				/** @type cpr.controls.Grid */
				var toGrid = app.lookup(toGridId);
				
				if(fromGrid.rowCount == 0){
					return;
				}
				
				var indices = [];
				for(var rowIndex = 0 ; rowIndex < fromGrid.rowCount ; rowIndex++){
					var insertRow = toGrid.insertRowData(toGrid.rowCount, true, fromGrid.getRow(rowIndex).getRowData());
					indices.push(rowIndex);
				}
				
				fromGrid.deleteRow(indices);
			}
			
			/*
			 * ">" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				moveGridData("grd1", "grd2");
			}
			
			
			/*
			 * "<" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
				moveGridData("grd2", "grd1");
			}
			
			
			/*
			 * ">>" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick3(e){
				var button = e.control;
				moveAllGridData("grd1", "grd2");
			}
			
			
			/*
			 * "<<" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick4(e){
				var button = e.control;
				moveAllGridData("grd2", "grd1");
			}
			
			
			/*
			 * "적용" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick5(e){
				var button = e.control;
				// 이동이 이루어진 데이터셋 상태를 기억한다.
				app.lookup("ds1").commit();
				app.lookup("ds2").commit();
				
				// 그리드에 변경사항이 표시되도록 다시 그려준다.
				app.lookup("grd1").redraw();
				app.lookup("grd2").redraw();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "div"},
					{"name": "name"}
				],
				"rows": [
					{"div": "1", "name": "이름"},
					{"div": "2", "name": "사용번호"},
					{"div": "3", "name": "부서"},
					{"div": "4", "name": "학위"},
					{"div": "5", "name": "사진"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds2");
			dataSet_2.parseData({
				"columns" : [
					{"name": "div"},
					{"name": "name"}
				]
			});
			app.register(dataSet_2);
			
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
			formLayout_1.setColumns(["1fr", "25px", "1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grd1");
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("ds1"),
					"columnMovable": false,
					"columnResizable": true,
					"selectionMulti": "multi",
					"showDeletedRow": false,
					"columns": [
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.targetColumnName = "div";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "구분";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.targetColumnName = "name";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이름";
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
									cell.columnName = "div";
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("ipb1");
										inputBox_1.bind("value").toDataColumn("div");
										return inputBox_1;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "name";
									cell.control = (function(){
										var inputBox_2 = new cpr.controls.InputBox("ipb2");
										inputBox_2.bind("value").toDataColumn("name");
										return inputBox_2;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var grid_2 = new cpr.controls.Grid("grd2");
				grid_2.readOnly = true;
				grid_2.init({
					"dataSet": app.lookup("ds2"),
					"columnMovable": false,
					"columnResizable": true,
					"selectionMulti": "multi",
					"showDeletedRow": false,
					"columns": [
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.targetColumnName = "div";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "구분";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.targetColumnName = "name";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "이름";
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
									cell.columnName = "div";
									cell.control = (function(){
										var inputBox_3 = new cpr.controls.InputBox("ipb3");
										inputBox_3.bind("value").toDataColumn("div");
										return inputBox_3;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "name";
									cell.control = (function(){
										var inputBox_4 = new cpr.controls.InputBox("ipb4");
										inputBox_4.bind("value").toDataColumn("name");
										return inputBox_4;
									})();
								}
							}
						]
					}
				});
				container.addChild(grid_2, {
					"colIndex": 2,
					"rowIndex": 0
				});
				var group_2 = new cpr.controls.Container();
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr"]);
				formLayout_2.setRows(["1fr", "25px", "25px", "25px", "25px", "1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var button_1 = new cpr.controls.Button();
					button_1.value = ">";
					if(typeof onButtonClick == "function") {
						button_1.addEventListener("click", onButtonClick);
					}
					container.addChild(button_1, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var button_2 = new cpr.controls.Button();
					button_2.value = ">>";
					if(typeof onButtonClick3 == "function") {
						button_2.addEventListener("click", onButtonClick3);
					}
					container.addChild(button_2, {
						"colIndex": 0,
						"rowIndex": 2
					});
					var button_3 = new cpr.controls.Button();
					button_3.value = "<";
					if(typeof onButtonClick2 == "function") {
						button_3.addEventListener("click", onButtonClick2);
					}
					container.addChild(button_3, {
						"colIndex": 0,
						"rowIndex": 3
					});
					var button_4 = new cpr.controls.Button();
					button_4.value = "<<";
					if(typeof onButtonClick4 == "function") {
						button_4.addEventListener("click", onButtonClick4);
					}
					container.addChild(button_4, {
						"colIndex": 0,
						"rowIndex": 4
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"right": "20px",
				"bottom": "50px",
				"left": "20px"
			});
			
			var button_5 = new cpr.controls.Button();
			button_5.value = "적용";
			if(typeof onButtonClick5 == "function") {
				button_5.addEventListener("click", onButtonClick5);
			}
			container.addChild(button_5, {
				"right": "20px",
				"bottom": "20px",
				"width": "100px",
				"height": "25px"
			});
		}
	});
	app.title = "4-MoveToGrid";
	cpr.core.Platform.INSTANCE.register(app);
})();
