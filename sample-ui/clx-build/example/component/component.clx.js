/*
 * App URI: example/component/component
 * Source Location: example/component/component.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/component/component", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				var btn = app.lookup("btn");
				// 버튼 텍스트 설정합니다.
				btn.text = "Button"+"\n"+"("+"Alt + k"+")";
				
				var accordion = app.lookup("accordion");
				// 아코디언 1번째 아이템 선택합니다.
				var item2 = accordion.getSection(1);
				accordion.select(item2);
				
			}
			
			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn = e.control;
				alert("마우스 클릭 이벤트");
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			app.declareBindableAppProperty("explain", null);
			var dataSet_1 = new cpr.data.DataSet("dataSet");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "label",
						"dataType": "string"
					},
					{"name": "value"},
					{"name": "parentValue"}
				],
				"rows": [
					{"label": "label1", "value": "value1", "parentValue": "root"},
					{"label": "label2", "value": "value2", "parentValue": "root"},
					{"label": "label3", "value": "value3", "parentValue": "value1"},
					{"label": "label4", "value": "value4", "parentValue": "value2"},
					{"label": "label5", "value": "value5", "parentValue": "value3"}
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
			var output_1 = new cpr.controls.Output();
			output_1.value = "checkbox";
			output_1.style.setClasses(["component-css"]);
			container.addChild(output_1, {
				"top": "170px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var output_2 = new cpr.controls.Output();
			output_2.value = "number\r\neditor";
			output_2.style.setClasses(["component-css"]);
			container.addChild(output_2, {
				"top": "120px",
				"left": "410px",
				"width": "80px",
				"height": "30px"
			});
			
			var dateInput_1 = new cpr.controls.DateInput("dti1");
			container.addChild(dateInput_1, {
				"top": "120px",
				"left": "690px",
				"width": "100px",
				"height": "30px"
			});
			
			var button_1 = new cpr.controls.Button("btn");
			button_1.accessKey = "k";
			button_1.value = "Button";
			if(typeof onBtnClick == "function") {
				button_1.addEventListener("click", onBtnClick);
			}
			container.addChild(button_1, {
				"top": "70px",
				"left": "290px",
				"width": "100px",
				"height": "30px"
			});
			
			var maskEditor_1 = new cpr.controls.MaskEditor("mse1");
			maskEditor_1.mask = "AA-0XXXX-XXXXX";
			container.addChild(maskEditor_1, {
				"top": "120px",
				"left": "290px",
				"width": "100px",
				"height": "30px"
			});
			
			var output_3 = new cpr.controls.Output();
			output_3.value = "Output";
			container.addChild(output_3, {
				"top": "70px",
				"left": "90px",
				"width": "100px",
				"height": "30px"
			});
			
			var output_4 = new cpr.controls.Output();
			output_4.value = "fileinput";
			output_4.style.setClasses(["component-css"]);
			container.addChild(output_4, {
				"top": "70px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var inputBox_1 = new cpr.controls.InputBox("ipb1");
			container.addChild(inputBox_1, {
				"top": "120px",
				"left": "90px",
				"width": "100px",
				"height": "30px"
			});
			
			var output_5 = new cpr.controls.Output();
			output_5.value = "button";
			output_5.style.setClasses(["component-css"]);
			container.addChild(output_5, {
				"top": "70px",
				"left": "210px",
				"width": "80px",
				"height": "30px"
			});
			
			var output_6 = new cpr.controls.Output();
			output_6.value = "inputbox";
			output_6.style.setClasses(["component-css"]);
			container.addChild(output_6, {
				"top": "120px",
				"left": "10px",
				"width": "80px",
				"height": "30px"
			});
			
			var button_2 = new cpr.controls.Button();
			button_2.value = "도움말";
			button_2.style.setClasses(["help-button"]);
			container.addChild(button_2, {
				"top": "70px",
				"left": "490px",
				"width": "100px",
				"height": "30px"
			});
			
			var output_7 = new cpr.controls.Output();
			output_7.value = "Output";
			output_7.style.setClasses(["component-css"]);
			container.addChild(output_7, {
				"top": "70px",
				"left": "10px",
				"width": "80px",
				"height": "30px"
			});
			
			var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
			container.addChild(numberEditor_1, {
				"top": "120px",
				"left": "490px",
				"width": "100px",
				"height": "30px"
			});
			
			var output_8 = new cpr.controls.Output();
			output_8.value = "mask\r\neditor";
			output_8.style.setClasses(["component-css"]);
			container.addChild(output_8, {
				"top": "120px",
				"left": "210px",
				"width": "80px",
				"height": "30px"
			});
			
			var fileInput_1 = new cpr.controls.FileInput();
			fileInput_1.placeholder = "클릭 또는 파일을 drop 해주세요";
			container.addChild(fileInput_1, {
				"top": "70px",
				"left": "690px",
				"width": "300px",
				"height": "30px"
			});
			
			var output_9 = new cpr.controls.Output();
			output_9.value = "image\r\nbutton";
			output_9.style.setClasses(["component-css"]);
			container.addChild(output_9, {
				"top": "70px",
				"left": "410px",
				"width": "80px",
				"height": "30px"
			});
			
			var checkBox_1 = new cpr.controls.CheckBox("cbx1");
			checkBox_1.text = "Check";
			container.addChild(checkBox_1, {
				"top": "170px",
				"left": "690px",
				"width": "100px",
				"height": "30px"
			});
			
			var output_10 = new cpr.controls.Output();
			output_10.value = "dateinput";
			output_10.style.setClasses(["component-css"]);
			container.addChild(output_10, {
				"top": "120px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var checkBoxGroup_1 = new cpr.controls.CheckBoxGroup("cbg1");
			(function(checkBoxGroup_1){
				checkBoxGroup_1.addItem(new cpr.controls.Item("pre_label1", "pre_value1"));
				checkBoxGroup_1.addItem(new cpr.controls.Item("pre_label2", "pre_value2"));
				checkBoxGroup_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value"
				})
			})(checkBoxGroup_1);
			container.addChild(checkBoxGroup_1, {
				"top": "170px",
				"left": "90px",
				"width": "500px",
				"height": "50px"
			});
			
			var output_11 = new cpr.controls.Output();
			output_11.value = "checkbox\r\ngroup";
			output_11.style.setClasses(["component-css"]);
			container.addChild(output_11, {
				"top": "170px",
				"left": "10px",
				"width": "80px",
				"height": "50px"
			});
			
			var radioButton_1 = new cpr.controls.RadioButton("rdb1");
			(function(radioButton_1){
				radioButton_1.addItem(new cpr.controls.Item("pre_label1", "pre_value1"));
				radioButton_1.addItem(new cpr.controls.Item("pre_label2", "pre_value2"));
				radioButton_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value"
				})
			})(radioButton_1);
			container.addChild(radioButton_1, {
				"top": "240px",
				"left": "90px",
				"width": "500px",
				"height": "50px"
			});
			
			var output_12 = new cpr.controls.Output();
			output_12.value = "radio\r\nbutton";
			output_12.style.setClasses(["component-css"]);
			container.addChild(output_12, {
				"top": "240px",
				"left": "10px",
				"width": "80px",
				"height": "50px"
			});
			
			var output_13 = new cpr.controls.Output();
			output_13.value = "combo\r\nbox";
			output_13.style.setClasses(["component-css"]);
			container.addChild(output_13, {
				"top": "310px",
				"left": "10px",
				"width": "80px",
				"height": "50px"
			});
			
			var comboBox_1 = new cpr.controls.ComboBox("cmb1");
			(function(comboBox_1){
				comboBox_1.addItem(new cpr.controls.Item("pre_label1", "pre_value1"));
				comboBox_1.addItem(new cpr.controls.Item("pre_label2", "pre_value2"));
				comboBox_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value"
				})
			})(comboBox_1);
			container.addChild(comboBox_1, {
				"top": "310px",
				"left": "90px",
				"width": "100px",
				"height": "30px"
			});
			
			var output_14 = new cpr.controls.Output();
			output_14.value = "textarea";
			output_14.style.setClasses(["component-css"]);
			container.addChild(output_14, {
				"top": "120px",
				"left": "810px",
				"width": "80px",
				"height": "30px"
			});
			
			var textArea_1 = new cpr.controls.TextArea("txa1");
			container.addChild(textArea_1, {
				"top": "120px",
				"left": "890px",
				"width": "100px",
				"height": "170px"
			});
			
			var output_15 = new cpr.controls.Output();
			output_15.value = "progress";
			output_15.style.setClasses(["component-css"]);
			container.addChild(output_15, {
				"top": "310px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var output_16 = new cpr.controls.Output();
			output_16.value = "slider";
			output_16.style.setClasses(["component-css"]);
			container.addChild(output_16, {
				"top": "360px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var progress_1 = new cpr.controls.Progress();
			progress_1.value = "50";
			container.addChild(progress_1, {
				"top": "310px",
				"left": "690px",
				"width": "300px",
				"height": "30px"
			});
			
			var slider_1 = new cpr.controls.Slider("sld1");
			container.addChild(slider_1, {
				"top": "360px",
				"left": "690px",
				"width": "300px",
				"height": "30px"
			});
			
			var output_17 = new cpr.controls.Output();
			output_17.value = "image";
			output_17.style.setClasses(["component-css"]);
			container.addChild(output_17, {
				"top": "220px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var image_1 = new cpr.controls.Image();
			image_1.src = "images/Penguins.jpg";
			container.addChild(image_1, {
				"top": "220px",
				"left": "690px",
				"width": "100px",
				"height": "70px"
			});
			
			var output_18 = new cpr.controls.Output();
			output_18.value = "list\r\nbox";
			output_18.style.setClasses(["component-css"]);
			container.addChild(output_18, {
				"top": "380px",
				"left": "10px",
				"width": "80px",
				"height": "50px"
			});
			
			var listBox_1 = new cpr.controls.ListBox("lbx1");
			(function(listBox_1){
				listBox_1.addItem(new cpr.controls.Item("pre_label1", "pre_value1"));
				listBox_1.addItem(new cpr.controls.Item("pre_label2", "pre_value2"));
				listBox_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value"
				})
			})(listBox_1);
			container.addChild(listBox_1, {
				"top": "380px",
				"left": "90px",
				"width": "100px",
				"height": "100px"
			});
			
			var linkedListBox_1 = new cpr.controls.LinkedListBox("llb1");
			(function(linkedListBox_1){
				linkedListBox_1.addItem(new cpr.controls.TreeItem("pre_label1", "pre_value1", "root"));
				linkedListBox_1.addItem(new cpr.controls.TreeItem("pre_label2", "pre_value2", "root"));
				linkedListBox_1.addItem(new cpr.controls.TreeItem("pre_label3", "pre_value3", "pre_value1"));
				linkedListBox_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value",
					"parentValue": "parentValue"
				});
			})(linkedListBox_1);
			container.addChild(linkedListBox_1, {
				"top": "380px",
				"left": "290px",
				"width": "300px",
				"height": "100px"
			});
			
			var output_19 = new cpr.controls.Output();
			output_19.value = "linked\r\nlistbox";
			output_19.style.setClasses(["component-css"]);
			container.addChild(output_19, {
				"top": "380px",
				"left": "210px",
				"width": "80px",
				"height": "50px"
			});
			
			var linkedComboBox_1 = new cpr.controls.LinkedComboBox("lcb1");
			(function(linkedComboBox_1){
				linkedComboBox_1.addItem(new cpr.controls.TreeItem("pre_label1", "pre_value1", "root"));
				linkedComboBox_1.addItem(new cpr.controls.TreeItem("pre_label2", "pre_value2", "root"));
				linkedComboBox_1.addItem(new cpr.controls.TreeItem("pre_label3", "pre_value3", "pre_value1"));
				linkedComboBox_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value",
					"parentValue": "parentValue"
				});
			})(linkedComboBox_1);
			linkedComboBox_1.placeholders = [
			];
			container.addChild(linkedComboBox_1, {
				"top": "310px",
				"left": "290px",
				"width": "300px",
				"height": "30px"
			});
			
			var output_20 = new cpr.controls.Output();
			output_20.value = "linked\r\ncombo\r\nbox";
			output_20.style.setClasses(["component-css"]);
			container.addChild(output_20, {
				"top": "310px",
				"left": "210px",
				"width": "80px",
				"height": "50px"
			});
			
			var output_21 = new cpr.controls.Output();
			output_21.value = "page\r\nindexer";
			output_21.style.setClasses(["component-css"]);
			container.addChild(output_21, {
				"top": "410px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var pageIndexer_1 = new cpr.controls.PageIndexer();
			pageIndexer_1.init(1, 1, 1);
			container.addChild(pageIndexer_1, {
				"top": "410px",
				"left": "690px",
				"width": "300px",
				"height": "30px"
			});
			
			var menu_1 = new cpr.controls.Menu();
			(function(menu_1){
				menu_1.addItem(new cpr.controls.MenuItem("pre_label1", "pre_value1", "root"));
				menu_1.addItem(new cpr.controls.MenuItem("pre_label2", "pre_value2", "root"));
				menu_1.addItem(new cpr.controls.MenuItem("pre_label3", "pre_value3", "pre_value2"));
				menu_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value",
					"parentValue": "parentValue"
				});
			})(menu_1);
			container.addChild(menu_1, {
				"top": "500px",
				"left": "389px",
				"width": "150px",
				"height": "100px"
			});
			
			var navigationBar_1 = new cpr.controls.NavigationBar();
			(function(navigationBar_1){
				navigationBar_1.addItem(new cpr.controls.MenuItem("pre_label1", "pre_value1", "root"));
				navigationBar_1.addItem(new cpr.controls.MenuItem("pre_label2", "pre_value2", "root"));
				navigationBar_1.addItem(new cpr.controls.MenuItem("pre_label3", "pre_value3", "pre_value1"));
				navigationBar_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value",
					"parentValue": "parentValue"
				});
			})(navigationBar_1);
			container.addChild(navigationBar_1, {
				"top": "615px",
				"left": "390px",
				"width": "301px",
				"height": "30px"
			});
			
			var output_22 = new cpr.controls.Output();
			output_22.value = "navigation\r\nbar";
			output_22.style.setClasses(["component-css"]);
			container.addChild(output_22, {
				"top": "615px",
				"left": "310px",
				"width": "80px",
				"height": "50px"
			});
			
			var output_23 = new cpr.controls.Output();
			output_23.value = "menu";
			output_23.style.setClasses(["component-css"]);
			container.addChild(output_23, {
				"top": "500px",
				"left": "309px",
				"width": "80px",
				"height": "30px"
			});
			
			var output_24 = new cpr.controls.Output();
			output_24.value = "HTML\r\nObject";
			output_24.style.setClasses(["component-css"]);
			container.addChild(output_24, {
				"top": "460px",
				"left": "610px",
				"width": "80px",
				"height": "50px"
			});
			
			var hTMLObject_1 = new cpr.controls.HTMLObject("htmlObject");
			hTMLObject_1.data = "http://tv.naver.com/";
			container.addChild(hTMLObject_1, {
				"top": "460px",
				"left": "700px",
				"width": "290px",
				"height": "185px"
			});
			
			var output_25 = new cpr.controls.Output();
			output_25.value = "tree";
			output_25.style.setClasses(["component-css"]);
			container.addChild(output_25, {
				"top": "500px",
				"left": "10px",
				"width": "80px",
				"height": "30px"
			});
			
			var tree_1 = new cpr.controls.Tree("tre1");
			(function(tree_1){
				tree_1.addItem(new cpr.controls.TreeItem("pre_label1", "pre_value1", "root"));
				tree_1.addItem(new cpr.controls.TreeItem("pre_label2", "pre_value2", "root"));
				tree_1.addItem(new cpr.controls.TreeItem("pre_label3", "pre_value3", "pre_value1"));
				tree_1.setItemSet(app.lookup("dataSet"), {
					"label": "label",
					"value": "value",
					"parentValue": "parentValue"
				});
			})(tree_1);
			container.addChild(tree_1, {
				"top": "500px",
				"left": "90px",
				"width": "200px",
				"height": "150px"
			});
			
			var accordion_1 = new cpr.controls.Accordion("accordion");
			var sectionItem_1 = new cpr.controls.SectionItem();
			sectionItem_1.title = "item 1";
			(function(item){
				var group_1 = new cpr.controls.Container();
				// Layout
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_1.setLayout(xYLayout_2);
				(function(container){
				})(group_1);
				item.content = group_1;
			})(sectionItem_1);
			accordion_1.addSection(sectionItem_1);
			
			var sectionItem_2 = new cpr.controls.SectionItem();
			sectionItem_2.title = "item 2";
			(function(item){
				var group_2 = new cpr.controls.Container();
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_26 = new cpr.controls.Output();
					output_26.value = "eXbuilder6 입니다.";
					container.addChild(output_26, {
						"top": "14px",
						"left": "20px",
						"width": "250px",
						"height": "35px"
					});
				})(group_2);
				item.content = group_2;
			})(sectionItem_2);
			accordion_1.addSection(sectionItem_2);
			container.addChild(accordion_1, {
				"top": "675px",
				"left": "690px",
				"width": "300px",
				"height": "133px"
			});
			
			var output_27 = new cpr.controls.Output();
			output_27.value = "accordion";
			output_27.style.setClasses(["component-css"]);
			container.addChild(output_27, {
				"top": "673px",
				"left": "610px",
				"width": "80px",
				"height": "30px"
			});
			
			var fileUpload_1 = new cpr.controls.FileUpload("fud1");
			container.addChild(fileUpload_1, {
				"top": "675px",
				"left": "10px",
				"width": "450px",
				"height": "133px"
			});
			
			var output_28 = new cpr.controls.Output();
			output_28.value = "fileupload";
			output_28.style.setClasses(["component-css"]);
			container.addChild(output_28, {
				"top": "644px",
				"left": "10px",
				"width": "80px",
				"height": "30px"
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
	app.title = "component";
	cpr.core.Platform.INSTANCE.register(app);
})();
