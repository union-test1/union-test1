/*공통 모듈을 사용하는 방법*/
// global 사용
var util = createUtil(app);

//exports 사용
//var util = cpr.core.Module.require("module/common2");


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//임베디드 앱으로 화면이 호출될 경우 a, b, c, d, e에 대한 initValue 값을 설정
	//즉, 임베디드 앱으로 호출되지 않으면 값이 설정되지 않는다.
	var initValue = null;
	var hostAppIns = app.getHostAppInstance();
	
	if(hostAppIns){
		initValue = app.getHostProperty("initValue");
		if(initValue != null){
			app.lookup("cbx1").value = initValue["a"];
			app.lookup("cmb1").value = initValue["b"];
			app.lookup("rdb1").value = initValue["c"];
			app.lookup("dti1").value = initValue["d"];
			app.lookup("ipb5").value = initValue["e"];
		}
	}
}


/*
 * 사용자 정의 컨트롤에서 search 이벤트 발생 시 호출.
 */
function onSearchButtonSearch(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type udc.SearchButton
	 */
	var searchButton = e.control;
	//팝업을 호출 해 initValue 값에 해당하는 값을 조회
	var empName = searchButton.value;
	
	var appId = "2-dialog/SearchPop"
	util.openModal(appId, 800, 500, function(e){
		var dialog = e.control;
		var selectedData = dialog.returnValue;
		if(selectedData == null){
			return;
		}
		
		// 선택된 행이 있을 경우 값을 세팅
		searchButton.value = selectedData["NAME"];
		app.lookup("ipb1").value = selectedData["DEPT"];
		app.lookup("ipb2").value = selectedData["SALARY"];
		app.lookup("ipb3").value = selectedData["BONUS"];
		app.lookup("ipb4").value = selectedData["TOTAL"];
	}, {
		empName : empName
	});
}


/*
 * "Message" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMsgClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMsg = e.control;
	//임베디드 앱으로 해당 화면을 호출한 app에서 callAppTest 라는 함수를 찾아 호출
	//즉, 부모의 함수를 호출
	var hostAppIns = app.getHostAppInstance();
	if(hostAppIns){
		if(hostAppIns.callAppMethod("callAppTest")){
			hostAppIns.callAppMethod("callAppTest");
		}
	}
}

/**
 * 부모 쪽에서 호출 가능한 함수
 * Emb.clx 에서 임베디드 앱이 로드될 때 해당 메소드를 호출합니다.
 */
exports.callAppTest = function(){
	alert("child's_callAppMethod");
}
