/*
 * App URI: example/component/dateinput_anny
 * Source Location: example/component/dateinput_anny.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/component/dateinput_anny", {
		onPrepare: function(loader){
			loader.addCSS("theme/dateinput-anny.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				
				// dateinput의 전역적으로 기념일 설정합니다.
				// Calendar 컨트롤 추가에정.
				cpr.controls.Calendar.addAnniversary(["2018-01-31", { date: "2018-01-30", label: "글로벌 일월삼십일", class: "global", unselectable: false }], "YYYY-MM-DD");
				cpr.controls.Calendar.addAnniversary({ date: "*0130", label: "글로벌 와일드카드", class: "wildcard", unselectable: false } /*, 기본 format: YYYYMMDD*/);
				
				// dti1의 개별적 기념일 설정합니다.
				var dateinput = app.lookup("dti1")
				dateinput.calendar.addAnniversary("2018.04.06");
				dateinput.calendar.addAnniversary(["2018.03.31"]);
				dateinput.calendar.addAnniversary({ date: "2018.06.24", label: "로컬 유월이십사일"});
				dateinput.calendar.addAnniversary([{date: "2018.09.09", label: "로컬 구월구일"}, {date: "2018.01.30", label: "로컬 일월삼십일"}]);
				dateinput.calendar.addAnniversary(["2018.11.11", {date: "2018.12.15", class: "december"}]);
				
				// 와일드 카드 적용됩니다.
				dateinput.calendar.addAnniversary([
					{ date: "*.12.25", label: "크리스마스", class: "christmas", unselectable: false },
					{ date: "2018.*.06", label: "입금일", class: "money", unselectable: false },
					{ date: "2018.05.*", label: "오월", class: "may", unselectable: false },
				]);	
			}
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				var target = app.lookup("dti1");
				var source = app.lookup("dti_local");
				var label = app.lookup("label_local");
				var unselectable = app.lookup("unselectable_local");
				
				var anny = {date: source.value, label: label.value, unselectable: unselectable.value == "true" ? true : false};
				target.calendar.addAnniversary(anny);
				
				var opt = app.lookup("opt");
				opt.value += "\ndti1 기념일 추가 : {date: " + anny.date + ", label: "+ anny.label + ", unselectable: "+ anny.unselectable + " }";
			}
			
			/*
			 * "글로벌기념일 추가" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn_globalClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn_global = e.control;
				var source = app.lookup("dti_global");
				var label = app.lookup("label_global");
				var unselectable = app.lookup("unselectable_global");
				
				var anny = {date: source.value, label: label.value,class: "global", unselectable: unselectable.value == "true" ? true : false};
				// Calendar 컨트롤 추가에정.
				cpr.controls.Calendar.addAnniversary(anny, "YYYY.MM.DD");
				
				var opt = app.lookup("opt");
				opt.value += "\n글로벌 기념일 추가(YYYY.MM.DD) : {date: " + anny.date + ", label: "+ anny.label + ", unselectable: "+ anny.unselectable + " }";
			};
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
			var group_1 = new cpr.controls.Container();
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setRows(["25px", "25px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container();
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.setColumns(["120px", "1fr", "120px", "1fr"]);
				formLayout_2.setRows(["25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "25px", "1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "글로벌 기념일 추가";
					output_1.style.css({
						"font-weight" : "bold"
					});
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "날짜";
					output_2.style.css({
						"text-align" : "right"
					});
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 1
					});
					var dateInput_1 = new cpr.controls.DateInput("dti_global");
					dateInput_1.value = "2018.01.01";
					dateInput_1.mask = "YYYY.MM.DD";
					dateInput_1.format = "YYYY.MM.DD";
					container.addChild(dateInput_1, {
						"colIndex": 1,
						"rowIndex": 1
					});
					var output_3 = new cpr.controls.Output();
					output_3.value = "기념일 명";
					output_3.style.css({
						"text-align" : "right"
					});
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 3
					});
					var inputBox_1 = new cpr.controls.InputBox("label_global");
					container.addChild(inputBox_1, {
						"colIndex": 1,
						"rowIndex": 3
					});
					var output_4 = new cpr.controls.Output();
					output_4.value = "선택가능";
					output_4.style.css({
						"text-align" : "right"
					});
					container.addChild(output_4, {
						"colIndex": 0,
						"rowIndex": 2
					});
					var checkBox_1 = new cpr.controls.CheckBox("unselectable_global");
					checkBox_1.value = "";
					checkBox_1.text = "";
					checkBox_1.style.css({
						"text-align" : "middle"
					});
					container.addChild(checkBox_1, {
						"colIndex": 1,
						"rowIndex": 2
					});
					var button_1 = new cpr.controls.Button("btn_global");
					button_1.value = "글로벌기념일 추가";
					if(typeof onBtn_globalClick == "function") {
						button_1.addEventListener("click", onBtn_globalClick);
					}
					container.addChild(button_1, {
						"colIndex": 2,
						"rowIndex": 3
					});
					var output_5 = new cpr.controls.Output();
					output_5.value = "dti1의 기념일 추가";
					output_5.style.css({
						"font-weight" : "bold"
					});
					container.addChild(output_5, {
						"colIndex": 0,
						"rowIndex": 5
					});
					var output_6 = new cpr.controls.Output();
					output_6.value = "날짜";
					output_6.style.css({
						"text-align" : "right"
					});
					container.addChild(output_6, {
						"colIndex": 0,
						"rowIndex": 6
					});
					var dateInput_2 = new cpr.controls.DateInput("dti_local");
					dateInput_2.value = "2018.01.01";
					dateInput_2.mask = "YYYY.MM.DD";
					dateInput_2.format = "YYYY.MM.DD";
					container.addChild(dateInput_2, {
						"colIndex": 1,
						"rowIndex": 6
					});
					var output_7 = new cpr.controls.Output();
					output_7.value = "기념일 명";
					output_7.style.css({
						"text-align" : "right"
					});
					container.addChild(output_7, {
						"colIndex": 0,
						"rowIndex": 8
					});
					var inputBox_2 = new cpr.controls.InputBox("label_local");
					container.addChild(inputBox_2, {
						"colIndex": 1,
						"rowIndex": 8
					});
					var output_8 = new cpr.controls.Output();
					output_8.value = "선택가능";
					output_8.style.css({
						"text-align" : "right"
					});
					container.addChild(output_8, {
						"colIndex": 0,
						"rowIndex": 7
					});
					var checkBox_2 = new cpr.controls.CheckBox("unselectable_local");
					checkBox_2.value = "";
					checkBox_2.text = "";
					checkBox_2.style.css({
						"text-align" : "middle"
					});
					container.addChild(checkBox_2, {
						"colIndex": 1,
						"rowIndex": 7
					});
					var button_2 = new cpr.controls.Button("btn_local");
					button_2.value = "개별 기념일 추가";
					if(typeof onButtonClick == "function") {
						button_2.addEventListener("click", onButtonClick);
					}
					container.addChild(button_2, {
						"colIndex": 2,
						"rowIndex": 8
					});
					var output_9 = new cpr.controls.Output();
					output_9.value = "기념일 추가 확인";
					output_9.style.css({
						"font-weight" : "bold"
					});
					container.addChild(output_9, {
						"colIndex": 0,
						"rowIndex": 10
					});
					var output_10 = new cpr.controls.Output();
					output_10.value = "dti1";
					container.addChild(output_10, {
						"colIndex": 0,
						"rowIndex": 11
					});
					var dateInput_3 = new cpr.controls.DateInput("dti1");
					dateInput_3.value = "2018.01.01";
					dateInput_3.mask = "YYYY.MM.DD";
					dateInput_3.format = "YYYY.MM.DD";
					container.addChild(dateInput_3, {
						"colIndex": 1,
						"rowIndex": 11
					});
					var dateInput_4 = new cpr.controls.DateInput("dti2");
					dateInput_4.value = "01/01/2018";
					dateInput_4.mask = "MM/DD/YYYY";
					dateInput_4.format = "MM/DD/YYYY";
					container.addChild(dateInput_4, {
						"colIndex": 1,
						"rowIndex": 13
					});
					var output_11 = new cpr.controls.Output();
					output_11.value = "dti2";
					container.addChild(output_11, {
						"colIndex": 0,
						"rowIndex": 13
					});
					var output_12 = new cpr.controls.Output();
					output_12.value = "format: YYYY.MM.DD";
					container.addChild(output_12, {
						"colIndex": 1,
						"rowIndex": 12
					});
					var output_13 = new cpr.controls.Output();
					output_13.value = "format: MM/DD/YYYY";
					container.addChild(output_13, {
						"colIndex": 1,
						"rowIndex": 14
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 1,
					"colSpan": 1,
					"rowSpan": 2
				});
				var output_14 = new cpr.controls.Output();
				output_14.value = "기념일 목록";
				output_14.style.css({
					"font-weight" : "bold"
				});
				container.addChild(output_14, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var output_15 = new cpr.controls.Output("opt");
				output_15.value = "글로벌(format= \"YYYY-MM-DD\") : \r\n\t    \"2018-01-31\", \r\n\t    {date: \"2018-01-30\", label: \"글로벌 일월삼십일\", class: \"global\", unselectable: false },\r\n\t    {date: \"*0130\", label: \"글로벌 와일드카드\", class: \"wildcard\", unselectable: false }\r\n\t\r\n개별(dti1) : \r\n\t  \"2018.04.06\",\r\n\t  \"2018.03.31\",\r\n\t  {date: \"2018.06.24\", label: \"로컬 유월이십사일\"},\r\n\t  {date: \"2018.09.09\", label: \"로컬 구월구일\"}, \r\n\t  {date: \"2018.01.30\", label: \"로컬 일월삼십일\"},\r\n\t  \"2018.11.11\",\r\n\t  {date: \"2018.12.15\", class: \"december\"}\r\n\t  // [*] 와일드카드 적용\r\n\t  {date: \"*.12.25\", label: \"크리스마스\", class: \"christmas\", unselectable: false },\r\n\t  {date: \"2018.*.06\", label: \"입금일\", class: \"money\", unselectable: false },\r\n\t  {date: \"2018.05.*\", label: \"오월\", class: \"may\", unselectable: false },\r\n\t";
				output_15.style.css({
					"border-right-style" : "solid",
					"padding-top" : "5px",
					"border-top-width" : "1px",
					"border-bottom-color" : "black",
					"border-right-width" : "1px",
					"padding-left" : "5px",
					"border-left-color" : "black",
					"vertical-align" : "top",
					"padding-bottom" : "5px",
					"border-right-color" : "black",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"overflow" : "auto",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "black",
					"border-bottom-style" : "solid",
					"padding-right" : "5px"
				});
				container.addChild(output_15, {
					"colIndex": 1,
					"rowIndex": 2
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "70px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
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
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "dateinput_anny";
	cpr.core.Platform.INSTANCE.register(app);
})();
