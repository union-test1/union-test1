// report
var start = null;
var received = null;
var rendered = null;

//공통 Util
var comUtil = createComUtil(app);

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn_searchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn_search = e.control;
	
	app.lookup("sms_list").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms_listSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_list = e.control;
	
	//선택한 컬럼 수만큼 그리드의 컬럼 수를 추가한다.
	addColumn();
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
		rendered = new Date().getTime();
//		alert("received : " + (received - start) + "\nrender : " + (rendered - received));
	});
}

//그리드 컬럼 추가
function addColumn(){
	var grd = app.lookup("grd");
	var ds_list = app.lookup("ds_list");
	
	//그리드 컬럼을 추가하기 위해 데이터셋의 컬럼명을 가지고 온다.
	var columnNames = ds_list.getColumnNames();
	var col_length = columnNames.length;
	
	//그리드 컬럼을 그리기 위한 정보
	var col_layout = [];	//컬럼 레이아웃
	var col_header = [];	//컬럼 헤더
	var col_detail = [];	//컬럼 디테일
	
	//이전에 추가한 컬럼이 존재하고 그 수가 0이 아니라면
	//이전에 추가한 컬럼을 삭제해준다.
	var before_col = grd.header.cellCount;
	if(before_col && before_col != 0){
		for(var i = before_col ; i >=0 ; i--) {
			grd.deleteColumn(i + 1);
		}
	}
	
	//추가할 컬럼의 수만큼
	for(var j = 0 ; j < col_length ; j ++){
		
		(function(data) {
			/* <컬럼 레이아웃> */
			col_layout[j] = {
				"width" : "100px"
			};
			
			/* <컬럼 헤더 정보>
			 colIndex는 index 정보가 있는 그리드의 첫 번째 컬럼을 다음부터 추가된다. : (i + 1)
			 text는 데이터셋의 컬럼명으로 구성한다. 
			 */
			col_header[j] = {
				"constraint" : {
					"rowIndex" : 0,
					"colIndex" : (j+1)
				},
				"configurator": function(cell) {
					cell.style.css({"text-align":"center"})
					cell.text = data
				}
					
			};
			
			/* <컬럼 디테일 정보 > 컬럼 헤더 정보와 동일*/
			col_detail[j] = {
				"constraint" : {
					"rowIndex" : 0,
					"colIndex" : (j+1)
				},
				"configurator": function(cell) {
					cell.style.css({"text-align":"center"});
					cell.columnName = data;
				}
			};
		})(columnNames[j]);
		
		
	}

	/* 위에서 구성한 컬럼 정보로 그리드에 컬럼을 추가한다 */
	grd.addColumn({
		"columnLayout" : col_layout,
		"header" : col_header,
		"detail" : col_detail
	});
	
	grd.redraw();
}

/* ---------------------- CSV 다운로드 ------------------------ */
/*
 * "CSV 다운로드" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn_csvClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn_csv = e.control;
	
	var fileName = "grid.csv";
	excelExport("grd", fileName);
}

//CSV EXPORT
function excelExport(gridId, fileName){
	
	//파일명에 "."이 포함되어 있지 않다면 ".xlsx"를 확장자로 설정해준다.
	if (fileName.indexOf(".") == -1) {
		fileName += ".xlsx";
	}
	
	//서브미션 생성
	var submission = new cpr.protocols.Submission("sub_excelExport");
	//전송할 url 설정
	submission.action = "/export/" + fileName;
	//mediaType 설정
	submission.mediaType = "application/json";
	//response data의 type 설정
	submission.responseType = "blob";

	// grid export data 가져오기
	/** 
	 * @type cpr.controls.Grid
	 */
	var grid = app.lookup(gridId);
	//그리드의 스타일을 제외하지 않은 채 그리드의 데이터를 JSON 형식으로 반환합니다.
	var exportData = grid.getExportData(false);

	// // 스타일 설정을 위한 로직 추가
	if (exportData != null) {
		var headerStyle = {
			"background-color" : "#f2f2f2",
			"border-top-color" : "#b4b8c4",
			"border-bottom-color" : "#b4b8c4",
			"border-left-color" : "#b4b8c4",
			"border-right-color" : "#b4b8c4",
			"border-top-style" : "solid",
			"border-bottom-style" : "solid",
			"border-left-style" : "solid",
			"border-right-style" : "solid"
		};
		var detailStyle = {
			"border-top-color" : "#b4b8c4",
			"border-bottom-color" : "#b4b8c4",
			"border-left-color" : "#b4b8c4",
			"border-right-color" : "#b4b8c4",
			"border-top-style" : "solid",
			"border-bottom-style" : "solid",
			"border-left-style" : "solid",
			"border-right-style" : "solid"
		};
		var rowgroups = exportData["rowgroups"];
		var rgLength = rowgroups.length;
		var region = null;
		var styles = null;
		var style = null;
		var columnLength = 0;

		for (var i = 0; i < rgLength; i++) {
			region = rowgroups[i]["region"];
			styles = [].concat(rowgroups[i]["style"]);

			if (region == "header" || region == "footer" || region == "gheader" || region == "gfooter") {
				columnLength = styles.length;
				for (var j = 0; j < columnLength; j++) {
					style = _.extend({}, headerStyle, styles[j]["style"]);
					styles[j]["style"] = style;
				}
			} else {
				columnLength = styles.length;
				for (var k = 0; k < columnLength; k++) {
					style = _.extend({}, detailStyle, styles[k]["style"]);
					styles[k]["style"] = style;
				}
			}
			rowgroups[i]["style"] = styles;
		}
	}

	submission.setRequestObject(exportData);

	// success listener
	var successListener = function(e) {
		// 정상적으로 처리되었습니다.
		alert("정상적으로 처리되었습니다.");
	};
	submission.addEventListener("submit-success", successListener);

	submission.addEventListenerOnce("submit-done", function(e) {
		// done에서 팝업 화면을 닫을 경우, loadMask 를 찾지 못해 오류 발생하여 순서변경
		submission.removeEventListener("submit-success", successListener);

		submission.removeAllParameters();
	});

	submission.send();
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms_listBeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_list = e.control;

	start = new Date().getTime();
}

/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onSms_listReceive(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_list = e.control;
	
	received = new Date().getTime();
}
