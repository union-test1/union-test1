/*
 * App URI: example/component/tab_contextmenu
 * Source Location: example/component/tab_contextmenu.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/component/tab_contextmenu", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			function convertBooleanByValue(value) {
				if (value == "true") {
					return true;
				}
				return false;
			}
			
			function convertNumberByValue(value) {
				if (!isNaN(value)) {
					return parseInt(value);
				}
				return 0;
			}
			/*
			 * "Apply" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick( /* cpr.events.CMouseEvent */ e) {
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				var id = "col2_" + btn1.userattr("index");
				var property = btn1.userattr("property");
				var control = app.lookup(id);
				var tree = app.lookup("tab1");
				if (control.type == "radiobutton") {
					tree[property] = convertBooleanByValue(control.value);
				} else if (control.type == "numbereditor") {
					tree[property] = convertNumberByValue(control.value);
				} else {
					tree[property] = control.value;
				}
				tree.redraw();
			
			}
			
			/*
			 * "execute" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
				var textarea = app.lookup("txa1");
				eval(textarea.value);
			}
			
			/*
			 * 탭 폴더에서 contextmenu 이벤트 발생 시 호출.
			 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
			 */
			function onTab1Contextmenu( /* cpr.events.CMouseEvent */ e) {
				//시스템 컨텍스트 메뉴를 방지합니다.
				e.preventDefault();
				
				var targetItem = e.targetObject.item; //마우스 포인터에 해당되는 탭아이템을 가져옵니다.
				var menu = new cpr.controls.Menu("ctxmenu"); // 메뉴를 생성합니다.
			
				// blur이벤트 핸들러 입니다.
				menu.addEventListener("blur", function(e) {
					// 컨트롤에 포함되어 있는 객체들을 제거합니다.
					menu.dispose();
				});
			
				menu.addEventListener("selection-change", function(e) {
					//컨트롤에 포함되어 있는 객체들을 제거합니다.
					menu.dispose();
			
					var newSelection = e.newSelection[0];
					var tabFolder = app.lookup("tab1");
			
					if (newSelection.label == "모든 탭 닫기") {
						tabFolder.closeAll();
					}
					if (newSelection.label == "다른 탭 닫기") {
						tabFolder.closeOthers(targetItem);
					}
				});
			
				//탭폴더 버튼과 헤더에 따른 메뉴 구성
				if (targetItem) {
					// contextmenu 아이템 입니다.
					(function(ctxmenu) {
						ctxmenu.addItem(new cpr.controls.MenuItem("다른 탭 닫기", "value1", ""));
						ctxmenu.addItem(new cpr.controls.MenuItem("모든 탭 닫기", "value2", ""));
			
					})(menu);
			
				} else {
					// contextmenu 아이템 입니다.
					(function(ctxmenu) {
						ctxmenu.addItem(new cpr.controls.MenuItem("모든 탭 닫기", "value2", ""));
					})(menu);
			
				}
			
				//메뉴가 마우스 포인터에 위치 할 수 있도록 조정
				var appRect = app.getActualRect();
				menu.style.css({
					position: "absolute",
					top: "" + (e.clientY - appRect.top) + "px",
					left: "" + (e.clientX - appRect.left) + "px",
					width: "180px"
				});
			
				//컨트롤을 최상위 위치에 설정
				app.floatControl(menu);
			
				//blur되었을시 사라질수 있도록 focus 할당
				menu.focus();
			}
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds_radio");
			dataSet_1.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "true", "value": "true"},
					{"label": "false", "value": "false"}
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
			var tabFolder_1 = new cpr.controls.TabFolder("tab1");
			
			var tabItem_1 = (function(tabFolder){
				var tabItem_1 = new cpr.controls.TabItem();
				tabItem_1.text = "tab1";
				tabItem_1.closable = true;
				var group_1 = new cpr.controls.Container();
				// Layout
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_1.setLayout(xYLayout_2);
				(function(container){
					var button_1 = new cpr.controls.Button();
					button_1.value = "Button";
					container.addChild(button_1, {
						"top": "53px",
						"left": "52px",
						"width": "100px",
						"height": "20px"
					});
					var button_2 = new cpr.controls.Button();
					button_2.value = "Button";
					container.addChild(button_2, {
						"top": "118px",
						"left": "104px",
						"width": "100px",
						"height": "20px"
					});
				})(group_1);
				tabItem_1.content = group_1;
				tabItem_1.bind("text").toExpression("\"hi\"");
				return tabItem_1;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_1);
			
			var tabItem_2 = (function(tabFolder){
				var tabItem_2 = new cpr.controls.TabItem();
				tabItem_2.text = "tab 2";
				tabItem_2.closable = true;
				var group_2 = new cpr.controls.Container();
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var inputBox_1 = new cpr.controls.InputBox("ipb2");
					container.addChild(inputBox_1, {
						"top": "58px",
						"left": "64px",
						"width": "100px",
						"height": "20px"
					});
					var comboBox_1 = new cpr.controls.ComboBox("cmb1");
					(function(comboBox_1){
						comboBox_1.addItem(new cpr.controls.Item("label1", "value1"));
						comboBox_1.addItem(new cpr.controls.Item("label2", "value2"));
						comboBox_1.addItem(new cpr.controls.Item("label3", "value3"));
						comboBox_1.addItem(new cpr.controls.Item("label4", "value4"));
						comboBox_1.addItem(new cpr.controls.Item("label5", "value5"));
						comboBox_1.addItem(new cpr.controls.Item("label6", "value6"));
					})(comboBox_1);
					container.addChild(comboBox_1, {
						"top": "107px",
						"left": "63px",
						"width": "100px",
						"height": "20px"
					});
				})(group_2);
				tabItem_2.content = group_2;
				return tabItem_2;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_2);
			
			var tabItem_3 = (function(tabFolder){
				var tabItem_3 = new cpr.controls.TabItem();
				tabItem_3.text = "tab 3";
				tabItem_3.closable = true;
				var group_3 = new cpr.controls.Container();
				// Layout
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var slider_1 = new cpr.controls.Slider("sld1");
					container.addChild(slider_1, {
						"top": "100px",
						"left": "92px",
						"width": "179px",
						"height": "20px"
					});
					var dateInput_1 = new cpr.controls.DateInput("dti1");
					container.addChild(dateInput_1, {
						"top": "147px",
						"left": "77px",
						"width": "100px",
						"height": "20px"
					});
				})(group_3);
				tabItem_3.content = group_3;
				return tabItem_3;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_3);
			
			var tabItem_4 = (function(tabFolder){
				var tabItem_4 = new cpr.controls.TabItem();
				tabItem_4.text = "tab 4";
				tabItem_4.closable = true;
				var group_4 = new cpr.controls.Container();
				// Layout
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
				(function(container){
				})(group_4);
				tabItem_4.content = group_4;
				return tabItem_4;
			})(tabFolder_1);
			tabFolder_1.addTabItem(tabItem_4);
			tabFolder_1.setSelectedTabItem(tabItem_1);
			if(typeof onTab1Contextmenu == "function") {
				tabFolder_1.addEventListener("contextmenu", onTab1Contextmenu);
			}
			container.addChild(tabFolder_1, {
				"top": "94px",
				"left": "20px",
				"width": "405px",
				"height": "456px"
			});
			
			var group_5 = new cpr.controls.Container();
			group_5.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"border-bottom-color" : "#ebebeb",
				"border-left-style" : "solid",
				"border-right-width" : "1px",
				"border-bottom-width" : "1px",
				"border-left-color" : "#ebebeb",
				"border-top-color" : "#ebebeb",
				"border-bottom-style" : "solid",
				"border-right-color" : "#ebebeb",
				"border-left-width" : "1px",
				"border-top-style" : "solid"
			});
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
			formLayout_1.setColumns(["150px", "1fr", "100px"]);
			formLayout_1.setUseColumnShade(0, true);
			formLayout_1.setRows(["25px", "25px", "25px", "25px", "25px"]);
			group_5.setLayout(formLayout_1);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "enabled";
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "visible";
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "tooltip";
				container.addChild(output_3, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var radioButton_1 = new cpr.controls.RadioButton("col2_1");
				radioButton_1.value = "true";
				(function(radioButton_1){
					radioButton_1.setItemSet(app.lookup("ds_radio"), {
						"label": "label",
						"value": "value"
					})
				})(radioButton_1);
				container.addChild(radioButton_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var radioButton_2 = new cpr.controls.RadioButton("col2_2");
				radioButton_2.value = "true";
				(function(radioButton_2){
					radioButton_2.setItemSet(app.lookup("ds_radio"), {
						"label": "label",
						"value": "value"
					})
				})(radioButton_2);
				container.addChild(radioButton_2, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var inputBox_2 = new cpr.controls.InputBox("col2_3");
				container.addChild(inputBox_2, {
					"colIndex": 1,
					"rowIndex": 2
				});
				var button_3 = new cpr.controls.Button();
				button_3.value = "Apply";
				button_3.userAttr({
					"index": "1",
					"property": "enabled"
				});
				if(typeof onButtonClick == "function") {
					button_3.addEventListener("click", onButtonClick);
				}
				container.addChild(button_3, {
					"colIndex": 2,
					"rowIndex": 0
				});
				var button_4 = new cpr.controls.Button();
				button_4.value = "Apply";
				button_4.userAttr({
					"index": "2",
					"property": "visible"
				});
				if(typeof onButtonClick == "function") {
					button_4.addEventListener("click", onButtonClick);
				}
				container.addChild(button_4, {
					"colIndex": 2,
					"rowIndex": 1
				});
				var button_5 = new cpr.controls.Button();
				button_5.value = "Apply";
				button_5.userAttr({
					"index": "3",
					"property": "tooltip"
				});
				if(typeof onButtonClick == "function") {
					button_5.addEventListener("click", onButtonClick);
				}
				container.addChild(button_5, {
					"colIndex": 2,
					"rowIndex": 2
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "hideHeader";
				container.addChild(output_4, {
					"colIndex": 0,
					"rowIndex": 3
				});
				var radioButton_3 = new cpr.controls.RadioButton("col2_4");
				radioButton_3.value = "false";
				(function(radioButton_3){
					radioButton_3.setItemSet(app.lookup("ds_radio"), {
						"label": "label",
						"value": "value"
					})
				})(radioButton_3);
				container.addChild(radioButton_3, {
					"colIndex": 1,
					"rowIndex": 3
				});
				var button_6 = new cpr.controls.Button();
				button_6.value = "Apply";
				button_6.userAttr({
					"index": "4",
					"property": "hideHeader"
				});
				if(typeof onButtonClick == "function") {
					button_6.addEventListener("click", onButtonClick);
				}
				container.addChild(button_6, {
					"colIndex": 2,
					"rowIndex": 3
				});
				var button_7 = new cpr.controls.Button();
				button_7.value = "Apply";
				button_7.userAttr({
					"index": "5",
					"property": "showCloseOnlyActive"
				});
				if(typeof onButtonClick == "function") {
					button_7.addEventListener("click", onButtonClick);
				}
				container.addChild(button_7, {
					"colIndex": 2,
					"rowIndex": 4
				});
				var radioButton_4 = new cpr.controls.RadioButton("col2_5");
				radioButton_4.value = "false";
				(function(radioButton_4){
					radioButton_4.setItemSet(app.lookup("ds_radio"), {
						"label": "label",
						"value": "value"
					})
				})(radioButton_4);
				container.addChild(radioButton_4, {
					"colIndex": 1,
					"rowIndex": 4
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "showCloseOnlyActive";
				container.addChild(output_5, {
					"colIndex": 0,
					"rowIndex": 4
				});
			})(group_5);
			container.addChild(group_5, {
				"top": "94px",
				"left": "493px",
				"width": "486px",
				"height": "184px"
			});
			
			var textArea_1 = new cpr.controls.TextArea("txa1");
			textArea_1.value = "var tabfolder = app.lookup(\"tab1\");\r\nconsole.log(tabfolder.getSelectedTabItem());";
			container.addChild(textArea_1, {
				"top": "338px",
				"left": "493px",
				"width": "408px",
				"height": "200px"
			});
			
			var button_8 = new cpr.controls.Button();
			button_8.value = "execute";
			if(typeof onButtonClick2 == "function") {
				button_8.addEventListener("click", onButtonClick2);
			}
			container.addChild(button_8, {
				"top": "308px",
				"left": "801px",
				"width": "100px",
				"height": "20px"
			});
			
			var userDefinedControl_1 = new udc.pagetitle2();
			userDefinedControl_1.bind("title").toAppProperty("title");
			userDefinedControl_1.bind("explain").toAppProperty("explain");
			container.addChild(userDefinedControl_1, {
				"top": "20px",
				"right": "0px",
				"left": "20px",
				"height": "50px"
			});
		}
	});
	app.title = "tab_contextmenu";
	cpr.core.Platform.INSTANCE.register(app);
})();
