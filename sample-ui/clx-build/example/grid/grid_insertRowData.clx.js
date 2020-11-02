/*
 * App URI: example/grid/grid_insertRowData
 * Source Location: example/grid/grid_insertRowData.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/grid/grid_insertRowData", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * "insertRowData" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick6(/* cpr.events.CMouseEvent */ e){
				
				var grd = app.lookup("grdMain");
				
				// 선택된 row index를 반환합니다.
				var rowIndex = grd.getSelectedRowIndex();
				
				// 그리드에 신규 Row를 추가합니다.
				var gridRow = grd.insertRowData(rowIndex, true,
						{"column1": "newValue","column2": "newValue","column3": "newValue","column4": "newValue","column5": "newValue","column6": "newValue","column7": "newValue","column8": "newValue","column9": "newValue","column10": "newValue"});
				
				// 현재 row의 index를 반환합니다.
				rowIndex = gridRow.getIndex();
				
				// rowIndex의 row를 선택합니다.
				grd.selectRows([ rowIndex ]);
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("resList");
			dataSet_1.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31", "column4": "column41", "column5": "column51", "column6": "column61", "column7": "column71", "column8": "column81", "column9": "column91", "column10": "column101"},
					{"column1": "column12", "column2": "column22", "column3": "column32", "column4": "column42", "column5": "column52", "column6": "column62", "column7": "column72", "column8": "column82", "column9": "column92", "column10": "column102"},
					{"column1": "column13", "column2": "column23", "column3": "column33", "column4": "column43", "column5": "column53", "column6": "column63", "column7": "column73", "column8": "column83", "column9": "column93", "column10": "column103"},
					{"column1": "column14", "column2": "column24", "column3": "column34", "column4": "column44", "column5": "column54", "column6": "column64", "column7": "column74", "column8": "column84", "column9": "column94", "column10": "column104"},
					{"column1": "column15", "column2": "column25", "column3": "column35", "column4": "column45", "column5": "column55", "column6": "column65", "column7": "column75", "column8": "column85", "column9": "column95", "column10": "column105"},
					{"column1": "column16", "column2": "column26", "column3": "column36", "column4": "column46", "column5": "column56", "column6": "column66", "column7": "column76", "column8": "column86", "column9": "column96", "column10": "column106"},
					{"column1": "column17", "column2": "column27", "column3": "column37", "column4": "column47", "column5": "column57", "column6": "column67", "column7": "column77", "column8": "column87", "column9": "column97", "column10": "column107"},
					{"column1": "column18", "column2": "column28", "column3": "column38", "column4": "column48", "column5": "column58", "column6": "column68", "column7": "column78", "column8": "column88", "column9": "column98", "column10": "column108"},
					{"column1": "column19", "column2": "column29", "column3": "column39", "column4": "column49", "column5": "column59", "column6": "column69", "column7": "column79", "column8": "column89", "column9": "column99", "column10": "column109"},
					{"column1": "column110", "column2": "column210", "column3": "column310", "column4": "column410", "column5": "column510", "column6": "column610", "column7": "column710", "column8": "column810", "column9": "column910", "column10": "column1010"},
					{"column1": "column111", "column2": "column211", "column3": "column311", "column4": "column411", "column5": "column511", "column6": "column611", "column7": "column711", "column8": "column811", "column9": "column911", "column10": "column1011"},
					{"column1": "column112", "column2": "column212", "column3": "column312", "column4": "column412", "column5": "column512", "column6": "column612", "column7": "column712", "column8": "column812", "column9": "column912", "column10": "column1012"},
					{"column1": "column113", "column2": "column213", "column3": "column313", "column4": "column413", "column5": "column513", "column6": "column613", "column7": "column713", "column8": "column813", "column9": "column913", "column10": "column1013"},
					{"column1": "column114", "column2": "column214", "column3": "column314", "column4": "column414", "column5": "column514", "column6": "column614", "column7": "column714", "column8": "column814", "column9": "column914", "column10": "column1014"},
					{"column1": "column115", "column2": "column215", "column3": "column315", "column4": "column415", "column5": "column515", "column6": "column615", "column7": "column715", "column8": "column815", "column9": "column915", "column10": "column1015"},
					{"column1": "column116", "column2": "column216", "column3": "column316", "column4": "column416", "column5": "column516", "column6": "column616", "column7": "column716", "column8": "column816", "column9": "column916", "column10": "column1016"},
					{"column1": "column117", "column2": "column217", "column3": "column317", "column4": "column417", "column5": "column517", "column6": "column617", "column7": "column717", "column8": "column817", "column9": "column917", "column10": "column1017"},
					{"column1": "column118", "column2": "column218", "column3": "column318", "column4": "column418", "column5": "column518", "column6": "column618", "column7": "column718", "column8": "column818", "column9": "column918", "column10": "column1018"},
					{"column1": "column119", "column2": "column219", "column3": "column319", "column4": "column419", "column5": "column519", "column6": "column619", "column7": "column719", "column8": "column819", "column9": "column919", "column10": "column1019"},
					{"column1": "column120", "column2": "column220", "column3": "column320", "column4": "column420", "column5": "column520", "column6": "column620", "column7": "column720", "column8": "column820", "column9": "column920", "column10": "column1020"},
					{"column1": "column121", "column2": "column221", "column3": "column321", "column4": "column421", "column5": "column521", "column6": "column621", "column7": "column721", "column8": "column821", "column9": "column921", "column10": "column1021"}
				]
			});
			app.register(dataSet_1);
			
			app.supportMedia("all and (min-width: 1024px)", "main");
			app.supportMedia("all and (max-width: 1023px)", "default");
			
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
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["35px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grdMain");
				grid_1.init({
					"dataSet": app.lookup("resList"),
					"columnMovable": true,
					"columnResizable": true,
					"noDataMessage": "조회된 데이터가 없습니다.",
					"columns": [
						{"width": "60px"},
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
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "column6";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "column7";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "column8";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "column9";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.text = "column10";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
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
									cell.style.setClasses(["required"]);
									cell.control = (function(){
										var inputBox_1 = new cpr.controls.InputBox("ipb14");
										inputBox_1.autoSelect = true;
										inputBox_1.userAttr({
											"required": "Y",
											"name": "컬럼1"
										});
										inputBox_1.style.bindClass().toExpression("getStateString() *= \"I\" ? \"required\" : \"\"");
										inputBox_1.bind("enabled").toExpression("getStateString() *= \"I\"");
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
										var inputBox_2 = new cpr.controls.InputBox("ipb13");
										inputBox_2.autoSelect = true;
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
										var inputBox_3 = new cpr.controls.InputBox("ipb12");
										inputBox_3.autoSelect = true;
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
										var inputBox_4 = new cpr.controls.InputBox("ipb11");
										inputBox_4.autoSelect = true;
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
										var inputBox_5 = new cpr.controls.InputBox("ipb10");
										inputBox_5.autoSelect = true;
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
										var inputBox_6 = new cpr.controls.InputBox("ipb15");
										inputBox_6.autoSelect = true;
										inputBox_6.bind("value").toDataColumn("column6");
										return inputBox_6;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "column7";
									cell.control = (function(){
										var inputBox_7 = new cpr.controls.InputBox("ipb16");
										inputBox_7.autoSelect = true;
										inputBox_7.bind("value").toDataColumn("column7");
										return inputBox_7;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "column8";
									cell.control = (function(){
										var inputBox_8 = new cpr.controls.InputBox("ipb17");
										inputBox_8.autoSelect = true;
										inputBox_8.bind("value").toDataColumn("column8");
										return inputBox_8;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "column9";
									cell.control = (function(){
										var inputBox_9 = new cpr.controls.InputBox("ipb18");
										inputBox_9.autoSelect = true;
										inputBox_9.bind("value").toDataColumn("column9");
										return inputBox_9;
									})();
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 10},
								"configurator": function(cell){
									cell.columnName = "column10";
									cell.control = (function(){
										var inputBox_10 = new cpr.controls.InputBox("ipb19");
										inputBox_10.autoSelect = true;
										inputBox_10.bind("value").toDataColumn("column10");
										return inputBox_10;
									})();
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
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var group_2 = new cpr.controls.Container();
				group_2.style.setClasses(["grp-search"]);
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr", "120px"]);
				formLayout_2.setRows(["1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var button_1 = new cpr.controls.Button();
					button_1.value = "insertRowData";
					if(typeof onButtonClick6 == "function") {
						button_1.addEventListener("click", onButtonClick6);
					}
					container.addChild(button_1, {
						"colIndex": 1,
						"rowIndex": 0,
						"horizontalAlign": "fill"
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "70px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
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
	app.title = "grid_insertRowData";
	cpr.core.Platform.INSTANCE.register(app);
})();
