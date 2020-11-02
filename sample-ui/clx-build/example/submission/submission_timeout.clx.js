/*
 * App URI: example/submission/submission_timeout
 * Source Location: example/submission/submission_timeout.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/submission/submission_timeout", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				var sms = app.lookup("sms1");
				// 데이터를 전송합니다. 이미 동일한 서브미션으로 전송 중인 경우 실행되지 않습니다.
				sms.send();
			}
			
			/*
			 * 서브미션에서 submit-timeout 이벤트 발생 시 호출.
			 * 통신 중 Timeout이 발생했을 때 로출되는 이벤트입니다.
			 */
			function onSms1SubmitTimeout(/* cpr.events.CSubmissionEvent */ e){
				/** 
				 * @type cpr.protocols.Submission
				 */
				var sms1 = e.control;
				alert("timeout 1000ms");
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({
				"alterColumnLayout": "server",
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"}
				]
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("sms1");
			submission_1.action = "../timeout.jsp";
			submission_1.timeout = 1000;
			submission_1.responseType = "javascript";
			if(typeof onSms1SubmitTimeout == "function") {
				submission_1.addEventListener("submit-timeout", onSms1SubmitTimeout);
			}
			app.register(submission_1);
			
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
			var button_1 = new cpr.controls.Button();
			button_1.value = "send";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "102px",
				"left": "243px",
				"width": "100px",
				"height": "20px"
			});
			
			var output_1 = new cpr.controls.Output();
			output_1.value = "submission-timeout 1000ms";
			container.addChild(output_1, {
				"top": "102px",
				"left": "38px",
				"width": "195px",
				"height": "20px"
			});
			
			var output_2 = new cpr.controls.Output();
			output_2.value = "클라이언트에서 1000ms가 지나면 연결을 끊는 기능";
			container.addChild(output_2, {
				"top": "72px",
				"left": "38px",
				"width": "351px",
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
	app.title = "타임아웃";
	cpr.core.Platform.INSTANCE.register(app);
})();
