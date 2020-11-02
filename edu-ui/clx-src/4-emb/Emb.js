/*알림 메시지를 위한 설정*/
cpr.core.NotificationCenter.INSTANCE.subscribe("app-msg", this, function(msg) {
	var notifier = app.lookup("noti");
	if (msg.success == true) {
		notifier.success(msg.msg);
	} else if (msg.info == true) {
		notifier.info(msg.msg);
	} else if (msg.warning == true) {
		notifier.warning(msg.msg);
	} else if (msg.danger == true) {
		notifier.danger(msg.msg);
	} else {
		notifier.info(msg);
	}
});

/**
 * 버튼을 선택할 때 화면 전환
 * @param selectedButton 선택한 버튼 컨트롤
 */
function changePage(selectedButton){
	var emb = app.lookup("emb");
	/** @type cpr.controls.Container */
	var grpButtons = app.lookup("grpButtons");
	var buttons = grpButtons.getChildren();
	var url = selectedButton.userattr("src");
	
	emb.app = null;
	cpr.core.App.load(url, function(/* cpr.core.App*/ loadedApp){
		if(!loadedApp){
			return;
		}
		emb.app = loadedApp;
		emb.redraw();
		
		for(var i = 0; i < buttons.length; i++){
			if(selectedButton == buttons[i]){
				buttons[i].style.css("backgroundColor","SkyBlue");
			}else{
				buttons[i].style.removeStyle("backgroundColor");
			}
		}
	});
}


/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var emb = app.lookup("emb");
	emb.initValue = {
			a: true,
			b: "value1",
			c: "value3",
			d: "20180101",
			e: "e"
	};
}


/*
 * "Grid" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGridClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGrid = e.control;
	changePage(btnGrid);
}


/*
 * "Practice" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPracticeClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPractice = e.control;
	changePage(btnPractice);
}


/*
 * 임베디드 앱에서 load 이벤트 발생 시 호출.
 * 임베디드 앱이 준비되고 그려진 후에 디스패치 되는 이벤트.
 */
function onEmbLoad(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.EmbeddedApp
	 */
	var emb = e.control;
	//임베디드 앱이 로드될 때 로드된 화면의 app에서 callAppTest라는 함수를 찾아 호출
	//즉, 자식의 함수를 호출
	var embAppIns = emb.getEmbeddedAppInstance();
	if(embAppIns.hasAppMethod("callAppTest")){
		embAppIns.callAppMethod("callAppTest");
	}
}

/**
 * 자식 쪽에서 호출 가능한 함수
 * Pracitce.clx 에서 Button을 누를 때 사용될 메소드
 */
/*자식 쪽에서 호출 가능한 함수*/
exports.callAppTest = function(){
	alert("parents'_callAppMethod");
}