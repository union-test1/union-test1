/*
 * App URI: 5-Grid/Massive-Grid
 * Source Location: 5-Grid/Massive-Grid.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("5-Grid/Massive-Grid", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			function startFetch(/* cpr.events.CMouseEvent */e) {
				/** @type cpr.controls.Button */
				var btn = e.targetControl;
				
				app.lookup("header").enabled = false;
				
				(function(){
					var prg = app.lookup("prg");
					prg.visible = true;
					prg.value = 0;
					var smsId = btn.userAttr("submission");
					var noti = app.lookup("noti");
					noti.info("Start fetching :" + smsId);
					
					var sms = app.lookup(smsId);
					var start = new Date();
					 
					sms.addEventListenerOnce("submit-done", function(){
						var noti = app.lookup("noti");
						var elapse = (new Date()) - start;
						noti.info("Fetching " + smsId + " is Done: " + elapse.toLocaleString() + "ms elapsed.");
					});
					sms.send();		  
				})();
			}
			
			function reset(/* cpr.events.CMouseEvent */e) {
				app.lookup("ds").clear();
			
				app.lookup("grd1").redraw();
				updateTotalCount();
			}
			
			function updateTotalCount() {
				var ds = app.lookup("ds");
				app.lookup("totalLabel").value = ds.getRowCount().toLocaleString() + " rows";
			}
			
			function onSms1SubmitProgress(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms1 = e.control;
				updateTotalCount();
				var pg = app.lookup("prg");
				
				var total = e.nativeEvent.total;
				var loaded = e.nativeEvent.loaded;
				pg.max = total;
				pg.value = String(loaded);
				
				app.lookup("grd1").redraw();
			}
			
			function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms1 = e.control;
				updateTotalCount();
				app.lookup("grd1").redraw();
				app.lookup("prg").visible = false;
				app.lookup("header").enabled = true;
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds");
			dataSet_1.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"}
				]
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("sms1");
			submission_1.action = "5-Grid/sample-50k.csv";
			submission_1.addResponseData(dataSet_1, true);
			if(typeof onSms1SubmitProgress == "function") {
				submission_1.addEventListener("submit-progress", onSms1SubmitProgress);
			}
			if(typeof onSms1SubmitDone == "function") {
				submission_1.addEventListener("submit-done", onSms1SubmitDone);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("sms2");
			submission_2.action = "5-Grid/sample-100k.csv";
			submission_2.addResponseData(dataSet_1, true);
			if(typeof onSms1SubmitProgress == "function") {
				submission_2.addEventListener("submit-progress", onSms1SubmitProgress);
			}
			if(typeof onSms1SubmitDone == "function") {
				submission_2.addEventListener("submit-done", onSms1SubmitDone);
			}
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("sms3");
			submission_3.action = "5-Grid/sample-500k.csv";
			submission_3.addResponseData(dataSet_1, true);
			if(typeof onSms1SubmitProgress == "function") {
				submission_3.addEventListener("submit-progress", onSms1SubmitProgress);
			}
			if(typeof onSms1SubmitDone == "function") {
				submission_3.addEventListener("submit-done", onSms1SubmitDone);
			}
			app.register(submission_3);
			
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
			grid_1.readOnly = true;
			grid_1.init({
				"dataSet": app.lookup("ds"),
				"bufferedScroll": true,
				"noDataMessage": "No Data",
				"columns": [
					{"width": "67px"},
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
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.text = "#";
								cell.style.css({
									"padding" : "0px 10px 0px 0px",
									"text-align" : "right"
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
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "column5";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "column6";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnType = "rowindex";
								cell.style.css({
									"padding" : "0px 10px 0px 0px",
									"text-align" : "right"
								});
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "45px",
				"right": "20px",
				"bottom": "20px",
				"left": "20px"
			});
			
			var notifier_1 = new cpr.controls.Notifier("noti");
			container.addChild(notifier_1, {
				"width": "348px",
				"height": "20px",
				"left": "calc(50% - 174px)",
				"top": "calc(50% - 10px)"
			});
			
			var group_1 = new cpr.controls.Container("header");
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["1fr", "1fr", "1fr", "1fr", "1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output("totalLabel");
				output_1.value = "0 rows";
				output_1.style.css({
					"text-align" : "right"
				});
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "Reset";
				if(typeof reset == "function") {
					button_1.addEventListener("click", reset);
				}
				container.addChild(button_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "+ 50K";
				button_2.userAttr({"submission": "sms1"});
				if(typeof startFetch == "function") {
					button_2.addEventListener("click", startFetch);
				}
				container.addChild(button_2, {
					"colIndex": 2,
					"rowIndex": 0
				});
				var button_3 = new cpr.controls.Button();
				button_3.value = "+ 100K";
				button_3.userAttr({"submission": "sms2"});
				if(typeof startFetch == "function") {
					button_3.addEventListener("click", startFetch);
				}
				container.addChild(button_3, {
					"colIndex": 3,
					"rowIndex": 0
				});
				var button_4 = new cpr.controls.Button();
				button_4.value = "+ 500K";
				button_4.userAttr({"submission": "sms3"});
				if(typeof startFetch == "function") {
					button_4.addEventListener("click", startFetch);
				}
				container.addChild(button_4, {
					"colIndex": 4,
					"rowIndex": 0
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "15px",
				"right": "20px",
				"width": "550px",
				"height": "20px"
			});
			
			var progress_1 = new cpr.controls.Progress("prg");
			progress_1.visible = false;
			progress_1.value = "50";
			container.addChild(progress_1, {
				"top": "15px",
				"right": "580px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "Massive-Grid";
	cpr.core.Platform.INSTANCE.register(app);
})();
