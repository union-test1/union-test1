/*
 * App URI: template/layout/grid/md_freeformgrid
 * Source Location: template/layout/grid/md_freeformgrid.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("template/layout/grid/md_freeformgrid", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			// 공통 Util
			var comUtil = createComUtil(app);
			
			/*
			 * Body에서 init 이벤트 발생 시 호출. 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(/* cpr.events.CEvent */e) {
				// 최초 신규 입력상태로 시작
				var mstList = app.lookup("mstList");
				mstList.insertRow(0, true);
			
				var grp_frm1 = app.lookup("grp_frm1");
				grp_frm1.redraw();
			}
			
			/*
			 * "신규" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick3(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 디테일 입력부 초기화
				clearSubDetail();
			
				// 첫번째 컬럼에 포커스
				app.focus("ipdFrm2Column2");
			}
			
			/*
			 * "수정" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick4(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				// 자동 입력
				doApply();
			}
			
			/*
			 * 그리드 데이터 수정 Function
			 */
			function doApply() {
				// 디테일 입력부 데이터
				var valid = comUtil.validate("grp_frm2");
				if (valid == false) {
					return;
				}
				var subDetail = app.lookup("subDetail");
				if (subDetail.isModified() == false) {
					comUtil.alert("데이터가 수정되지 않았습니다.");
					return;
				}
				var detailData = subDetail.getRowData(0);
			
				// 메인 목록에 값 복사
				var grdMain = app.lookup("grdMain");
				var rowIndex = grdMain.getSelectedRowIndex();
				var grdRow = null;
				if (rowIndex == -1) { // 신규
					grdRow = grdMain.insertRow(grdMain.rowCount, true);
				} else {
					grdRow = grdMain.getRow(rowIndex);
				}
				grdRow.setRowData(detailData);
				grdMain.redraw();
			
				// 디테일 입력부 초기화
				clearSubDetail();
			}
			
			/*
			 * "삭제" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick5(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 그리드 선택된 row 삭제
				comUtil.deleteGridRow("grdMain");
				// 디테일 입력부 초기화
				clearSubDetail();
			}
			
			/*
			 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick6(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				// 그리드 선택된 row undo
				var rowIndex = comUtil.revertGridRow("grdMain");
				// 디테일 입력부 초기화
				clearSubDetail();
			}
			
			/*
			 * 디테일 입력부 초기화 Function
			 */
			function clearSubDetail() {
				// 그리드 선택 초기화
				var grdMain = app.lookup("grdMain");
				grdMain.clearSelection();
				grdMain.redraw();
			
				// 디테일 입력부 초기화
				var subDetail = app.lookup("subDetail");
				subDetail.clear();
				subDetail.addRow();
				app.lookup("grp_frm2").redraw();
			}
			
			/*
			 * 그리드에서 before-selection-change 이벤트 발생 시 호출. detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택되기 전에 발생하는 이벤트입니다.
			 */
			function onGrdMainBeforeSelectionChange(/* cpr.events.CSelectionEvent */e) {
				/**
				 * @type cpr.controls.Grid
				 */
				var grdMain = e.control;
				// 새로운 row가 선택되기 이전의 row.
				var oldSelection = e.oldSelection;
			
				// 이전 선택된 row가 없으면 스킵
				if (oldSelection == null || oldSelection.length == 0) {
					return;
				}
			
				// 초기화버튼 클릭했을 경우 clear로 인해 Selection-change 발생함으로 이후 코드부분 실행되지 않게함.
				if(grdMain.getSelectedRow() == null){
					return;
				}
			
				// 이전 선택된 row가 삭제된 row이면 스킵
				var grdRow = grdMain.getRow(oldSelection[0]);
				if (grdRow.getStateString().indexOf("D") != -1) {
					return;
				}
			
				// 입력부의 Validation
				var isValid = comUtil.validate("grp_frm2");
				if (isValid == false) {
					// 변경이 유효하지 않을 경우 진행 중지
					e.preventDefault();
				}
			}
			
			/*
			 * 그리드에서 selection-change 이벤트 발생 시 호출. detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트입니다.
			 */
			function onGrdMainSelectionChange(/* cpr.events.CSelectionEvent */e) {
				/**
				 * @type cpr.controls.Grid
				 */
				var grdMain = e.control;
			
				// 현재 선택된 row의 index
				var grdRow = grdMain.getSelectedRow();
				if (grdRow == null) {
					return;
				}
				var rowData = grdRow.getRowData();
			
				// 그리드의 선택된 RowIndex를 입력부에 반영
				var subDetail = app.lookup("subDetail");
				subDetail.build([ rowData ]);
			
				var grp_frm2 = app.lookup("grp_frm2");
				grp_frm2.redraw();
			}
			
			/*
			 * "Export" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick8(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// Excel Export
				comUtil.exportExcel("grdMain", "마스터-디테일 (프리폼-그리드)");
			}
			
			/*
			 * "초기화" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 신규
				doNew();
			}
			
			/*
			 * "저장" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick7(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				// 입력부 저장
				doSave();
			}
			
			/*
			 * 메인 저장 Function
			 */
			function doSave() {
				// Validation 입력부 체크
				if (comUtil.validate("grp_frm1") == false) {
					// 검증 실패시 처리 중단
					return;
				}
			
				// 기준 데이터 복사
				var mstList = app.lookup("mstList");
				var mstRow = mstList.getRow(0);
				var mstDetail = app.lookup("mstDetail");
				mstDetail.clear();
				mstDetail.build(mstRow.getRowData());
			
				// 저장 Submission send
				comUtil.send("subSave");
			}
			
			/*
			 * "삭제" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick10(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
				// 삭제 여부 체크
				var isOk = confirm("삭제하시겠습니까?");
				if (isOk == false) {
					return;
				}
			
				// 데이터셋 상태 체크
				var resList1 = app.lookup("mstList");
				var row = resList1.getRow(0);
				var rowState = row.getStateString(true);
			
				if (rowState == "I") {
					// 신규 상태에서는 다시 신규상태로
					doNew();
				} else {
					resList1.deleteRow(0);
					var resList2 = app.lookup("subList");
					resList2.setRowStateAll(cpr.data.tabledata.RowState.DELETED);
					// 저장
					doSave();
				}
			}
			
			/*
			 * 신규로 입력 Function
			 */
			function doNew() {
				/** 화면 초기화 */
				// 검색 조건 초기화
				var reqKey = app.lookup("reqKey");
				reqKey.reset();
			
				var grp_search_cond = app.lookup("grp_search_cond");
				grp_search_cond.redraw();
			
				// 마스터 데이터 초기화
				var resList1 = app.lookup("mstList");
				resList1.clear();
				resList1.insertRow(0, true);
			
				var grp_frm1 = app.lookup("grp_frm1");
				grp_frm1.redraw();
			
				// 목록 초기화
				var resList2 = app.lookup("subList");
				resList2.clear();
				var grdMain = app.lookup("grdMain");
				grdMain.redraw();
			
				// 입력부2 초기화
				var subDetail = app.lookup("subDetail");
				subDetail.clear();
			
				var grp_frm2 = app.lookup("grp_frm2");
				grp_frm2.redraw();
			}
			
			/*
			 * "검색" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(/* cpr.events.CMouseEvent */e) {
				/**
				 * @type cpr.controls.Button
				 */
				var button = e.control;
			
				// 화면 조회
				doSearch();
			}
			
			/*
			 * 화면 검색 Function
			 */
			function doSearch() {
				// validation 검색 조건 입력 검증.
				var isValid = comUtil.validate("grp_search_cond");
				if (isValid == false) {
					return;
				}
			
				// 조회 Submission send
				comUtil.send("subMainList");
			}
			
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
			 */
			function onSubMainListSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
				/**
				 * @type cpr.protocols.Submission
				 */
				var subMainList = e.control;
			
				// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
				var message = subMainList.getMetadata("msg");
				if (message) {
					comUtil.alert(message);
				}
			
				// 입력 Freeform을 redraw()
				var resList1 = app.lookup("mstList");
				// 조회된 결과가 없을 경우 신규로우를 하나 생성하고 신규상태로
				if (resList1.getRowCount() == 0) {
					resList1.insertRow(0, true);
				}
				var grp_frm1 = app.lookup("grp_frm1");
				grp_frm1.redraw();
			
				// 메인 Grid를 redraw
				clearSubDetail();
			}
			
			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출. 통신이 성공하면 발생합니다.
			 */
			function onSubSaveSubmitSuccess(/* cpr.events.CSubmissionEvent */e) {
				/**
				 * @type cpr.protocols.Submission
				 */
				var subSave = e.control;
			
				// 서버로부터 전달된 메시지가 있을 경우 메시지를 출력
				var message = subSave.getMetadata("msg");
				if (message) {
					comUtil.alert(message);
				}
				;
			
				// 화면 재조회
				doSearch();
			}
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrp_frm2Keydown(/* cpr.events.CKeyboardEvent */e) {
				/**
				 * @type cpr.controls.Container
				 */
				var grp_frm2 = e.control;
			
				// 입력부에서 Enter Key가 입력되면 자동입력
				if (e.keyCode == cpr.events.KeyCode.ENTER) {
					// 자동입력
					doApply();
			
					app.focus("ipdFrm2Column2");
				}
			}
			
			/*
			 * 그룹에서 keydown 이벤트 발생 시 호출. 사용자가 키를 누를 때 발생하는 이벤트.
			 */
			function onGrp_search_condKeydown(/* cpr.events.CKeyboardEvent */e) {
				/**
				 * @type cpr.controls.Container
				 */
				var grp_search_cond = e.control;
				// 검색부에서 enter key가 입력되면 자동 조회
				if (e.keyCode == cpr.events.KeyCode.ENTER) {
					// 화면 조회
					doSearch();
				}
			}
			
			/*
			 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
			 */
			function onIpdColumn1Search(/* cpr.events.CUIEvent */e) {
				/**
				 * @type udc.search.search_type1
				 */
				// 인풋박스 초기화
				var ipdColumn1 = e.control;
				var initValue = ipdColumn1.value;
			//	ipdColumn1.value = "";
				// 팝업창 추가
				var _app = app;
				cpr.core.App.load("template/layout/popup/popup01", function(app) {
					var dialog = new cpr.controls.Dialog(app);
					// 다이얼로그 설정
					dialog.headerTitle = "popup01";
					dialog.headerVisible = true;
					dialog.headerClose = true;
					// 다이얼로그 위치 지정
					dialog.style.css({
						top : "calc(50% - 300px)",
						left : "calc(50% - 400px)",
						width : "800px",
						height : "600px",
						backgroundColor : "white"
					});
					
					if(initValue){
						dialog.initValue = initValue;
					}
					
					// 다이얼로그 close 시 발생하는 이벤트 handler
					dialog.addEventListener("close", function(e) {
						// 종료 시 반환되는 returnValue를 설정
						var returnValue = dialog.returnValue;
						if (returnValue == null) {
							return;
						}
						ipdColumn1.value = returnValue.column1;
					});
			
					// app에 다이얼로그 추가
					_app.getContainer().addChild(dialog);
				});
			};
			// End - User Script
			
			// Header
			app.declareBindableAppProperty("title", null);
			var dataSet_1 = new cpr.data.DataSet("mstList");
			dataSet_1.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("subList");
			dataSet_2.parseData({
				"columns" : [
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("subDetail");
			dataSet_3.parseData({
				"columns" : [
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataSet_3);
			var dataMap_1 = new cpr.data.DataMap("reqKey");
			dataMap_1.parseData({
				"columns" : [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("mstDetail");
			dataMap_2.parseData({
				"alterColumnLayout": "client",
				"columns": [
					{"name": "column1"},
					{"name": "column2"},
					{"name": "column3"},
					{"name": "column4"},
					{"name": "column5"},
					{"name": "column6"},
					{"name": "column7"},
					{"name": "column8"},
					{"name": "column9"},
					{"name": "column10"}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("subMainList");
			submission_1.action = "../template/md_freeformgrid/getMainList.do";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			submission_1.addResponseData(dataSet_2, false);
			if(typeof onSubMainListSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubMainListSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subSave");
			submission_2.action = "../template/md_freeformgrid/save.do";
			submission_2.addRequestData(dataSet_1);
			submission_2.addRequestData(dataSet_2);
			submission_2.addRequestData(dataMap_2);
			if(typeof onSubSaveSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSubSaveSubmitSuccess);
			}
			app.register(submission_2);
			
			app.supportMedia("all and (min-width: 1024px)", "main");
			app.supportMedia("all and (max-width: 1023px)", "default");
			
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
			var userDefinedControl_1 = new udc.pagetitle();
			userDefinedControl_1.bind("title").toAppProperty("title");
			container.addChild(userDefinedControl_1, {
				"top": "10px",
				"right": "10px",
				"left": "10px",
				"height": "24px"
			});
			
			var group_1 = new cpr.controls.Container();
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.setColumns(["1fr", "1fr"]);
			formLayout_1.setRows(["40px", "160px", "25px", "1fr", "40px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container("grp_frm1");
				group_2.style.setClasses(["grp-freeform"]);
				var dataRowContext_1 = new cpr.bind.DataRowContext(app.lookup("mstList"), 0);
				group_2.setBindContext(dataRowContext_1);
				// Layout
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.horizontalSeparatorClass = "frm-hseparator";
				formLayout_2.horizontalSeparatorWidth = 1;
				formLayout_2.verticalSeparatorClass = "frm-vseparator";
				formLayout_2.verticalSeparatorWidth = 1;
				formLayout_2.setColumns(["70px", "1fr", "70px", "1fr"]);
				formLayout_2.setRows(["1fr", "1fr", "1fr", "1fr", "1fr"]);
				group_2.setLayout(formLayout_2);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "column1";
					output_1.style.setClasses(["ctl-header"]);
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "column3";
					output_2.style.setClasses(["ctl-header"]);
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var output_3 = new cpr.controls.Output();
					output_3.value = "column5";
					output_3.style.setClasses(["ctl-header"]);
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var output_4 = new cpr.controls.Output();
					output_4.value = "column7";
					output_4.style.setClasses(["ctl-header"]);
					container.addChild(output_4, {
						"colIndex": 0,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var output_5 = new cpr.controls.Output();
					output_5.value = "column9";
					output_5.style.setClasses(["ctl-header"]);
					container.addChild(output_5, {
						"colIndex": 0,
						"rowIndex": 4,
						"verticalAlign": "center"
					});
					var output_6 = new cpr.controls.Output();
					output_6.value = "column10";
					output_6.style.setClasses(["ctl-header"]);
					container.addChild(output_6, {
						"colIndex": 2,
						"rowIndex": 4,
						"verticalAlign": "center"
					});
					var output_7 = new cpr.controls.Output();
					output_7.value = "column8";
					output_7.style.setClasses(["ctl-header"]);
					container.addChild(output_7, {
						"colIndex": 2,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var output_8 = new cpr.controls.Output();
					output_8.value = "column6";
					output_8.style.setClasses(["ctl-header"]);
					container.addChild(output_8, {
						"colIndex": 2,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var output_9 = new cpr.controls.Output();
					output_9.value = "column4";
					output_9.style.setClasses(["ctl-header"]);
					container.addChild(output_9, {
						"colIndex": 2,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var output_10 = new cpr.controls.Output();
					output_10.value = "column2";
					output_10.style.setClasses(["ctl-header"]);
					container.addChild(output_10, {
						"colIndex": 2,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var inputBox_1 = new cpr.controls.InputBox("ipdFrmColumn1");
					inputBox_1.autoSelect = true;
					inputBox_1.userAttr({
						"required": "Y",
						"name": "컬럼1"
					});
					inputBox_1.style.setClasses(["required"]);
					inputBox_1.bind("value").toDataColumn("column1");
					inputBox_1.bind("enabled").toExpression("getStateString() *= \"I\"");
					container.addChild(inputBox_1, {
						"colIndex": 1,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var inputBox_2 = new cpr.controls.InputBox("ipb11");
					inputBox_2.autoSelect = true;
					inputBox_2.bind("value").toDataColumn("column2");
					container.addChild(inputBox_2, {
						"colIndex": 3,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var inputBox_3 = new cpr.controls.InputBox("ipb12");
					inputBox_3.autoSelect = true;
					inputBox_3.bind("value").toDataColumn("column3");
					container.addChild(inputBox_3, {
						"colIndex": 1,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var inputBox_4 = new cpr.controls.InputBox("ipb13");
					inputBox_4.autoSelect = true;
					inputBox_4.bind("value").toDataColumn("column4");
					container.addChild(inputBox_4, {
						"colIndex": 3,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var inputBox_5 = new cpr.controls.InputBox("ipb14");
					inputBox_5.autoSelect = true;
					inputBox_5.bind("value").toDataColumn("column5");
					container.addChild(inputBox_5, {
						"colIndex": 1,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var inputBox_6 = new cpr.controls.InputBox("ipb15");
					inputBox_6.autoSelect = true;
					inputBox_6.bind("value").toDataColumn("column6");
					container.addChild(inputBox_6, {
						"colIndex": 3,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var inputBox_7 = new cpr.controls.InputBox("ipb16");
					inputBox_7.autoSelect = true;
					inputBox_7.bind("value").toDataColumn("column7");
					container.addChild(inputBox_7, {
						"colIndex": 1,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var inputBox_8 = new cpr.controls.InputBox("ipb17");
					inputBox_8.autoSelect = true;
					inputBox_8.bind("value").toDataColumn("column8");
					container.addChild(inputBox_8, {
						"colIndex": 3,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var inputBox_9 = new cpr.controls.InputBox("ipb18");
					inputBox_9.autoSelect = true;
					inputBox_9.bind("value").toDataColumn("column9");
					container.addChild(inputBox_9, {
						"colIndex": 1,
						"rowIndex": 4,
						"verticalAlign": "center"
					});
					var inputBox_10 = new cpr.controls.InputBox("ipb19");
					inputBox_10.autoSelect = true;
					inputBox_10.bind("value").toDataColumn("column10");
					container.addChild(inputBox_10, {
						"colIndex": 3,
						"rowIndex": 4,
						"verticalAlign": "center"
					});
				})(group_2);
				container.addChild(group_2, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var group_3 = new cpr.controls.Container("grp_frm2");
				group_3.style.setClasses(["grp-freeform"]);
				var dataRowContext_2 = new cpr.bind.DataRowContext(app.lookup("subDetail"), 0);
				group_3.setBindContext(dataRowContext_2);
				// Layout
				var formLayout_3 = new cpr.controls.layouts.FormLayout();
				formLayout_3.horizontalSeparatorClass = "frm-hseparator";
				formLayout_3.horizontalSeparatorWidth = 1;
				formLayout_3.verticalSeparatorClass = "frm-vseparator";
				formLayout_3.verticalSeparatorWidth = 1;
				formLayout_3.setColumns(["70px", "1fr", "70px", "1fr"]);
				formLayout_3.setRows(["1fr", "1fr", "1fr", "1fr", "1fr"]);
				group_3.setLayout(formLayout_3);
				(function(container){
					var output_11 = new cpr.controls.Output();
					output_11.value = "column2";
					output_11.style.setClasses(["ctl-header"]);
					container.addChild(output_11, {
						"colIndex": 0,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var output_12 = new cpr.controls.Output();
					output_12.value = "column4";
					output_12.style.setClasses(["ctl-header"]);
					container.addChild(output_12, {
						"colIndex": 0,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var output_13 = new cpr.controls.Output();
					output_13.value = "column6";
					output_13.style.setClasses(["ctl-header"]);
					container.addChild(output_13, {
						"colIndex": 0,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var output_14 = new cpr.controls.Output();
					output_14.value = "column8";
					output_14.style.setClasses(["ctl-header"]);
					container.addChild(output_14, {
						"colIndex": 0,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var output_15 = new cpr.controls.Output();
					output_15.value = "column10";
					output_15.style.setClasses(["ctl-header"]);
					container.addChild(output_15, {
						"colIndex": 0,
						"rowIndex": 4,
						"verticalAlign": "center"
					});
					var output_16 = new cpr.controls.Output();
					output_16.value = "column9";
					output_16.style.setClasses(["ctl-header"]);
					container.addChild(output_16, {
						"colIndex": 2,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var output_17 = new cpr.controls.Output();
					output_17.value = "column7";
					output_17.style.setClasses(["ctl-header"]);
					container.addChild(output_17, {
						"colIndex": 2,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var output_18 = new cpr.controls.Output();
					output_18.value = "column5";
					output_18.style.setClasses(["ctl-header"]);
					container.addChild(output_18, {
						"colIndex": 2,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var output_19 = new cpr.controls.Output();
					output_19.value = "column3";
					output_19.style.setClasses(["ctl-header"]);
					container.addChild(output_19, {
						"colIndex": 2,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var inputBox_11 = new cpr.controls.InputBox("ipdFrm2Column2");
					inputBox_11.autoSelect = true;
					inputBox_11.userAttr({
						"required": "Y",
						"name": "column1"
					});
					inputBox_11.bind("value").toDataColumn("column2");
					container.addChild(inputBox_11, {
						"colIndex": 1,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var inputBox_12 = new cpr.controls.InputBox("ipb21");
					inputBox_12.autoSelect = true;
					inputBox_12.bind("value").toDataColumn("column3");
					container.addChild(inputBox_12, {
						"colIndex": 3,
						"rowIndex": 0,
						"verticalAlign": "center"
					});
					var inputBox_13 = new cpr.controls.InputBox("ipb22");
					inputBox_13.autoSelect = true;
					inputBox_13.bind("value").toDataColumn("column4");
					container.addChild(inputBox_13, {
						"colIndex": 1,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var inputBox_14 = new cpr.controls.InputBox("ipb23");
					inputBox_14.autoSelect = true;
					inputBox_14.bind("value").toDataColumn("column5");
					container.addChild(inputBox_14, {
						"colIndex": 3,
						"rowIndex": 1,
						"verticalAlign": "center"
					});
					var inputBox_15 = new cpr.controls.InputBox("ipb24");
					inputBox_15.autoSelect = true;
					inputBox_15.bind("value").toDataColumn("column6");
					container.addChild(inputBox_15, {
						"colIndex": 1,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var inputBox_16 = new cpr.controls.InputBox("ipb25");
					inputBox_16.autoSelect = true;
					inputBox_16.bind("value").toDataColumn("column7");
					container.addChild(inputBox_16, {
						"colIndex": 3,
						"rowIndex": 2,
						"verticalAlign": "center"
					});
					var inputBox_17 = new cpr.controls.InputBox("ipb26");
					inputBox_17.autoSelect = true;
					inputBox_17.bind("value").toDataColumn("column8");
					container.addChild(inputBox_17, {
						"colIndex": 1,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var inputBox_18 = new cpr.controls.InputBox("ipb27");
					inputBox_18.autoSelect = true;
					inputBox_18.bind("value").toDataColumn("column9");
					container.addChild(inputBox_18, {
						"colIndex": 3,
						"rowIndex": 3,
						"verticalAlign": "center"
					});
					var inputBox_19 = new cpr.controls.InputBox("ipb28");
					inputBox_19.autoSelect = true;
					inputBox_19.bind("value").toDataColumn("column10");
					container.addChild(inputBox_19, {
						"colIndex": 1,
						"rowIndex": 4,
						"colSpan": 3,
						"rowSpan": 1,
						"verticalAlign": "center"
					});
				})(group_3);
				if(typeof onGrp_frm2Keydown == "function") {
					group_3.addEventListener("keydown", onGrp_frm2Keydown);
				}
				container.addChild(group_3, {
					"colIndex": 1,
					"rowIndex": 1
				});
				var group_4 = new cpr.controls.Container();
				// Layout
				var formLayout_4 = new cpr.controls.layouts.FormLayout();
				formLayout_4.setColumns(["1fr", "90px", "90px", "90px", "90px"]);
				formLayout_4.setRows(["1fr"]);
				group_4.setLayout(formLayout_4);
				(function(container){
					var button_1 = new cpr.controls.Button();
					button_1.value = "신규";
					if(typeof onButtonClick3 == "function") {
						button_1.addEventListener("click", onButtonClick3);
					}
					container.addChild(button_1, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var button_2 = new cpr.controls.Button();
					button_2.value = "수정";
					if(typeof onButtonClick4 == "function") {
						button_2.addEventListener("click", onButtonClick4);
					}
					container.addChild(button_2, {
						"colIndex": 2,
						"rowIndex": 0
					});
					var button_3 = new cpr.controls.Button();
					button_3.value = "삭제";
					if(typeof onButtonClick5 == "function") {
						button_3.addEventListener("click", onButtonClick5);
					}
					container.addChild(button_3, {
						"colIndex": 3,
						"rowIndex": 0
					});
					var button_4 = new cpr.controls.Button();
					button_4.value = "초기화";
					if(typeof onButtonClick6 == "function") {
						button_4.addEventListener("click", onButtonClick6);
					}
					container.addChild(button_4, {
						"colIndex": 4,
						"rowIndex": 0
					});
				})(group_4);
				container.addChild(group_4, {
					"colIndex": 0,
					"rowIndex": 2,
					"colSpan": 2,
					"rowSpan": 1
				});
				var grid_1 = new cpr.controls.Grid("grdMain");
				grid_1.init({
					"dataSet": app.lookup("subList"),
					"bufferedScroll": true,
					"columnMovable": true,
					"columnResizable": true,
					"noDataMessage": "조회된 데이터가 없습니다.",
					"columns": [
						{"width": "60px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"},
						{"width": "100px"}
					],
					"header": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.text = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.text = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.text = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.text = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.text = "column6";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "column7";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.text = "column8";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.text = "column9";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.text = "column10";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
						"cells": [
							{
								"constraint": {"rowIndex": 0, "colIndex": 1},
								"configurator": function(cell){
									cell.columnName = "column2";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "column3";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "column4";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "column5";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "column6";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.columnName = "column7";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 7},
								"configurator": function(cell){
									cell.columnName = "column8";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 8},
								"configurator": function(cell){
									cell.columnName = "column9";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 9},
								"configurator": function(cell){
									cell.columnName = "column10";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 0},
								"configurator": function(cell){
									cell.columnType = "rowindex";
									cell.style.css({
										"text-align" : "center"
									});
								}
							}
						]
					}
				});
				if(typeof onGrdMainBeforeSelectionChange == "function") {
					grid_1.addEventListener("before-selection-change", onGrdMainBeforeSelectionChange);
				}
				if(typeof onGrdMainSelectionChange == "function") {
					grid_1.addEventListener("selection-change", onGrdMainSelectionChange);
				}
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 3,
					"colSpan": 2,
					"rowSpan": 1
				});
				var group_5 = new cpr.controls.Container();
				group_5.style.setClasses(["grp-buttons"]);
				// Layout
				var formLayout_5 = new cpr.controls.layouts.FormLayout();
				formLayout_5.setColumns(["1fr", "90px", "90px", "90px", "90px"]);
				formLayout_5.setRows(["1fr"]);
				group_5.setLayout(formLayout_5);
				(function(container){
					var button_5 = new cpr.controls.Button();
					button_5.value = "Export";
					button_5.style.setClasses(["cl-button-box"]);
					if(typeof onButtonClick8 == "function") {
						button_5.addEventListener("click", onButtonClick8);
					}
					container.addChild(button_5, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var button_6 = new cpr.controls.Button();
					button_6.value = "초기화";
					if(typeof onButtonClick == "function") {
						button_6.addEventListener("click", onButtonClick);
					}
					container.addChild(button_6, {
						"colIndex": 2,
						"rowIndex": 0
					});
					var button_7 = new cpr.controls.Button();
					button_7.value = "저장";
					button_7.style.setClasses(["cl-button-box"]);
					if(typeof onButtonClick7 == "function") {
						button_7.addEventListener("click", onButtonClick7);
					}
					container.addChild(button_7, {
						"colIndex": 3,
						"rowIndex": 0,
						"horizontalAlign": "fill",
						"verticalAlign": "fill"
					});
					var button_8 = new cpr.controls.Button();
					button_8.value = "삭제";
					if(typeof onButtonClick10 == "function") {
						button_8.addEventListener("click", onButtonClick10);
					}
					container.addChild(button_8, {
						"colIndex": 4,
						"rowIndex": 0
					});
				})(group_5);
				container.addChild(group_5, {
					"colIndex": 0,
					"rowIndex": 4,
					"colSpan": 2,
					"rowSpan": 1
				});
				var group_6 = new cpr.controls.Container("grp_search_cond");
				group_6.style.setClasses(["grp-search"]);
				var dataMapContext_1 = new cpr.bind.DataMapContext(app.lookup("reqKey"));
				group_6.setBindContext(dataMapContext_1);
				// Layout
				var formLayout_6 = new cpr.controls.layouts.FormLayout();
				formLayout_6.setColumns(["100px", "150px", "1fr", "90px"]);
				formLayout_6.setRows(["1fr"]);
				group_6.setLayout(formLayout_6);
				(function(container){
					var output_20 = new cpr.controls.Output();
					output_20.value = "column1";
					container.addChild(output_20, {
						"colIndex": 0,
						"rowIndex": 0,
						"horizontalAlign": "fill",
						"verticalAlign": "fill"
					});
					var userDefinedControl_2 = new udc.search.search_type1("ipdColumn1");
					userDefinedControl_2.required = "required";
					userDefinedControl_2.userAttr({
						"required": "Y",
						"name": "컬럼1"
					});
					userDefinedControl_2.bind("value").toDataColumn("column1");
					if(typeof onIpdColumn1Search == "function") {
						userDefinedControl_2.addEventListener("search", onIpdColumn1Search);
					}
					container.addChild(userDefinedControl_2, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var button_9 = new cpr.controls.Button();
					button_9.value = "검색";
					if(typeof onButtonClick2 == "function") {
						button_9.addEventListener("click", onButtonClick2);
					}
					container.addChild(button_9, {
						"colIndex": 3,
						"rowIndex": 0,
						"verticalAlign": "fill"
					});
				})(group_6);
				if(typeof onGrp_search_condKeydown == "function") {
					group_6.addEventListener("keydown", onGrp_search_condKeydown);
				}
				container.addChild(group_6, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 2,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "44px",
				"right": "10px",
				"bottom": "10px",
				"left": "10px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "md_freeformgrid";
	cpr.core.Platform.INSTANCE.register(app);
})();