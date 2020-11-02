/*
 * App URI: example/component/mdi_header
 * Source Location: example/component/mdi_header.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/component/mdi_header", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * mdi_header.js
			 * Created at 2018. 8. 13. 오후 2:22:11.
			 * 
			 * @author leeds
			 ************************************************/;
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			
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
			var mDIFolder_1 = new cpr.controls.MDIFolder();
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "tab 1";
				var group_1 = new cpr.controls.Container();
				// Layout
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_1.setLayout(xYLayout_2);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "headerPosition top";
					container.addChild(output_1, {
						"top": "20px",
						"right": "20px",
						"left": "20px",
						"height": "40px"
					});
				})(group_1);
				tabItem_1.content = group_1;
				return tabItem_1;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_1);
			
			var tabItem_2 = (function(tabFolder){
				var tabItem_2 = new cpr.controls.TabItem();
				tabItem_2.text = "tab 2";
				var group_2 = new cpr.controls.Container();
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
				})(group_2);
				tabItem_2.content = group_2;
				return tabItem_2;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_2);
			
			var tabItem_3 = (function(tabFolder){
				var tabItem_3 = new cpr.controls.TabItem();
				tabItem_3.text = "tab 3";
				var group_3 = new cpr.controls.Container();
				// Layout
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
				})(group_3);
				tabItem_3.content = group_3;
				return tabItem_3;
			})(mDIFolder_1);
			mDIFolder_1.addTabItem(tabItem_3);
			mDIFolder_1.setSelectedTabItem(tabItem_1);
			container.addChild(mDIFolder_1, {
				"top": "80px",
				"left": "40px",
				"width": "400px",
				"height": "300px"
			});
			
			var mDIFolder_2 = new cpr.controls.MDIFolder();
			mDIFolder_2.headerPosition = "bottom";
			
			var tabItem_4 = (function(tabFolder){
				var tabItem_4 = new cpr.controls.TabItem();
				tabItem_4.text = "tab 1";
				var group_4 = new cpr.controls.Container();
				// Layout
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
				(function(container){
					var output_2 = new cpr.controls.Output();
					output_2.value = "headerPosition bottom";
					container.addChild(output_2, {
						"top": "20px",
						"right": "20px",
						"left": "20px",
						"height": "40px"
					});
				})(group_4);
				tabItem_4.content = group_4;
				return tabItem_4;
			})(mDIFolder_2);
			mDIFolder_2.addTabItem(tabItem_4);
			
			var tabItem_5 = (function(tabFolder){
				var tabItem_5 = new cpr.controls.TabItem();
				tabItem_5.text = "tab 2";
				var group_5 = new cpr.controls.Container();
				// Layout
				var xYLayout_6 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_6);
				(function(container){
				})(group_5);
				tabItem_5.content = group_5;
				return tabItem_5;
			})(mDIFolder_2);
			mDIFolder_2.addTabItem(tabItem_5);
			
			var tabItem_6 = (function(tabFolder){
				var tabItem_6 = new cpr.controls.TabItem();
				tabItem_6.text = "tab 3";
				var group_6 = new cpr.controls.Container();
				// Layout
				var xYLayout_7 = new cpr.controls.layouts.XYLayout();
				group_6.setLayout(xYLayout_7);
				(function(container){
				})(group_6);
				tabItem_6.content = group_6;
				return tabItem_6;
			})(mDIFolder_2);
			mDIFolder_2.addTabItem(tabItem_6);
			mDIFolder_2.setSelectedTabItem(tabItem_4);
			container.addChild(mDIFolder_2, {
				"top": "80px",
				"left": "500px",
				"width": "400px",
				"height": "300px"
			});
			
			var mDIFolder_3 = new cpr.controls.MDIFolder();
			mDIFolder_3.hideHeader = true;
			
			var tabItem_7 = (function(tabFolder){
				var tabItem_7 = new cpr.controls.TabItem();
				tabItem_7.text = "tab 1";
				var group_7 = new cpr.controls.Container();
				// Layout
				var xYLayout_8 = new cpr.controls.layouts.XYLayout();
				group_7.setLayout(xYLayout_8);
				(function(container){
					var output_3 = new cpr.controls.Output();
					output_3.value = "hideHeader";
					container.addChild(output_3, {
						"top": "20px",
						"right": "20px",
						"left": "20px",
						"height": "40px"
					});
				})(group_7);
				tabItem_7.content = group_7;
				return tabItem_7;
			})(mDIFolder_3);
			mDIFolder_3.addTabItem(tabItem_7);
			
			var tabItem_8 = (function(tabFolder){
				var tabItem_8 = new cpr.controls.TabItem();
				tabItem_8.text = "tab 2";
				var group_8 = new cpr.controls.Container();
				// Layout
				var xYLayout_9 = new cpr.controls.layouts.XYLayout();
				group_8.setLayout(xYLayout_9);
				(function(container){
				})(group_8);
				tabItem_8.content = group_8;
				return tabItem_8;
			})(mDIFolder_3);
			mDIFolder_3.addTabItem(tabItem_8);
			
			var tabItem_9 = (function(tabFolder){
				var tabItem_9 = new cpr.controls.TabItem();
				tabItem_9.text = "tab 3";
				var group_9 = new cpr.controls.Container();
				// Layout
				var xYLayout_10 = new cpr.controls.layouts.XYLayout();
				group_9.setLayout(xYLayout_10);
				(function(container){
				})(group_9);
				tabItem_9.content = group_9;
				return tabItem_9;
			})(mDIFolder_3);
			mDIFolder_3.addTabItem(tabItem_9);
			mDIFolder_3.setSelectedTabItem(tabItem_7);
			container.addChild(mDIFolder_3, {
				"top": "400px",
				"left": "40px",
				"width": "400px",
				"height": "300px"
			});
			
			var mDIFolder_4 = new cpr.controls.MDIFolder();
			var group_10 = new cpr.controls.Container();
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setRows(["1fr"]);
			group_10.setLayout(formLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button("btn1");
				button_1.value = "Button";
				container.addChild(button_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_2 = new cpr.controls.Button("btn2");
				button_2.value = "Button";
				container.addChild(button_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_10);
			mDIFolder_4.addHeaderControl(group_10, {"width": 150});
			
			var tabItem_10 = (function(tabFolder){
				var tabItem_10 = new cpr.controls.TabItem();
				tabItem_10.text = "tab 1";
				var group_11 = new cpr.controls.Container();
				// Layout
				var xYLayout_11 = new cpr.controls.layouts.XYLayout();
				group_11.setLayout(xYLayout_11);
				(function(container){
					var output_4 = new cpr.controls.Output();
					output_4.value = "헤더컨트롤 사용";
					container.addChild(output_4, {
						"top": "20px",
						"right": "20px",
						"left": "20px",
						"height": "40px"
					});
				})(group_11);
				tabItem_10.content = group_11;
				return tabItem_10;
			})(mDIFolder_4);
			mDIFolder_4.addTabItem(tabItem_10);
			
			var tabItem_11 = (function(tabFolder){
				var tabItem_11 = new cpr.controls.TabItem();
				tabItem_11.text = "tab 2";
				var group_12 = new cpr.controls.Container();
				// Layout
				var xYLayout_12 = new cpr.controls.layouts.XYLayout();
				group_12.setLayout(xYLayout_12);
				(function(container){
				})(group_12);
				tabItem_11.content = group_12;
				return tabItem_11;
			})(mDIFolder_4);
			mDIFolder_4.addTabItem(tabItem_11);
			
			var tabItem_12 = (function(tabFolder){
				var tabItem_12 = new cpr.controls.TabItem();
				tabItem_12.text = "tab 3";
				var group_13 = new cpr.controls.Container();
				// Layout
				var xYLayout_13 = new cpr.controls.layouts.XYLayout();
				group_13.setLayout(xYLayout_13);
				(function(container){
				})(group_13);
				tabItem_12.content = group_13;
				return tabItem_12;
			})(mDIFolder_4);
			mDIFolder_4.addTabItem(tabItem_12);
			mDIFolder_4.setSelectedTabItem(tabItem_10);
			container.addChild(mDIFolder_4, {
				"top": "400px",
				"left": "500px",
				"width": "400px",
				"height": "300px"
			});
			
			var userDefinedControl_1 = new udc.pagetitle2();
			userDefinedControl_1.bind("explain").toAppProperty("explain");
			userDefinedControl_1.bind("title").toAppProperty("title");
			container.addChild(userDefinedControl_1, {
				"top": "10px",
				"right": "10px",
				"left": "10px",
				"height": "50px"
			});
		}
	});
	app.title = "mdi_header";
	cpr.core.Platform.INSTANCE.register(app);
})();