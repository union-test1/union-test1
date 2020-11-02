/*
 * App URI: example/embedded/embeddedJSP
 * Source Location: example/embedded/embeddedJSP.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/embedded/embeddedJSP", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			
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
			var embeddedPage_1 = new cpr.controls.EmbeddedPage();
			embeddedPage_1.src = "http://localhost:8080/embedded.jsp";
			embeddedPage_1.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-bottom-color" : "red",
				"border-right-width" : "1px",
				"border-left-style" : "solid",
				"border-bottom-width" : "1px",
				"border-left-color" : "red",
				"border-top-color" : "red",
				"border-bottom-style" : "solid",
				"border-right-color" : "red",
				"border-left-width" : "1px",
				"border-top-style" : "solid"
			});
			container.addChild(embeddedPage_1, {
				"top": "110px",
				"left": "20px",
				"width": "984px",
				"height": "350px"
			});
			
			var output_1 = new cpr.controls.Output();
			output_1.value = "jsp페이지를 앱 안에 불러오는 예제";
			container.addChild(output_1, {
				"top": "80px",
				"left": "20px",
				"width": "308px",
				"height": "20px"
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
	app.title = "jsp불러오기";
	cpr.core.Platform.INSTANCE.register(app);
})();