/*
 * App URI: 2-Publish/1-PublishExample
 * Source Location: 2-Publish/1-PublishExample.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("2-Publish/1-PublishExample", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			
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
			var image_1 = new cpr.controls.Image();
			image_1.src = "2-Publish/images/design-guide.png";
			container.addChild(image_1, {
				"top": "50px",
				"left": "20px",
				"width": "847px",
				"height": "65px"
			});
			
			var output_1 = new cpr.controls.Output();
			output_1.value = "Design Gude Line";
			output_1.style.setClasses(["title-group"]);
			container.addChild(output_1, {
				"top": "20px",
				"left": "20px",
				"width": "847px",
				"height": "20px"
			});
			
			var group_1 = new cpr.controls.Container();
			group_1.style.setClasses(["box-header"]);
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
			})(group_1);
			container.addChild(group_1, {
				"top": "196px",
				"left": "20px",
				"width": "858px",
				"height": "119px"
			});
			
			var radioButton_1 = new cpr.controls.RadioButton("rdb2");
			radioButton_1.value = "value2";
			(function(radioButton_1){
				radioButton_1.addItem(new cpr.controls.Item("Monthly", "value2"));
				radioButton_1.addItem(new cpr.controls.Item("Weekly", "value3"));
				radioButton_1.addItem(new cpr.controls.Item("Daily", "value4"));
			})(radioButton_1);
			container.addChild(radioButton_1, {
				"top": "375px",
				"left": "20px",
				"width": "257px",
				"height": "30px"
			});
			
			var comboBox_1 = new cpr.controls.ComboBox("cmb2");
			(function(comboBox_1){
			})(comboBox_1);
			container.addChild(comboBox_1, {
				"top": "449px",
				"left": "20px",
				"width": "164px",
				"height": "24px"
			});
			
			var output_2 = new cpr.controls.Output();
			output_2.value = "Parts";
			output_2.style.setClasses(["title-group"]);
			container.addChild(output_2, {
				"top": "345px",
				"left": "20px",
				"width": "847px",
				"height": "20px"
			});
			
			var output_3 = new cpr.controls.Output();
			output_3.value = "Playground";
			output_3.style.setClasses(["title-group"]);
			container.addChild(output_3, {
				"top": "166px",
				"left": "20px",
				"width": "847px",
				"height": "20px"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.setClasses(["button-group"]);
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.horizontalSpacing = "0";
			formLayout_1.setColumns(["1fr", "1fr", "1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_2.setLayout(formLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button();
				button_1.value = "前月";
				button_1.style.setClasses(["type-b", "prev"]);
				container.addChild(button_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "今月";
				button_2.style.setClasses(["type-b", "highlighted", "no-icon"]);
				container.addChild(button_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var button_3 = new cpr.controls.Button();
				button_3.value = "来月";
				button_3.style.setClasses(["type-b", "next", "right-icon"]);
				container.addChild(button_3, {
					"colIndex": 2,
					"rowIndex": 0
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "414px",
				"left": "20px",
				"width": "161px",
				"height": "25px"
			});
			
			var group_3 = new cpr.controls.Container();
			group_3.style.setClasses(["button-group"]);
			// Layout
			var formLayout_2 = new cpr.controls.layouts.FormLayout();
			formLayout_2.horizontalSpacing = "0";
			formLayout_2.setColumns(["1fr", "1fr", "1fr"]);
			formLayout_2.setRows(["1fr"]);
			group_3.setLayout(formLayout_2);
			(function(container){
				var button_4 = new cpr.controls.Button();
				button_4.value = "";
				button_4.style.setClasses(["type-b", "list1", "icon-only"]);
				container.addChild(button_4, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_5 = new cpr.controls.Button();
				button_5.value = "";
				button_5.style.setClasses(["type-b", "highlighted", "chart1", "icon-only"]);
				container.addChild(button_5, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var button_6 = new cpr.controls.Button();
				button_6.value = "";
				button_6.style.setClasses(["type-b", "chart2", "icon-only"]);
				container.addChild(button_6, {
					"colIndex": 2,
					"rowIndex": 0
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "414px",
				"left": "194px",
				"width": "83px",
				"height": "25px"
			});
		}
	});
	app.title = "1-PublishExample";
	cpr.core.Platform.INSTANCE.register(app);
})();
