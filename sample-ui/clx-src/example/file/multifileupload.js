
// fileIndex의 rowId를 설정합니다.
var rowId = 1;

//파일 객체들이 저장되는 공간입니다.
var fileStorage = {};

/**
 * fileIndex 값을 설정합니다.
 * @return rowId
 * */
function newFileIndex() {
	return "" + (rowId++);
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var subList = app.lookup("sub_list");
	
	// 데이터를 전송합니다. 동일한 서브미션으로 전송 중인 경우 실행되지 않습니다.
	subList.send();
}

/*
 * "신규" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd1 = app.lookup("grd1");
	
	// 현재 선택된 row index를 반환합니다.
	// 선택된 Row가 없을 경우 -1을 반환합니다.
	var rowIndex = grd1.getSelectedRowIndex();
	if(rowIndex == -1) {
		// 선택된 Row가 없을 경우 첫번째 Row가 선택됩니다.
		rowIndex = 0;
	}
	
	// 그리드에 신규 Row를 추가합니다.
	var gridRow = grd1.insertRow(rowIndex, true);
	rowIndex = gridRow.getIndex();
	
	// row를 선택합니다.
	grd1.selectRows([rowIndex]);
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd1 = app.lookup("grd1");
	
	// 현재 선택된 row index를 반환합니다.
	var indices = grd1.getSelectedRowIndices();
	
	// Row를 삭제합니다.
	grd1.deleteRow(indices);
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var dsMain = app.lookup("ds_main");
	var subSave = app.lookup("sub_save");
	
	// UPDATED : 행이 수정된 상태
	// INSERTED : 행이 신규로 추가된 상태
	var selectState = cpr.data.tabledata.RowState.UPDATED | cpr.data.tabledata.RowState.INSERTED;
	
	// 상태 값을 갖는 row를 검색하여 row index 배열을 반환합니다.
	var rowIndexs = dsMain.getRowStatedIndices(selectState);
	rowIndexs.forEach(function(rowIndex) {
		
		// rowIndex에 해당하는 row index의 객체를 반환합니다.
		var row = dsMain.getRow(rowIndex);
		
		// fileIndex에 해당하는 파일 객체입니다.
		var fileIndex = row.getAttr("fileIndex");
		if(fileIndex != null) {
			
			// 컬럼명 "column1" 해당하는 값을 반환합니다.
			var column1 = row.getValue("column1");
			
			// fileIndex에 해당하는 파일 객체입니다.
			var file = fileStorage[fileIndex];
			if(file != null) {
				
				// 전송 시 추가로 전달되는 파라미터에 파일을 추가합니다.
				subSave.addFileParameter("f@" + column1, file);
			}
		}
	});
	
	// 데이터를 전송합니다. 이미 동일한 서브미션으로 전송 중인 경우 실행되지 않습니다.
	subSave.send();
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var dsMain = app.lookup("ds_main");
	// 모든 데이터셋 정보를 제거합니다.
	dsMain.clear();
	
	// onSub_listSubmitSuccess Function을 호출합니다.
	onSub_listSubmitSuccess();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_listSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	// 그리드 컨트롤을 다시 그립니다.
	app.lookup("grd1").redraw();
	
	// rowId, fileStorage를 초기화합니다.
	rowId = 1;
	fileStorage = {};
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFileInputValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fileInput = e.control;
	
	// 선택된 파일을 반환합니다.
	var fileObj = fileInput.file;
	var grd1 = app.lookup("grd1");
	
	// 현재 그리드에 편집모드 행의 Index를 반환합니다.
	var rowIndex = grd1.getEditRowIndex();
	var dsMain = app.lookup("ds_main");
	
	// row index의 Row객체를 반환합니다.
	var row = dsMain.getRow(rowIndex);
	
	// 현재 row의 "fileIndex" 속성값을 반환합니다.
	var fileIndex = row.getAttr("fileIndex");
	if(fileIndex == null) {
		
		// fileIndex 값을 설정합니다.
		fileIndex = newFileIndex();
		
		// "fileIndex"의 속성을 fileIndex 값으로 설정합니다.
		row.setAttr("fileIndex", fileIndex);
	}
	
	// 전역변수 fileStorage에 선택된 file 객체를  저장합니다.
	fileStorage[fileIndex] = fileObj;
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn_filedownClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn_filedown = e.control;
	
	var ds_main = app.lookup("ds_main")
	var grid = app.lookup("grd1");
	var select = grid.getSelectedRowIndices();
	var row = grid.getRow(select[0]);
	var pk = row.getValue("column1");

	if(ds_main.isModified()){
		alert("저장 후 다운로드가 가능합니다.");
		return;
	}	

	if (pk) {
		app.lookup("dm_check_file").setValue("file_key", pk);
		app.lookup("sms_check_file").send();

	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms_check_fileSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_check_file = e.control;
	
	var dmCheckFile = app.lookup("dm_check_file");
	var hasFile = dmCheckFile.getValue("has_file");
	var fileKey = dmCheckFile.getValue("file_key");
	if (hasFile == "true") {
		var sms = app.lookup("sms_download");
		sms.addParameter("prefix", "f@");
		sms.addParameter("filekey", fileKey);
		sms.send();
	}
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSms_downloadSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms_download = e.control;
	sms_download.removeAllParameters();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSub_saveSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sub_save = e.control;
	
	// 파일로 등록된 파라미터들을 모두 제거합니다.
	sub_save.removeAllFileParameters();
	
	// 직전 서브미션의 결과 서버로부터 전달받은 메타데이터의 값을 반환합니다.
	var message = sub_save.getMetadata("message");
	alert(message);
}


/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_saveSubmitError(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sub_save = e.control;
	
	alert(e);
}
