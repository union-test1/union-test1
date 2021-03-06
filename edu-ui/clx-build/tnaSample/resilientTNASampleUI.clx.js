/*
 * App URI: tnaSample/resilientTNASampleUI
 * Source Location: tnaSample/resilientTNASampleUI.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("tnaSample/resilientTNASampleUI", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * resilientTNASampleUI.js
			 * Created at 2019. 8. 14. 오후 2:57:00.
			 *
			 * @author joymrk
			 ************************************************/;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsWorkTypeList");
			dataSet_1.parseData({
				"columns": [
					{"name": "Code"},
					{"name": "Name"},
					{"name": "WorkType"}
				],
				"rows": [
					{"Code": "0001", "Name": "고정근무1", "WorkType": "일반"},
					{"Code": "0002", "Name": "유연근무1", "WorkType": "선택적유연"},
					{"Code": "0003", "Name": "유연근무2", "WorkType": "선택적유연2"},
					{"Code": "0004", "Name": "선택근무2", "WorkType": "탄력근로제"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("dsSampleScheduleList");
			dataSet_2.parseData({
				"columns": [
					{"name": "workData"},
					{"name": "weekofDay"},
					{"name": "workShift"},
					{
						"name": "workTime",
						"dataType": "string"
					}
				],
				"rows": [
					{"workData": "2018-08-14", "weekofDay": "수", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-15", "weekofDay": "목", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-16", "weekofDay": "금", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-17", "weekofDay": "토", "workShift": "02: 휴일", "workTime": "0"},
					{"workData": "2018-08-18", "weekofDay": "일", "workShift": "02: 휴일", "workTime": "0"},
					{"workData": "2018-08-19", "weekofDay": "월", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-20", "weekofDay": "화", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-21", "weekofDay": "수", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-22", "weekofDay": "목", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-23", "weekofDay": "금", "workShift": "01: 평일", "workTime": "10"},
					{"workData": "2018-08-24", "weekofDay": "토", "workShift": "02: 휴일", "workTime": "0"}
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
			formLayout_1.setColumns(["1fr", "3fr"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grd1");
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("dsWorkTypeList"),
					"hScroll": "hidden",
					"columnMovable": false,
					"columnResizable": false,
					"columns": [
						{"width": "50px"},
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.targetColumnName = "Code";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "Code";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.targetColumnName = "Name";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "Name";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.targetColumnName = "WorkType";
									cell.filterable = false;
									cell.sortable = false;
									cell.text = "WorkType";
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
									cell.columnName = "Code";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "Name";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "WorkType";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"padding-top" : "5px",
					"padding-left" : "5px",
					"padding-bottom" : "5px",
					"padding-right" : "5px"
				});
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["1fr"]);
				formLayout_2.setRows(["70px", "35px", "1fr", "30px"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var group_3 = new cpr.controls.Container();
					// Layout
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.setColumns(["1fr"]);
					formLayout_3.setRows(["1fr", "1fr"]);
					group_3.setLayout(formLayout_3);
					(function(container){
						var group_4 = new cpr.controls.Container();
						// Layout
						var formLayout_4 = new cpr.controls.layouts.FormLayout();
						formLayout_4.setColumns(["1fr", "1fr", "1fr", "1fr"]);
						formLayout_4.setRows(["1fr"]);
						group_4.setLayout(formLayout_4);
						(function(container){
							var output_1 = new cpr.controls.Output();
							output_1.value = "코 드";
							output_1.style.css({
								"background-color" : "#e8e8e8",
								"background-image" : "none"
							});
							container.addChild(output_1, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var output_2 = new cpr.controls.Output();
							output_2.value = "이 름";
							output_2.style.css({
								"background-color" : "#e8e8e8",
								"background-image" : "none"
							});
							container.addChild(output_2, {
								"colIndex": 2,
								"rowIndex": 0
							});
							var inputBox_1 = new cpr.controls.InputBox("ipb1");
							container.addChild(inputBox_1, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var inputBox_2 = new cpr.controls.InputBox("ipb2");
							container.addChild(inputBox_2, {
								"colIndex": 3,
								"rowIndex": 0
							});
						})(group_4);
						container.addChild(group_4, {
							"colIndex": 0,
							"rowIndex": 1
						});
						var output_3 = new cpr.controls.Output();
						output_3.value = "입력 정보";
						output_3.style.css({
							"background-color" : "#e8e8e8",
							"background-image" : "none"
						});
						container.addChild(output_3, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_3);
					container.addChild(group_3, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var group_5 = new cpr.controls.Container();
					// Layout
					var formLayout_5 = new cpr.controls.layouts.FormLayout();
					formLayout_5.setColumns(["1fr", "3fr"]);
					formLayout_5.setRows(["1fr"]);
					group_5.setLayout(formLayout_5);
					(function(container){
						var radioButton_1 = new cpr.controls.RadioButton("rdb1");
						radioButton_1.value = "1";
						(function(radioButton_1){
							radioButton_1.addItem(new cpr.controls.Item("2주", "1"));
							radioButton_1.addItem(new cpr.controls.Item("6개월", "2"));
						})(radioButton_1);
						container.addChild(radioButton_1, {
							"colIndex": 1,
							"rowIndex": 0
						});
						var output_4 = new cpr.controls.Output();
						output_4.value = "단위기간 선택";
						output_4.style.css({
							"background-color" : "#e8e8e8",
							"background-image" : "none"
						});
						container.addChild(output_4, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_5);
					container.addChild(group_5, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var group_6 = new cpr.controls.Container();
					// Layout
					var formLayout_6 = new cpr.controls.layouts.FormLayout();
					formLayout_6.setColumns(["1fr"]);
					formLayout_6.setRows(["100px", "15px", "70px", "1fr"]);
					group_6.setLayout(formLayout_6);
					(function(container){
						var group_7 = new cpr.controls.Container();
						// Layout
						var formLayout_7 = new cpr.controls.layouts.FormLayout();
						formLayout_7.setColumns(["1fr", "3fr"]);
						formLayout_7.setRows(["1fr", "1fr", "1fr"]);
						group_7.setLayout(formLayout_7);
						(function(container){
							var output_5 = new cpr.controls.Output();
							output_5.value = "근무 일정 셋팅";
							output_5.style.css({
								"background-color" : "#e8e8e8"
							});
							container.addChild(output_5, {
								"colIndex": 0,
								"rowIndex": 0,
								"colSpan": 2,
								"rowSpan": 1
							});
							var group_8 = new cpr.controls.Container();
							// Layout
							var formLayout_8 = new cpr.controls.layouts.FormLayout();
							formLayout_8.setColumns(["1fr", "1fr", "1fr", "1fr"]);
							formLayout_8.setRows(["1fr"]);
							group_8.setLayout(formLayout_8);
							(function(container){
								var output_6 = new cpr.controls.Output();
								output_6.value = "시작 일자";
								output_6.style.css({
									"background-color" : "#e8e8e8",
									"background-image" : "none"
								});
								container.addChild(output_6, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var dateInput_1 = new cpr.controls.DateInput("dti1");
								dateInput_1.value = "20180814";
								container.addChild(dateInput_1, {
									"colIndex": 1,
									"rowIndex": 0
								});
								var output_7 = new cpr.controls.Output();
								output_7.value = "설정 일수";
								output_7.style.css({
									"background-color" : "#e8e8e8",
									"background-image" : "none"
								});
								container.addChild(output_7, {
									"colIndex": 2,
									"rowIndex": 0
								});
								var output_8 = new cpr.controls.Output();
								output_8.value = "14 일";
								container.addChild(output_8, {
									"colIndex": 3,
									"rowIndex": 0
								});
							})(group_8);
							container.addChild(group_8, {
								"colIndex": 0,
								"rowIndex": 1,
								"colSpan": 2,
								"rowSpan": 1
							});
							var group_9 = new cpr.controls.Container();
							// Layout
							var formLayout_9 = new cpr.controls.layouts.FormLayout();
							formLayout_9.setColumns(["1fr", "3fr"]);
							formLayout_9.setRows(["1fr"]);
							group_9.setLayout(formLayout_9);
							(function(container){
								var output_9 = new cpr.controls.Output();
								output_9.value = "유효기간";
								output_9.style.css({
									"background-color" : "#e8e8e8",
									"background-image" : "none"
								});
								container.addChild(output_9, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var group_10 = new cpr.controls.Container();
								// Layout
								var formLayout_10 = new cpr.controls.layouts.FormLayout();
								formLayout_10.setColumns(["1fr", "15px", "1fr"]);
								formLayout_10.setRows(["1fr"]);
								group_10.setLayout(formLayout_10);
								(function(container){
									var output_10 = new cpr.controls.Output();
									output_10.value = "~";
									container.addChild(output_10, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var dateInput_2 = new cpr.controls.DateInput("dti4");
									dateInput_2.value = "20180814";
									container.addChild(dateInput_2, {
										"colIndex": 0,
										"rowIndex": 0,
										"horizontalAlign": "center"
									});
									var dateInput_3 = new cpr.controls.DateInput("dti5");
									dateInput_3.value = "20180828";
									container.addChild(dateInput_3, {
										"colIndex": 2,
										"rowIndex": 0,
										"horizontalAlign": "center"
									});
								})(group_10);
								container.addChild(group_10, {
									"colIndex": 1,
									"rowIndex": 0,
									"colSpan": 1,
									"rowSpan": 1
								});
							})(group_9);
							container.addChild(group_9, {
								"colIndex": 0,
								"rowIndex": 2,
								"colSpan": 2,
								"rowSpan": 1
							});
						})(group_7);
						container.addChild(group_7, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var grid_2 = new cpr.controls.Grid("grd2");
						grid_2.readOnly = true;
						grid_2.init({
							"dataSet": app.lookup("dsSampleScheduleList"),
							"columnMovable": false,
							"columnResizable": false,
							"columns": [
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
											cell.targetColumnName = "workData";
											cell.filterable = false;
											cell.sortable = false;
											cell.text = "근무일자";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.targetColumnName = "weekofDay";
											cell.filterable = false;
											cell.sortable = false;
											cell.text = "요일";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.targetColumnName = "workShift";
											cell.filterable = false;
											cell.sortable = false;
											cell.text = "근무 지정";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.targetColumnName = "workTime";
											cell.filterable = false;
											cell.sortable = false;
											cell.text = "근로시간";
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
											cell.columnName = "workData";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.columnName = "weekofDay";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.columnName = "workShift";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.columnName = "workTime";
										}
									}
								]
							}
						});
						container.addChild(grid_2, {
							"colIndex": 0,
							"rowIndex": 3
						});
						var group_11 = new cpr.controls.Container();
						// Layout
						var formLayout_11 = new cpr.controls.layouts.FormLayout();
						formLayout_11.setColumns(["1fr"]);
						formLayout_11.setRows(["1fr"]);
						group_11.setLayout(formLayout_11);
						(function(container){
							var group_12 = new cpr.controls.Container();
							// Layout
							var formLayout_12 = new cpr.controls.layouts.FormLayout();
							formLayout_12.setColumns(["70px", "100px", "15px", "70px", "100px", "1fr", "70px", "1fr", "80px"]);
							formLayout_12.setRows(["1fr", "1fr"]);
							group_12.setLayout(formLayout_12);
							(function(container){
								var output_11 = new cpr.controls.Output();
								output_11.value = "~";
								container.addChild(output_11, {
									"colIndex": 2,
									"rowIndex": 1
								});
								var dateInput_4 = new cpr.controls.DateInput("dti2");
								dateInput_4.value = "20180814";
								container.addChild(dateInput_4, {
									"colIndex": 1,
									"rowIndex": 1,
									"horizontalAlign": "fill"
								});
								var dateInput_5 = new cpr.controls.DateInput("dti3");
								dateInput_5.value = "20180828";
								container.addChild(dateInput_5, {
									"colIndex": 4,
									"rowIndex": 1,
									"horizontalAlign": "fill"
								});
								var output_12 = new cpr.controls.Output();
								output_12.value = "시작일 :";
								output_12.style.css({
									"text-align" : "center"
								});
								container.addChild(output_12, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var output_13 = new cpr.controls.Output();
								output_13.value = "종료일";
								output_13.style.css({
									"text-align" : "center"
								});
								container.addChild(output_13, {
									"colIndex": 3,
									"rowIndex": 1
								});
								var button_1 = new cpr.controls.Button();
								button_1.value = "적 용";
								container.addChild(button_1, {
									"colIndex": 8,
									"rowIndex": 1,
									"horizontalAlign": "center",
									"width": 70
								});
								var output_14 = new cpr.controls.Output();
								output_14.value = "근무 지정 일괄 설정";
								container.addChild(output_14, {
									"colIndex": 0,
									"rowIndex": 0,
									"colSpan": 9,
									"rowSpan": 1
								});
								var comboBox_1 = new cpr.controls.ComboBox("cmb1");
								comboBox_1.value = "01";
								(function(comboBox_1){
									comboBox_1.addItem(new cpr.controls.Item("01: 평일", "01"));
									comboBox_1.addItem(new cpr.controls.Item("02: 휴일", "02"));
								})(comboBox_1);
								container.addChild(comboBox_1, {
									"colIndex": 7,
									"rowIndex": 1
								});
								var output_15 = new cpr.controls.Output();
								output_15.value = "근무일 :";
								container.addChild(output_15, {
									"colIndex": 6,
									"rowIndex": 1
								});
							})(group_12);
							container.addChild(group_12, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_11);
						container.addChild(group_11, {
							"colIndex": 0,
							"rowIndex": 2
						});
					})(group_6);
					container.addChild(group_6, {
						"colIndex": 0,
						"rowIndex": 2
					});
					var group_13 = new cpr.controls.Container();
					// Layout
					var formLayout_13 = new cpr.controls.layouts.FormLayout();
					formLayout_13.setColumns(["1fr", "1fr", "1fr", "1fr", "1fr"]);
					formLayout_13.setRows(["1fr"]);
					group_13.setLayout(formLayout_13);
					(function(container){
						var button_2 = new cpr.controls.Button();
						button_2.value = "근로시간 계산";
						container.addChild(button_2, {
							"colIndex": 2,
							"rowIndex": 0
						});
						var button_3 = new cpr.controls.Button();
						button_3.value = "저장";
						container.addChild(button_3, {
							"colIndex": 3,
							"rowIndex": 0
						});
						var button_4 = new cpr.controls.Button();
						button_4.value = "종료";
						container.addChild(button_4, {
							"colIndex": 4,
							"rowIndex": 0
						});
					})(group_13);
					container.addChild(group_13, {
						"colIndex": 0,
						"rowIndex": 3
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"right": "0px",
				"bottom": "0px",
				"left": "0px"
			});
		}
	});
	app.title = "resilientTNASampleUI";
	cpr.core.Platform.INSTANCE.register(app);
})();
