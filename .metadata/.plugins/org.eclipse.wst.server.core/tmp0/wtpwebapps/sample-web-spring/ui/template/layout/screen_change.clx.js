/*
 * App URI: template/layout/screen_change
 * Source Location: template/layout/screen_change.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("template/layout/screen_change", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * screen_change.js
			 * Created at 2018. 8. 13. 오후 3:05:08.
			 * 
			 * @author leeds
			 ************************************************/
			
			
			
			/*
			 * Body에서 screen-change 이벤트 발생 시 호출.
			 * 스크린 크기 변경 시 호출되는 이벤트.
			 */
			function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
				var group = app.lookup("group");
				/** 
				 * @type cpr.controls.layouts.FormLayout
				 */
				var layout = group.getLayout();
				
				// 컨트롤들
				var opt_Lname   = app.lookup("opt_Lname");
				var Lname 	    = app.lookup("Lname");
				var opt_birth   = app.lookup("opt_birth");
				var birth       = app.lookup("birth");
				var opt_address = app.lookup("opt_address");
				var udc_address = app.lookup("udc_address");
				var opt_note    = app.lookup("opt_note");
				var note        = app.lookup("note");
				
				if(e.screen.name != "default"){
					layout.setRows(["40px","40px","40px","40px","40px","1fr"]);
					layout.setColumns(["100px", "1fr"]);
					
					// Last Name
					group.updateConstraint(opt_Lname, {
						"colIndex": 0,
						"rowIndex": 2
					});
					group.updateConstraint(Lname, {
						"colIndex": 1,
						"rowIndex": 2
					});
					
					// Birth
					group.updateConstraint(opt_birth, {
						"colIndex": 0,
						"rowIndex": 3
					});
					group.updateConstraint(birth, {
						"colIndex": 1,
						"rowIndex": 3
					});
					
					// Address
					group.updateConstraint(opt_address, {
						"colIndex": 0,
						"rowIndex": 4
					});
					group.updateConstraint(udc_address, {
						"colIndex": 1,
						"rowIndex": 4,
						"colSpan" : 1
					});
					
					// Note
					group.updateConstraint(opt_note, {
						"colIndex": 0,
						"rowIndex": 5
					});
					group.updateConstraint(note, {
						"colIndex": 1,
						"rowIndex": 5,
						"colSpan" : 1
					});
					
					// 음영 사용여부.
					layout.setUseColumnShade(0, true);
					
				}else{
					layout.setRows(["40px","40px","40px","1fr"]);
					layout.setColumns(["100px", "1fr","100px", "1fr"]);
					
					// Last Name
					group.updateConstraint(opt_Lname, {
						"colIndex": 2,
						"rowIndex": 0
					});
					group.updateConstraint(Lname, {
						"colIndex": 3,
						"rowIndex": 0
					});
					
					// Birth
					group.updateConstraint(opt_birth, {
						"colIndex": 2,
						"rowIndex": 1
					});
					group.updateConstraint(birth, {
						"colIndex": 3,
						"rowIndex": 1
					});
					
					// Address
					group.updateConstraint(opt_address, {
						"colIndex": 0,
						"rowIndex": 2
					});
					group.updateConstraint(udc_address, {
						"colIndex": 1,
						"rowIndex": 2,
						"colSpan" : 3
					});
					
					// Note
					group.updateConstraint(opt_note, {
						"colIndex": 0,
						"rowIndex": 3
					});
					group.updateConstraint(note, {
						"colIndex": 1,
						"rowIndex": 3,
						"colSpan" : 3
					});
					
					// 음영 사용여부.
					layout.setUseColumnShade(0, true);
					layout.setUseColumnShade(2, true);
				}
				
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			var dataSet_1 = linker.dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "Seoul", "value": "Seoul"},
					{"label": "Daegu", "value": "Daegu"},
					{"label": "Busan", "value": "Busan"},
					{"label": "Daejeon", "value": "value4"}
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
			var group_1 = new cpr.controls.Container("group");
			group_1.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-bottom-color" : "lightgray",
				"border-right-width" : "1px",
				"border-left-style" : "solid",
				"border-bottom-width" : "1px",
				"border-left-color" : "lightgray",
				"border-top-color" : "lightgray",
				"border-bottom-style" : "solid",
				"border-right-color" : "lightgray",
				"border-left-width" : "1px",
				"border-top-style" : "solid"
			});
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.horizontalSpacing = "10";
			formLayout_1.horizontalSeparatorWidth = 1;
			formLayout_1.verticalSeparatorWidth = 1;
			formLayout_1.setColumns(["100px", "1fr", "100px", "1fr"]);
			formLayout_1.setUseColumnShade(0, true);
			formLayout_1.setUseColumnShade(2, true);
			formLayout_1.setRows(["40px", "40px", "40px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output("opt_name");
				output_1.value = "Name";
				output_1.style.css({
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var output_2 = new cpr.controls.Output("opt_age");
				output_2.value = "Age";
				output_2.style.css({
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var output_3 = new cpr.controls.Output("opt_address");
				output_3.value = "Address";
				output_3.style.css({
					"text-align" : "center"
				});
				container.addChild(output_3, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var output_4 = new cpr.controls.Output("opt_note");
				output_4.value = "Note";
				output_4.style.css({
					"text-align" : "center"
				});
				container.addChild(output_4, {
					"colIndex": 0,
					"rowIndex": 3,
					"verticalAlign": "top",
					"height": 40
				});
				var output_5 = new cpr.controls.Output("name");
				output_5.value = "TOMATO";
				container.addChild(output_5, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var output_6 = new cpr.controls.Output("age");
				output_6.value = "19";
				container.addChild(output_6, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var output_7 = new cpr.controls.Output("opt_Lname");
				output_7.value = "Last Name";
				output_7.style.css({
					"text-align" : "center"
				});
				container.addChild(output_7, {
					"colIndex": 2,
					"rowIndex": 0
				});
				var output_8 = new cpr.controls.Output("opt_birth");
				output_8.value = "Birth";
				output_8.style.css({
					"text-align" : "center"
				});
				container.addChild(output_8, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var output_9 = new cpr.controls.Output("Lname");
				output_9.value = "SYSTEM";
				container.addChild(output_9, {
					"colIndex": 3,
					"rowIndex": 0
				});
				var output_10 = new cpr.controls.Output("birth");
				output_10.value = "2000.10.27";
				container.addChild(output_10, {
					"colIndex": 3,
					"rowIndex": 1
				});
				var textArea_1 = new cpr.controls.TextArea("note");
				container.addChild(textArea_1, {
					"colIndex": 1,
					"rowIndex": 3,
					"colSpan": 3,
					"rowSpan": 1
				});
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.layout.screenChangeUdc("udc_address");
				userDefinedControl_1.dataSet = app.lookup("ds1");
				userDefinedControl_1.value = "Seoul";
				container.addChild(userDefinedControl_1, {
					"colIndex": 1,
					"rowIndex": 2,
					"colSpan": 3,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "70px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
			});
			
			var userDefinedControl_2 = new udc.pagetitle2();
			userDefinedControl_2.bind("explain").toAppProperty("explain");
			userDefinedControl_2.bind("title").toAppProperty("title");
			container.addChild(userDefinedControl_2, {
				"top": "10px",
				"left": "10px",
				"width": "1004px",
				"height": "50px"
			});
			if(typeof onBodyScreenChange == "function"){
				app.addEventListener("screen-change", onBodyScreenChange);
			}
		}
	});
	app.title = "screen_change";
	cpr.core.Platform.INSTANCE.register(app);
})();
