/*
 * App URI: example/grid/excelImport
 * Source Location: example/grid/excelImport.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/grid/excelImport", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/*
			 * "Import" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				// UDC 동적 생성
				var fileupload = new udc.fileupload("fileuploader");
				var showConstraint = {
					"position" : "absolute",
					"top" : "0",
					"bottom" : "0",
					"left" : "0",
					"right" : "0"
				};
				
				// UDC 출판된 이벤트 : "filesend"
				fileupload.addEventListener("filesend", function(/* cpr.events.CEvent */e) {
					// UDC 함수 호출
					var files = fileupload.getFiles();
					
					// fileupload 컨트롤을 제거합니다.
					app.getContainer().removeChild(fileupload);
			
					var submission = app.lookup("sms1");
					// 파라미터에 파일을 설정합니다.
					submission.setFileParameters("ds1", files);
					
					//데이터를 전송합니다. 이미 동일한 서브미션으로 전송 중인 경우 실행되지 않습니다.
					submission.send();
				});
				
				// fileupload 컨트롤을 container에 추가합니다.
				app.getContainer().addChild(fileupload, showConstraint);
			}
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
			 */
			function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
				/**
				 * @type cpr.protocols.Submission
				 */
				var sms1 = e.control;
				// 그리드 컨트롤을 다시 그립니다.
				app.lookup("grd1").redraw();
			};
			// End - User Script
			
			// Header
			app.declareAppProperty("title", null);
			app.declareAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns" : [
					{"name": "USR_ID"},
					{"name": "EMP_ID"},
					{"name": "USR_NM"},
					{"name": "USR_DVS"},
					{"name": "USR_MAIL"},
					{"name": "USR_YN"},
					{"name": "PWD"},
					{"name": "WRT_PSN"},
					{"name": "WRT_TIME"},
					{"name": "WRT_IP"},
					{"name": "WRT_MENU_KEY"},
					{"name": "UPD_PSN_ID"},
					{"name": "UPD_TIME"},
					{"name": "UPD_IP"},
					{"name": "UPD_MENU_KEY"}
				]
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("sms1");
			submission_1.action = "../import/excel.do";
			submission_1.mediaType = "multipart/form-data";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSms1SubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSms1SubmitSuccess);
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
			var button_1 = new cpr.controls.Button();
			button_1.value = "Import";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "70px",
				"right": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("ds1"),
				"columns": [
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
					{"width": "100px"},
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
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.text = "USR_ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.text = "EMP_ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.text = "USR_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.text = "USR_DVS";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.text = "USR_MAIL";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.text = "USR_YN";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.text = "PWD";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.text = "WRT_PSN";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.text = "WRT_TIME";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.text = "WRT_IP";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.text = "WRT_MENU_KEY";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.text = "UPD_PSN_ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.text = "UPD_TIME";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.text = "UPD_IP";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 14},
							"configurator": function(cell){
								cell.text = "UPD_MENU_KEY";
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
								cell.columnName = "USR_ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "EMP_ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "USR_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "USR_DVS";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "USR_MAIL";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "USR_YN";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "PWD";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "WRT_PSN";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "WRT_TIME";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.columnName = "WRT_IP";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.columnName = "WRT_MENU_KEY";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.columnName = "UPD_PSN_ID";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 12},
							"configurator": function(cell){
								cell.columnName = "UPD_TIME";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 13},
							"configurator": function(cell){
								cell.columnName = "UPD_IP";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 14},
							"configurator": function(cell){
								cell.columnName = "UPD_MENU_KEY";
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "100px",
				"right": "20px",
				"bottom": "20px",
				"left": "20px"
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
	app.title = "excelImport";
	cpr.core.Platform.INSTANCE.register(app);
})();