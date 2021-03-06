/*
 * App URI: example/grid/grid_setBindContext
 * Source Location: example/grid/grid_setBindContext.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/grid/grid_setBindContext", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * 그룹에서 before-context-value-change 이벤트 발생 시 호출.
			 * 바인드컨텍스트를 가지고 있는 컨트롤에서 바인드컨텍스트를 이용해 값이 변경되기 전에 발생하는 이벤트.
			 */
			function onGroupBeforeContextValueChange(/* cpr.events.CValueChangeEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var group = e.control;
				var txa = app.lookup("txa1");
				
				// 바인드컨텍스트 그리드
				var grd = e.context.grid;
				var selectRow = grd.getSelectedRowIndices()[0];
				
				// 바인드컨텍스트를 통해 변경하려고 하는 컬럼명
				var columnName = e.columnName;
				
				if(txa.value != null){
					txa.value += selectRow+ "번째 줄\n"+"변경 전 "+columnName+": "+grd.getCellValue(selectRow, columnName);
				}else{
					txa.value = selectRow+ "번째 줄\n"+"변경 전 "+columnName+": "+grd.getCellValue(selectRow, columnName);
				}
			}
			
			/*
			 * 그룹에서 context-value-change 이벤트 발생 시 호출.
			 * 바인드컨텍스트를 가지고 있는 컨트롤에서 바인드컨텍스트를 이용해 값이 변경된 후에 발생하는 이벤트.
			 */
			function onGroupContextValueChange(/* cpr.events.CValueChangeEvent */ e){
				/** 
				 * @type cpr.controls.Container
				 */
				var group = e.control;
				var txa = app.lookup("txa1");
				
				// 바인드컨텍스트 그리드
				var grd = e.context.grid;
				var selectRow = grd.getSelectedRowIndices()[0];
				
				// 바인드컨텍스트를 통해 변경하려고 하는 컬럼명
				var columnName = e.columnName;
				
				txa.value += "\n"+"변경 후 "+columnName+": "+grd.getCellValue(selectRow, columnName)+"\n\n";
			}
			
			/*
			 * "clear" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				var txa = app.lookup("txa1");
				var grd = app.lookup("grd1");
			
				txa.value = "";
				
				// 그리드 내에서 변경된 모든 데이터를 복구합니다.
				grd.revertData();
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("ds_list");
			dataSet_1.parseData({
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"}
				],
				"rows": [
					{"column1": "column11", "column2": "column21", "column3": "column31", "column4": "column41", "column5": "column51", "column6": "column61"},
					{"column1": "column12", "column2": "column22", "column3": "column32", "column4": "column42", "column5": "column52", "column6": "column62"},
					{"column1": "column13", "column2": "column23", "column3": "column33", "column4": "column43", "column5": "column53", "column6": "column63"},
					{"column1": "column14", "column2": "column24", "column3": "column34", "column4": "column44", "column5": "column54", "column6": "column64"},
					{"column1": "column15", "column2": "column25", "column3": "column35", "column4": "column45", "column5": "column55", "column6": "column65"},
					{"column1": "column16", "column2": "column26", "column3": "column36", "column4": "column46", "column5": "column56", "column6": "column66"},
					{"column1": "column17", "column2": "column27", "column3": "column37", "column4": "column47", "column5": "column57", "column6": "column67"},
					{"column1": "column18", "column2": "column28", "column3": "column38", "column4": "column48", "column5": "column58", "column6": "column68"},
					{"column1": "column19", "column2": "column29", "column3": "column39", "column4": "column49", "column5": "column59", "column6": "column69"},
					{"column1": "column110", "column2": "column210", "column3": "column310", "column4": "column410", "column5": "column510", "column6": "column610"},
					{"column1": "column111", "column2": "column211", "column3": "column311", "column4": "column411", "column5": "column511", "column6": "column611"},
					{"column1": "column112", "column2": "column212", "column3": "column312", "column4": "column412", "column5": "column512", "column6": "column612"},
					{"column1": "column113", "column2": "column213", "column3": "column313", "column4": "column413", "column5": "column513", "column6": "column613"},
					{"column1": "column114", "column2": "column214", "column3": "column314", "column4": "column414", "column5": "column514", "column6": "column614"},
					{"column1": "column115", "column2": "column215", "column3": "column315", "column4": "column415", "column5": "column515", "column6": "column615"},
					{"column1": "column116", "column2": "column216", "column3": "column316", "column4": "column416", "column5": "column516", "column6": "column616"},
					{"column1": "column117", "column2": "column217", "column3": "column317", "column4": "column417", "column5": "column517", "column6": "column617"},
					{"column1": "column118", "column2": "column218", "column3": "column318", "column4": "column418", "column5": "column518", "column6": "column618"},
					{"column1": "column119", "column2": "column219", "column3": "column319", "column4": "column419", "column5": "column519", "column6": "column619"},
					{"column1": "column120", "column2": "column220", "column3": "column320", "column4": "column420", "column5": "column520", "column6": "column620"},
					{"column1": "column121", "column2": "column221", "column3": "column321", "column4": "column421", "column5": "column521", "column6": "column621"},
					{"column1": "column122", "column2": "column222", "column3": "column322", "column4": "column422", "column5": "column522", "column6": "column622"},
					{"column1": "column123", "column2": "column223", "column3": "column323", "column4": "column423", "column5": "column523", "column6": "column623"},
					{"column1": "column124", "column2": "column224", "column3": "column324", "column4": "column424", "column5": "column524", "column6": "column624"},
					{"column1": "column125", "column2": "column225", "column3": "column325", "column4": "column425", "column5": "column525", "column6": "column625"},
					{"column1": "column126", "column2": "column226", "column3": "column326", "column4": "column426", "column5": "column526", "column6": "column626"},
					{"column1": "column127", "column2": "column227", "column3": "column327", "column4": "column427", "column5": "column527", "column6": "column627"},
					{"column1": "column128", "column2": "column228", "column3": "column328", "column4": "column428", "column5": "column528", "column6": "column628"},
					{"column1": "column129", "column2": "column229", "column3": "column329", "column4": "column429", "column5": "column529", "column6": "column629"},
					{"column1": "column130", "column2": "column230", "column3": "column330", "column4": "column430", "column5": "column530", "column6": "column630"},
					{"column1": "column131", "column2": "column231", "column3": "column331", "column4": "column431", "column5": "column531", "column6": "column631"},
					{"column1": "column132", "column2": "column232", "column3": "column332", "column4": "column432", "column5": "column532", "column6": "column632"},
					{"column1": "column133", "column2": "column233", "column3": "column333", "column4": "column433", "column5": "column533", "column6": "column633"},
					{"column1": "column134", "column2": "column234", "column3": "column334", "column4": "column434", "column5": "column534", "column6": "column634"},
					{"column1": "column135", "column2": "column235", "column3": "column335", "column4": "column435", "column5": "column535", "column6": "column635"},
					{"column1": "column136", "column2": "column236", "column3": "column336", "column4": "column436", "column5": "column536", "column6": "column636"},
					{"column1": "column137", "column2": "column237", "column3": "column337", "column4": "column437", "column5": "column537", "column6": "column637"},
					{"column1": "column138", "column2": "column238", "column3": "column338", "column4": "column438", "column5": "column538", "column6": "column638"},
					{"column1": "column139", "column2": "column239", "column3": "column339", "column4": "column439", "column5": "column539", "column6": "column639"},
					{"column1": "column140", "column2": "column240", "column3": "column340", "column4": "column440", "column5": "column540", "column6": "column640"},
					{"column1": "column141", "column2": "column241", "column3": "column341", "column4": "column441", "column5": "column541", "column6": "column641"},
					{"column1": "column142", "column2": "column242", "column3": "column342", "column4": "column442", "column5": "column542", "column6": "column642"},
					{"column1": "column143", "column2": "column243", "column3": "column343", "column4": "column443", "column5": "column543", "column6": "column643"},
					{"column1": "column144", "column2": "column244", "column3": "column344", "column4": "column444", "column5": "column544", "column6": "column644"},
					{"column1": "column145", "column2": "column245", "column3": "column345", "column4": "column445", "column5": "column545", "column6": "column645"},
					{"column1": "column146", "column2": "column246", "column3": "column346", "column4": "column446", "column5": "column546", "column6": "column646"},
					{"column1": "column147", "column2": "column247", "column3": "column347", "column4": "column447", "column5": "column547", "column6": "column647"},
					{"column1": "column148", "column2": "column248", "column3": "column348", "column4": "column448", "column5": "column548", "column6": "column648"},
					{"column1": "column149", "column2": "column249", "column3": "column349", "column4": "column449", "column5": "column549", "column6": "column649"},
					{"column1": "column150", "column2": "column250", "column3": "column350", "column4": "column450", "column5": "column550", "column6": "column650"},
					{"column1": "column151", "column2": "column251", "column3": "column351", "column4": "column451", "column5": "column551", "column6": "column651"},
					{"column1": "column152", "column2": "column252", "column3": "column352", "column4": "column452", "column5": "column552", "column6": "column652"},
					{"column1": "column153", "column2": "column253", "column3": "column353", "column4": "column453", "column5": "column553", "column6": "column653"},
					{"column1": "column154", "column2": "column254", "column3": "column354", "column4": "column454", "column5": "column554", "column6": "column654"}
				]
			});
			app.register(dataSet_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 800px) and (max-width: 1023px)", "new-screen");
			app.supportMedia("all and (min-width: 500px) and (max-width: 799px)", "tablet");
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
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var grid_1 = linker.grid_1 = new cpr.controls.Grid("grd1");
				grid_1.init({
					"dataSet": app.lookup("ds_list"),
					"columns": [
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
									cell.text = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column6";
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
									cell.columnName = "column1";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column6";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var group_2 = new cpr.controls.Container("");
				group_2.style.setClasses(["grp-freeform"]);
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["150px", "1fr", "70px"]);
				formLayout_2.setRows(["1fr", "25px", "2fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var group_3 = linker.group_3 = new cpr.controls.Container();
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.horizontalSeparatorClass = "frm-hseparator";
					formLayout_3.horizontalSeparatorWidth = 1;
					formLayout_3.verticalSeparatorClass = "frm-vseparator";
					formLayout_3.verticalSeparatorWidth = 1;
					formLayout_3.setColumns(["70px", "1fr", "70px", "1fr"]);
					formLayout_3.setRows(["25px", "25px", "25px", "1fr"]);
					group_3.setLayout(formLayout_3);
					(function(container){
						var output_1 = new cpr.controls.Output();
						output_1.value = "column1";
						output_1.style.setClasses(["ctl-header"]);
						container.addChild(output_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var output_2 = new cpr.controls.Output();
						output_2.value = "column3";
						output_2.style.setClasses(["ctl-header"]);
						container.addChild(output_2, {
							"colIndex": 0,
							"rowIndex": 1
						});
						var output_3 = new cpr.controls.Output();
						output_3.value = "column5";
						output_3.style.setClasses(["ctl-header"]);
						container.addChild(output_3, {
							"colIndex": 0,
							"rowIndex": 2
						});
						var output_4 = new cpr.controls.Output();
						output_4.value = "column2";
						output_4.style.setClasses(["ctl-header"]);
						container.addChild(output_4, {
							"colIndex": 2,
							"rowIndex": 0
						});
						var output_5 = new cpr.controls.Output();
						output_5.value = "column4";
						output_5.style.setClasses(["ctl-header"]);
						container.addChild(output_5, {
							"colIndex": 2,
							"rowIndex": 1
						});
						var output_6 = new cpr.controls.Output();
						output_6.value = "column6";
						output_6.style.setClasses(["ctl-header"]);
						container.addChild(output_6, {
							"colIndex": 2,
							"rowIndex": 2
						});
						var inputBox_1 = new cpr.controls.InputBox("ipb1");
						inputBox_1.bind("value").toDataColumn("column1");
						container.addChild(inputBox_1, {
							"colIndex": 1,
							"rowIndex": 0
						});
						var inputBox_2 = new cpr.controls.InputBox("ipb2");
						inputBox_2.bind("value").toDataColumn("column3");
						container.addChild(inputBox_2, {
							"colIndex": 1,
							"rowIndex": 1
						});
						var inputBox_3 = new cpr.controls.InputBox("ipb3");
						inputBox_3.bind("value").toDataColumn("column5");
						container.addChild(inputBox_3, {
							"colIndex": 1,
							"rowIndex": 2
						});
						var inputBox_4 = new cpr.controls.InputBox("ipb4");
						inputBox_4.bind("value").toDataColumn("column2");
						container.addChild(inputBox_4, {
							"colIndex": 3,
							"rowIndex": 0
						});
						var inputBox_5 = new cpr.controls.InputBox("ipb5");
						inputBox_5.bind("value").toDataColumn("column4");
						container.addChild(inputBox_5, {
							"colIndex": 3,
							"rowIndex": 1
						});
						var inputBox_6 = new cpr.controls.InputBox("ipb6");
						inputBox_6.bind("value").toDataColumn("column6");
						container.addChild(inputBox_6, {
							"colIndex": 3,
							"rowIndex": 2
						});
						var group_4 = new cpr.controls.Container();
						// Layout
						var xYLayout_2 = new cpr.controls.layouts.XYLayout();
						group_4.setLayout(xYLayout_2);
						(function(container){
						})(group_4);
						container.addChild(group_4, {
							"colIndex": 0,
							"rowIndex": 3,
							"colSpan": 4,
							"rowSpan": 1
						});
					})(group_3);
					if(typeof onGroupBeforeContextValueChange == "function") {
						group_3.addEventListener("before-context-value-change", onGroupBeforeContextValueChange);
					}
					if(typeof onGroupContextValueChange == "function") {
						group_3.addEventListener("context-value-change", onGroupContextValueChange);
					}
					container.addChild(group_3, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 3,
						"rowSpan": 1
					});
					var textArea_1 = new cpr.controls.TextArea("txa1");
					textArea_1.style.css({
						"font-size" : "15px"
					});
					container.addChild(textArea_1, {
						"colIndex": 0,
						"rowIndex": 2,
						"colSpan": 3,
						"rowSpan": 1
					});
					var output_7 = new cpr.controls.Output();
					output_7.value = "이벤트 로그";
					output_7.style.css({
						"font-size" : "15px",
						"text-align" : "left"
					});
					container.addChild(output_7, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var button_1 = new cpr.controls.Button();
					button_1.value = "clear";
					if(typeof onButtonClick == "function") {
						button_1.addEventListener("click", onButtonClick);
					}
					container.addChild(button_1, {
						"colIndex": 2,
						"rowIndex": 1
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 1,
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
			// Linking
			linker.group_3.setBindContext(new cpr.bind.GridSelectionContext(linker.grid_1));
		}
	});
	app.title = "grid_setBindContext";
	cpr.core.Platform.INSTANCE.register(app);
})();
