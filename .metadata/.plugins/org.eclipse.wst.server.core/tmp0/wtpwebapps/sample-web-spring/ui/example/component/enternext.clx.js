/*
 * App URI: example/component/enternext
 * Source Location: example/component/enternext.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/component/enternext", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onIpb1Keydown(/* cpr.events.CKeyboardEvent */ e){
				var ctrl = e.control;
				
				if(e.keyCode == 13) {
					// 다음 컨트롤로 포커스를 이동합니다.
					app.focusNext(ctrl);
				}
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			
			app.supportMedia("all", "default");
			
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
			formLayout_1.setColumns(["100px", "1fr", "100px", "1fr", "100px", "1fr"]);
			formLayout_1.setRows(["1fr", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "Column1";
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "Column4";
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "Column2";
				container.addChild(output_3, {
					"colIndex": 2,
					"rowIndex": 0
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "Column5";
				container.addChild(output_4, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "Column3";
				container.addChild(output_5, {
					"colIndex": 4,
					"rowIndex": 0
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "Column6";
				container.addChild(output_6, {
					"colIndex": 4,
					"rowIndex": 1
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				if(typeof onIpb1Keydown == "function") {
					inputBox_1.addEventListener("keydown", onIpb1Keydown);
				}
				container.addChild(inputBox_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
				if(typeof onIpb1Keydown == "function") {
					numberEditor_1.addEventListener("keydown", onIpb1Keydown);
				}
				container.addChild(numberEditor_1, {
					"colIndex": 3,
					"rowIndex": 0
				});
				var dateInput_1 = new cpr.controls.DateInput("dti1");
				if(typeof onIpb1Keydown == "function") {
					dateInput_1.addEventListener("keydown", onIpb1Keydown);
				}
				container.addChild(dateInput_1, {
					"colIndex": 5,
					"rowIndex": 0
				});
				var maskEditor_1 = new cpr.controls.MaskEditor("mse1");
				if(typeof onIpb1Keydown == "function") {
					maskEditor_1.addEventListener("keydown", onIpb1Keydown);
				}
				container.addChild(maskEditor_1, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var comboBox_1 = new cpr.controls.ComboBox("cmb1");
				(function(comboBox_1){
					comboBox_1.addItem(new cpr.controls.Item("label1", "value1"));
					comboBox_1.addItem(new cpr.controls.Item("label2", "value2"));
					comboBox_1.addItem(new cpr.controls.Item("label3", "value3"));
				})(comboBox_1);
				if(typeof onIpb1Keydown == "function") {
					comboBox_1.addEventListener("keydown", onIpb1Keydown);
				}
				container.addChild(comboBox_1, {
					"colIndex": 3,
					"rowIndex": 1
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdb1");
				radioButton_1.value = "value3";
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("label1", "value1"));
					radioButton_1.addItem(new cpr.controls.Item("label2", "value2"));
					radioButton_1.addItem(new cpr.controls.Item("label3", "value3"));
				})(radioButton_1);
				if(typeof onIpb1Keydown == "function") {
					radioButton_1.addEventListener("keydown", onIpb1Keydown);
				}
				container.addChild(radioButton_1, {
					"colIndex": 5,
					"rowIndex": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "70px",
				"right": "10px",
				"left": "10px",
				"height": "72px"
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
	app.title = "enternext";
	cpr.core.Platform.INSTANCE.register(app);
})();
