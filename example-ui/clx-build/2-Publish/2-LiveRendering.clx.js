/*
 * App URI: 2-Publish/2-LiveRendering
 * Source Location: 2-Publish/2-LiveRendering.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("2-Publish/2-LiveRendering", {
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
			var listBox_1 = new cpr.controls.ListBox("lbx1");
			listBox_1.style.css({
				"background-image" : "url('2-Publish/images/pattern1.jpg')"
			});
			(function(listBox_1){
				listBox_1.addItem(new cpr.controls.Item("label1", "value1"));
				listBox_1.addItem(new cpr.controls.Item("label2", "value2"));
				listBox_1.addItem(new cpr.controls.Item("label3", "value3"));
				listBox_1.addItem(new cpr.controls.Item("label4", "value4"));
				listBox_1.addItem(new cpr.controls.Item("label5", "value5"));
				listBox_1.addItem(new cpr.controls.Item("label6", "value6"));
				listBox_1.addItem(new cpr.controls.Item("label7", "value7"));
				listBox_1.addItem(new cpr.controls.Item("label8", "value8"));
				listBox_1.addItem(new cpr.controls.Item("label9", "value9"));
				listBox_1.addItem(new cpr.controls.Item("label10", "value10"));
				listBox_1.addItem(new cpr.controls.Item("label11", "value11"));
			})(listBox_1);
			container.addChild(listBox_1, {
				"top": "20px",
				"left": "20px",
				"width": "779px",
				"height": "189px"
			});
			
			var listBox_2 = new cpr.controls.ListBox("lbx2");
			listBox_2.style.css({
				"background-color" : "#edf6ff"
			});
			(function(listBox_2){
				listBox_2.addItem(new cpr.controls.Item("label1", "value1"));
				listBox_2.addItem(new cpr.controls.Item("label2", "value2"));
				listBox_2.addItem(new cpr.controls.Item("label3", "value3"));
				listBox_2.addItem(new cpr.controls.Item("label4", "value4"));
				listBox_2.addItem(new cpr.controls.Item("label5", "value5"));
				listBox_2.addItem(new cpr.controls.Item("label6", "value6"));
				listBox_2.addItem(new cpr.controls.Item("label7", "value7"));
				listBox_2.addItem(new cpr.controls.Item("label8", "value8"));
				listBox_2.addItem(new cpr.controls.Item("label9", "value9"));
				listBox_2.addItem(new cpr.controls.Item("label10", "value10"));
				listBox_2.addItem(new cpr.controls.Item("label11", "value11"));
			})(listBox_2);
			container.addChild(listBox_2, {
				"top": "219px",
				"left": "20px",
				"width": "779px",
				"height": "189px"
			});
		}
	});
	app.title = "2-LiveRendering";
	cpr.core.Platform.INSTANCE.register(app);
})();
