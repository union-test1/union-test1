/*
 * App URI: 6-UDC/Advanced/Section
 * Source Location: 6-UDC/Advanced/Section.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("6-UDC/Advanced/Section", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("test");
			dataSet_1.parseData({
				"columns": [
					{"name": "reuseId"},
					{"name": "value"},
					{
						"name": "height",
						"dataType": "number"
					}
				],
				"rows": [
					{"reuseId": "6-UDC/Advanced/Section", "value": "Group1", "height": "30"},
					{"reuseId": "6-UDC/Advanced/Message", "value": "data1", "height": "50"},
					{"reuseId": "6-UDC/Advanced/Message", "value": "data2", "height": "50"},
					{"reuseId": "6-UDC/Advanced/Message", "value": "data3", "height": "50"},
					{"reuseId": "6-UDC/Advanced/Message", "value": "data4", "height": "50"},
					{"reuseId": "6-UDC/Advanced/Section", "value": "Group2", "height": "30"},
					{"reuseId": "6-UDC/Advanced/Message", "value": "data1", "height": "50"},
					{"reuseId": "6-UDC/Advanced/Message", "value": "data2", "height": "50"},
					{"reuseId": "6-UDC/Advanced/Section", "value": "Group3", "height": "30"},
					{"reuseId": "6-UDC/Advanced/Message", "value": "data1", "height": "50"},
					{"reuseId": "6-UDC/Advanced/Section", "value": "Group4", "height": "30"}
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
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "cornFlowerBlue",
				"color" : "white"
			});
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.style.css({
					"color" : "white"
				});
				output_1.bind("value").toDataColumn("value");
				container.addChild(output_1, {
					"right": "0px",
					"left": "20px",
					"height": "20px",
					"top": "calc(50% - 10px)"
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
	app.title = "Section";
	cpr.core.Platform.INSTANCE.register(app);
})();