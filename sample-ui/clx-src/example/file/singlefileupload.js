
// fileIndex의 rowId를 설정합니다.
var rowId = 1;

// 파일 객체들이 저장되는 공간입니다.
var fileStorage = {};

/**
 * fileIndex 값을 설정합니다.
 * @return rowId
 * */
function newFileIndex() {
	return "" + (rowId++);
}

/**
 * 바인딩 된 context의 rowIndex를 반환합니다.
 * @return 바인딩 context의 rowIndex
 * */
function getContextRowIndex() {
	var freeform = app.lookup("freeform");
	// 바인드 문맥을 반환합니다.
	var context = freeform.getBindContext();
	return context.rowIndex;
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var subList = app.lookup("sub_list");
	subList.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_listSubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	// 그리드 컨트롤을 다시 그립니다.
	app.lookup("grd1").redraw();
	
	var freeform = app.lookup("freeform");
	// 바인드 문맥을 설정합니다.
	// 선택된 Row가 없을 경우 -1을 반환합니다.
	freeform.setBindContext(new cpr.bind.DataRowContext(app.lookup("ds_main"), -1));
	
	// rowId, fileStorage를 초기화합니다.
	rowId = 1;
	fileStorage = {};
}

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 모든 데이터셋 정보를 제거합니다.
	app.lookup("ds_main").clear();
	
	// onSub_listSubmitSuccess Function을 호출합니다.
	onSub_listSubmitSuccess();
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트입니다.
 */
function onGrd1SelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	var rowIndex = -1;
	// 현재 선택된 row index 배열을 반환합니다.
	var indices = grd1.getSelectedRowIndices();
	if(indices.length > 0) {
		rowIndex = indices[0];
	}
	
	var freeform = app.lookup("freeform");
	// 바인드 문맥을 설정합니다.
	// freeform에 그리드의 선택된 row가 바인딩 됩니다.
	freeform.setBindContext(new cpr.bind.DataRowContext(app.lookup("ds_main"), rowIndex));
}

/*
 * "신규" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
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
	
	var freeform = app.lookup("freeform");
	// 바인드 문맥을 설정합니다.
	// freeform에 그리드의 신규 추가된 row가 바인딩 됩니다.
	freeform.setBindContext(new cpr.bind.DataRowContext(app.lookup("ds_main"), rowIndex));
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
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
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 바인딩 된 context의 rowIndex를 반환합니다.
	var contextRowIndex = getContextRowIndex();
	var dsMain = app.lookup("ds_main");
	
	// rowIndex와 "column5"에 해당하는 원본 데이터를 반환합니다.
	var originValue = dsMain.getOriginalValue(rowIndex, "column5");
	
	// 해당 row index의 Row객체를 반환합니다.
	var row = dsMain.getRow(contextRowIndex);
	
	// 현재 row의 "rowIndex" 속성값을 반환합니다.
	var rowIndex = row.getAttr("rowIndex");
	if(rowIndex != null) {
		// rowIndex에 해당하는 파일 객체 속성을 제거합니다.
		delete fileStorage[rowIndex];
	}
	
	var fin = app.lookup("fin");
	// 파일인풋에서 value를 지웁니다.
	fin.file = null;
	fin.value = originValue;

}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFinValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fin = e.control;
	
	// 선택된 파일을 반환합니다.
	var fileObj = fin.file;
	
	// 바인딩 된 context의 rowIndex를 반환합니다.
	var rowIndex = getContextRowIndex();
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
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
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
		
		// 현재 row의 "fileIndex" 속성값을 반환합니다.
		var fileIndex = row.getAttr("fileIndex");
		if(fileIndex != null) {
			
			// 컬럼명 "file_key" 해당하는 값을 반환합니다.
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
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_listSubmitError(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sub_list = e.control;
	
	alert(e);
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
 * "download" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	var pk = app.lookup("ipb1").value;

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
