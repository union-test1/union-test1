
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
}
