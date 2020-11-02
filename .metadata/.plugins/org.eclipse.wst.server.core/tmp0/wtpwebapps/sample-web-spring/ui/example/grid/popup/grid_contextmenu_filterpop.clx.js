/*
 * App URI: example/grid/popup/grid_contextmenu_filterpop
 * Source Location: example/grid/popup/grid_contextmenu_filterpop.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/grid/popup/grid_contextmenu_filterpop", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			
			// "+"버튼 클릭 수 입니다.
			var con_ipb_No = 1;
			
			/*
			 * Body에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(/* cpr.events.CEvent */ e){
				
				// 임베디드 앱의 "initValue"속성을 반환합니다.
				var initValue = app.getHostProperty("initValue");
				var ds_colheaders = app.lookup("ds_colheaders");
				
				for(var i=0; i<initValue.length; i++){
					// rowData(key: header명, value: value를 갖는 json data)를 입력받아 신규 row를 추가합니다.
					ds_colheaders.addRowData({
						label: initValue[i],
						value: initValue[i]
					});
				}
			}
			
			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				app.lookup("udc0").column_dataset = app.lookup("ds_colheaders");
			}
			
			/*
			 * "적용" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */ e){
			
				var grp_content = app.lookup("grp_content");
				
				// 그룹의 하위 전체 컨트롤들을 반환합니다.
				var children = grp_content.getChildren();
				var count = children.length;
				var conditions = "";
				var condition = null;
				
				for (var i = 0; i< count; i++) {
					// 컨트롤을 구분할 수 있는 컨트롤 고유의 Type
					if (children[i].type == "udc.grid.grid_filter") {
						
						// UDC 함수 호출
						condition = children[i].getCondition();
						if (condition.trim() != "") {
							conditions += condition + " ";
						}
					}
				}
				
				// 임베디드 앱 속성명 : "returnValue", 속성값: "conditions" 으로 설정합니다.
				app.setHostProperty("returnValue", conditions);
				
				// 앱을 닫습니다.
				app.close();
			}
			
			/*
			 * "+" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				
				var grp_wrapper = app.lookup("grp_wrapper");
				var grp_content = app.lookup("grp_content");
				
				// 내부 스크롤 그룹 높이를 늘립니다.
				grp_wrapper.replaceConstraint(grp_content, {
					top: "0px",
					left: "0px",
					right: "0px",
					height: (50*con_ipb_No) +70+ "px"
				});
				
				// condition udc를 추가합니다.
				var userDefinedControl = new udc.grid.grid_filter("udc" + con_ipb_No);
				userDefinedControl.type = "udc.grid.grid_filter";
				userDefinedControl.column_dataset = app.lookup("ds_colheaders");
				grp_content.addChild(userDefinedControl, {
					"top": (50 * con_ipb_No) + 20 + "px",
					"left": "20px",
					"width": "400px",
					"height": "30px"
				});
				userDefinedControl.focus();
			
				con_ipb_No++;
			}
			
			/*
			 * "-" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn_delClick(/* cpr.events.CMouseEvent */ e){
			
				if (con_ipb_No == 1) {
					cpr.core.NotificationCenter.INSTANCE.post("notice", "삭제하실 수 없습니다.");
					return;
				}
				
				var grp_wrapper = app.lookup("grp_wrapper");
				var grp_content = app.lookup("grp_content");
				
				// 내부 스크롤 그룹 높이를 줄입니다.
				grp_wrapper.replaceConstraint(grp_content, {
					top: "0px",
					left: "0px",
					right: "0px",
					height: (50 * (con_ipb_No - 1)) + 20 + "px"
				});
				
				// condition udc를 제거합니다.
				var condition_udc = app.lookup("udc" + (con_ipb_No - 1));
				grp_content.removeChild(condition_udc, true);
			
				con_ipb_No--;
				
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds_colheaders");
			dataSet_1.parseData({
				"columns" : [
					{"name": "label"},
					{"name": "value"}
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
			var group_1 = new cpr.controls.Container("grp_wrapper");
			// Layout
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container("grp_content");
				// Layout
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var button_1 = new cpr.controls.Button("btn_add");
					button_1.value = "+";
					if(typeof onButtonClick2 == "function") {
						button_1.addEventListener("click", onButtonClick2);
					}
					container.addChild(button_1, {
						"bottom": "20px",
						"left": "470px",
						"width": "30px",
						"height": "30px"
					});
					var button_2 = new cpr.controls.Button("btn_del");
					button_2.value = "-";
					if(typeof onBtn_delClick == "function") {
						button_2.addEventListener("click", onBtn_delClick);
					}
					container.addChild(button_2, {
						"bottom": "20px",
						"left": "430px",
						"width": "30px",
						"height": "30px"
					});
					var userDefinedControl_1 = new udc.grid.grid_filter("udc0");
					userDefinedControl_1.visible_logical_operator = false;
					container.addChild(userDefinedControl_1, {
						"top": "20px",
						"left": "20px",
						"width": "400px",
						"height": "30px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "0px",
					"right": "0px",
					"left": "0px",
					"height": "70px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"right": "0px",
				"bottom": "0px",
				"left": "0px"
			});
			
			var button_3 = new cpr.controls.Button("btn_save");
			button_3.value = "적용";
			if(typeof onButtonClick == "function") {
				button_3.addEventListener("click", onButtonClick);
			}
			container.addChild(button_3, {
				"right": "20px",
				"bottom": "20px",
				"width": "60px",
				"height": "30px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "필터";
	cpr.core.Platform.INSTANCE.register(app);
})();