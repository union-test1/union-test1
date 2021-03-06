/*
 * App URI: template/layout/reaction_layout
 * Source Location: template/layout/reaction_layout.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("template/layout/reaction_layout", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * reaction_layout.js
			 * Created at 2018. 8. 14. 오전 10:33:06.
			 * 
			 * @author leeds
			 ************************************************/;
			// End - User Script
			
			// Header
			app.declareAppProperty("title", null);
			
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
			var responsiveXYLayout_1 = new cpr.controls.layouts.ResponsiveXYLayout();
			container.setLayout(responsiveXYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
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
			var responsiveXYLayout_2 = new cpr.controls.layouts.ResponsiveXYLayout();
			group_1.setLayout(responsiveXYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "1024 x 768 일 때 사라집니다.";
				container.addChild(output_1, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "20px",
							"right": "20px",
							"left": "20px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "20px",
							"right": "10px",
							"left": "10px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "20px",
							"right": "3px",
							"left": "3px",
							"height": "40px"
						}
					]
				});
				var button_1 = new cpr.controls.Button("btn1");
				button_1.value = "Button";
				container.addChild(button_1, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "80px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "80px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "80px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "Output";
				container.addChild(output_2, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "140px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "140px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "140px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				container.addChild(inputBox_1, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "200px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "200px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "200px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var checkBox_1 = new cpr.controls.CheckBox("cbx1");
				checkBox_1.text = "Check";
				container.addChild(checkBox_1, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "260px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "260px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "260px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var tree_1 = new cpr.controls.Tree("tre1");
				(function(tree_1){
					tree_1.addItem(new cpr.controls.TreeItem("label1", "value1", null));
					tree_1.addItem(new cpr.controls.TreeItem("label2", "value2", null));
					tree_1.addItem(new cpr.controls.TreeItem("label3", "value3", "value1"));
					tree_1.addItem(new cpr.controls.TreeItem("label4", "value4", "value3"));
					tree_1.addItem(new cpr.controls.TreeItem("label5", "value5", "value3"));
					tree_1.addItem(new cpr.controls.TreeItem("label6", "value6", null));
					tree_1.addItem(new cpr.controls.TreeItem("label7", "value7", null));
					tree_1.addItem(new cpr.controls.TreeItem("label8", "value8", "value6"));
					tree_1.addItem(new cpr.controls.TreeItem("label9", "value9", "value8"));
					tree_1.addItem(new cpr.controls.TreeItem("label10", "value10", null));
				})(tree_1);
				container.addChild(tree_1, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "320px",
							"left": "20px",
							"width": "200px",
							"height": "200px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "320px",
							"left": "10px",
							"width": "150px",
							"height": "200px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "320px",
							"left": "3px",
							"width": "51px",
							"height": "200px"
						}
					]
				});
			})(group_1);
			container.addChild(group_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"hidden": true,
						"top": "44px",
						"bottom": "10px",
						"left": "10px",
						"width": "500px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "44px",
						"bottom": "10px",
						"left": "5px",
						"width": "244px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"hidden": false,
						"top": "44px",
						"bottom": "10px",
						"left": "2px",
						"width": "83px"
					}
				]
			});
			
			var userDefinedControl_1 = new udc.pagetitle();
			userDefinedControl_1.bind("title").toAppProperty("title");
			container.addChild(userDefinedControl_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "10px",
						"right": "10px",
						"left": "10px",
						"height": "24px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "10px",
						"right": "5px",
						"left": "5px",
						"height": "24px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"hidden": false,
						"top": "10px",
						"right": "2px",
						"left": "2px",
						"height": "24px"
					}
				]
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-bottom-color" : "lightgray",
				"border-left-style" : "solid",
				"border-right-width" : "1px",
				"border-bottom-width" : "1px",
				"border-left-color" : "lightgray",
				"border-top-color" : "lightgray",
				"border-bottom-style" : "solid",
				"border-right-color" : "lightgray",
				"border-left-width" : "1px",
				"border-top-style" : "solid"
			});
			// Layout
			var responsiveXYLayout_3 = new cpr.controls.layouts.ResponsiveXYLayout();
			group_2.setLayout(responsiveXYLayout_3);
			(function(container){
				var output_3 = new cpr.controls.Output();
				output_3.value = "500 x 667 일 때 사라집니다.";
				container.addChild(output_3, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "20px",
							"right": "20px",
							"left": "20px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "20px",
							"right": "10px",
							"left": "10px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "20px",
							"right": "3px",
							"left": "3px",
							"height": "40px"
						}
					]
				});
				var button_2 = new cpr.controls.Button("btn2");
				button_2.value = "Button";
				container.addChild(button_2, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "80px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "80px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "80px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "Output";
				container.addChild(output_4, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "140px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "140px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "140px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var inputBox_2 = new cpr.controls.InputBox("ipb2");
				container.addChild(inputBox_2, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "200px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "200px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "200px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var checkBox_2 = new cpr.controls.CheckBox("cbx2");
				checkBox_2.text = "Check";
				container.addChild(checkBox_2, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "260px",
							"left": "20px",
							"width": "200px",
							"height": "40px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "260px",
							"left": "10px",
							"width": "150px",
							"height": "40px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "260px",
							"left": "3px",
							"width": "51px",
							"height": "40px"
						}
					]
				});
				var tree_2 = new cpr.controls.Tree("tre2");
				(function(tree_2){
					tree_2.addItem(new cpr.controls.TreeItem("label1", "value1", null));
					tree_2.addItem(new cpr.controls.TreeItem("label2", "value2", null));
					tree_2.addItem(new cpr.controls.TreeItem("label3", "value3", "value1"));
					tree_2.addItem(new cpr.controls.TreeItem("label4", "value4", "value3"));
					tree_2.addItem(new cpr.controls.TreeItem("label5", "value5", "value3"));
					tree_2.addItem(new cpr.controls.TreeItem("label6", "value6", null));
					tree_2.addItem(new cpr.controls.TreeItem("label7", "value7", null));
					tree_2.addItem(new cpr.controls.TreeItem("label8", "value8", "value6"));
					tree_2.addItem(new cpr.controls.TreeItem("label9", "value9", "value8"));
					tree_2.addItem(new cpr.controls.TreeItem("label10", "value10", null));
				})(tree_2);
				container.addChild(tree_2, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "320px",
							"left": "20px",
							"width": "200px",
							"height": "200px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "320px",
							"left": "10px",
							"width": "150px",
							"height": "200px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"hidden": false,
							"top": "320px",
							"left": "3px",
							"width": "51px",
							"height": "200px"
						}
					]
				});
			})(group_2);
			container.addChild(group_2, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "44px",
						"bottom": "10px",
						"left": "514px",
						"width": "500px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"hidden": true,
						"top": "44px",
						"bottom": "10px",
						"left": "251px",
						"width": "244px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"hidden": false,
						"top": "44px",
						"bottom": "10px",
						"left": "86px",
						"width": "83px"
					}
				]
			});
		}
	});
	app.title = "reaction_layout";
	cpr.core.Platform.INSTANCE.register(app);
})();
