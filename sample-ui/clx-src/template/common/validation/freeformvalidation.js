//공통 Util
var comUtil = createComUtil(app);

/*
 * "초기화" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){

	var dm = app.lookup("dm1");
	dm.clear();
	
	app.lookup("freeform").redraw();
	
}

/*
 * "검증" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 프리폼 alidation을 실행
	var valid = comUtil.validate("freeform");
	if(valid == true) {
		comUtil.alert("검증을 통과하였습니다.");
	}
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb5ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb5 = e.control;

	// 컨트롤의 입력 값을 보정합니다.
	comUtil.revise(ipb5);
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpb3ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipb3 = e.control;
	
	// 컨트롤의 입력 값을 보정합니다.
	comUtil.revise(ipb3);
}
