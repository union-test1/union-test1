/*
 * App URI: 8-Animations/Basics
 * Source Location: 8-Animations/Basics.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("8-Animations/Basics", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/*
			 * Body에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit( /* cpr.events.CEvent */ e) {
			}
			
			/*
			 * "나타나기" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick( /* cpr.events.CMouseEvent */ e) {
				var btn1 = app.lookup("btn1");
				btn1.visible = true
				btn1.style.animateFrom({
					"transform": "rotateX(-90deg)"
				}, 0.3, cpr.animation.TimingFunction.EASE_OUT_BACK);
			}
			
			/*
			 * "강조" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
				var btn2 = app.lookup("btn2");
				btn2.style.animateAndReverse({
					"transform": "translateZ(500px) rotateZ(45deg)",
					"color": "red"
				});
			}
			
			/*
			 * "사라지기" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick3( /* cpr.events.CMouseEvent */ e) {
				var btn3 = app.lookup("btn3");
				btn3.style.animateTo({
					"transform": "translateZ(-500px)",
					"opacity": "0"
				});
			}
			// End - User Script
			
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
			var group_1 = new cpr.controls.Container();
			group_1.style.setClasses(["cl-form-group"]);
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
			formLayout_1.setColumns(["1fr", "1fr", "1fr"]);
			formLayout_1.setRows(["1fr", "25px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button("btn1");
				button_1.visible = false;
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
				var button_3 = new cpr.controls.Button("btn3");
				button_3.value = "Button";
				container.addChild(button_3, {
					"colIndex": 2,
					"rowIndex": 0
				});
				var button_4 = new cpr.controls.Button();
				button_4.value = "나타나기";
				if(typeof onButtonClick == "function") {
					button_4.addEventListener("click", onButtonClick);
				}
				container.addChild(button_4, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var button_5 = new cpr.controls.Button();
				button_5.value = "강조";
				if(typeof onButtonClick2 == "function") {
					button_5.addEventListener("click", onButtonClick2);
				}
				container.addChild(button_5, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var button_6 = new cpr.controls.Button();
				button_6.value = "사라지기";
				if(typeof onButtonClick3 == "function") {
					button_6.addEventListener("click", onButtonClick3);
				}
				container.addChild(button_6, {
					"colIndex": 2,
					"rowIndex": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "40px",
				"right": "40px",
				"left": "40px",
				"height": "300px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "Basics";
	cpr.core.Platform.INSTANCE.register(app);
})();