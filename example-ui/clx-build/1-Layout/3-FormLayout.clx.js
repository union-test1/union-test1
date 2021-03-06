/*
 * App URI: 1-Layout/3-FormLayout
 * Source Location: 1-Layout/3-FormLayout.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("1-Layout/3-FormLayout", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/*
			 * Body에서 screen-change 이벤트 발생 시 호출.
			 * 스크린 크기 변경 시 호출되는 이벤트.
			 */
			function onBodyScreenChange( /* cpr.events.CScreenChangeEvent */ e) {
				var showDetail = e.screen.name == "default"
				/** @type cpr.controls.layouts.FormLayout */
				var layout = app.lookup("grp").getLayout();
				layout.setColumnVisible(2, showDetail);
				layout.setColumnVisible(3, showDetail);
			}
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("people");
			dataSet_1.parseData({
				"columns": [
					{"name": "company"},
					{"name": "firstName"},
					{"name": "lastName"},
					{
						"name": "age",
						"dataType": "number"
					},
					{"name": "color"}
				],
				"rows": [{"company": "Tomato System", "firstName": "Lee", "lastName": "Jeeeyul", "age": "37", "color": "orange"}]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = linker.dataSet_2 = new cpr.data.DataSet("ds1");
			dataSet_2.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "Red", "value": "red"},
					{"label": "Orange", "value": "orange"},
					{"label": "Green", "value": "green"},
					{"label": "Blue", "value": "blue"},
					{"label": "Violet", "value": "vilolet"}
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
			var group_1 = new cpr.controls.Container("grp");
			group_1.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-bottom-color" : "#cccccc",
				"border-right-width" : "1px",
				"border-left-color" : "#cccccc",
				"border-right-color" : "#cccccc",
				"border-left-width" : "1px",
				"border-top-style" : "solid",
				"border-radius" : "5px",
				"border-left-style" : "solid",
				"border-bottom-width" : "1px",
				"border-top-color" : "#cccccc",
				"border-bottom-style" : "solid"
			});
			var dataRowContext_1 = new cpr.bind.DataRowContext(app.lookup("people"), 0);
			group_1.setBindContext(dataRowContext_1);
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.topMargin = "5";
			formLayout_1.rightMargin = "5";
			formLayout_1.bottomMargin = "5";
			formLayout_1.leftMargin = "5";
			formLayout_1.horizontalSpacing = "10";
			formLayout_1.verticalSpacing = "10";
			formLayout_1.horizontalSeparatorWidth = 1;
			formLayout_1.verticalSeparatorWidth = 1;
			formLayout_1.setColumns(["100px", "1fr", "100px", "1fr"]);
			formLayout_1.setUseColumnShade(0, true);
			formLayout_1.setUseColumnShade(2, true);
			formLayout_1.setRows(["25px", "25px", "25px", "25px", "1fr", "25px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "First Name";
				output_1.style.css({
					"text-align" : "right"
				});
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "Last Name";
				output_2.style.css({
					"text-align" : "right"
				});
				container.addChild(output_2, {
					"colIndex": 2,
					"rowIndex": 0
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "Age";
				output_3.style.css({
					"text-align" : "right"
				});
				container.addChild(output_3, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "Color";
				output_4.style.css({
					"text-align" : "right"
				});
				container.addChild(output_4, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "Company";
				output_5.style.css({
					"text-align" : "right"
				});
				container.addChild(output_5, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.bind("value").toDataColumn("firstName");
				container.addChild(inputBox_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var inputBox_2 = new cpr.controls.InputBox("ipb2");
				inputBox_2.bind("value").toDataColumn("lastName");
				container.addChild(inputBox_2, {
					"colIndex": 3,
					"rowIndex": 0
				});
				var inputBox_3 = new cpr.controls.InputBox("ipb3");
				inputBox_3.bind("value").toDataColumn("color");
				container.addChild(inputBox_3, {
					"colIndex": 3,
					"rowIndex": 1
				});
				var inputBox_4 = new cpr.controls.InputBox("ipb4");
				inputBox_4.bind("value").toDataColumn("age");
				container.addChild(inputBox_4, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var inputBox_5 = new cpr.controls.InputBox("ipb5");
				inputBox_5.bind("value").toDataColumn("company");
				container.addChild(inputBox_5, {
					"colIndex": 1,
					"rowIndex": 2,
					"colSpan": 3,
					"rowSpan": 1
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "Note";
				output_6.style.css({
					"text-align" : "right"
				});
				container.addChild(output_6, {
					"colIndex": 0,
					"rowIndex": 4,
					"colSpan": 1,
					"rowSpan": 2,
					"verticalAlign": "top"
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "Save";
				container.addChild(button_1, {
					"colIndex": 1,
					"rowIndex": 5,
					"colSpan": 3,
					"rowSpan": 1,
					"horizontalAlign": "right"
				});
				var textArea_1 = new cpr.controls.TextArea("txa1");
				container.addChild(textArea_1, {
					"colIndex": 1,
					"rowIndex": 4,
					"colSpan": 3,
					"rowSpan": 1
				});
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.ComboOrRadio();
				userDefinedControl_1.dataSet = app.lookup("ds1");
				userDefinedControl_1.value = "green";
				container.addChild(userDefinedControl_1, {
					"colIndex": 1,
					"rowIndex": 3,
					"colSpan": 3,
					"rowSpan": 1
				});
				var output_7 = new cpr.controls.Output();
				output_7.value = "Dynamic";
				output_7.style.css({
					"text-align" : "right"
				});
				container.addChild(output_7, {
					"colIndex": 0,
					"rowIndex": 3
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "40px",
				"right": "40px",
				"bottom": "40px",
				"left": "40px"
			});
			if(typeof onBodyScreenChange == "function"){
				app.addEventListener("screen-change", onBodyScreenChange);
			}
		}
	});
	app.title = "3-FormLayout";
	cpr.core.Platform.INSTANCE.register(app);
})();
