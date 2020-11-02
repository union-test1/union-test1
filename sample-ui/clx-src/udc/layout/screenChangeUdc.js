/************************************************
 * screenChangeUdc.js
 * Created at 2018. 8. 13. 오후 4:02:15.
 *
 * @author leeds
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};



/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	var rdb = app.lookup("rdb1");
	var cmb = app.lookup("cmb1");
	
	if(e.screen.name == "default"){
		cmb.visible = false;
		rdb.visible = true;
	}else{
		cmb.visible = true;
		rdb.visible = false;
	}
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	var rdb = app.lookup("rdb1");
	var cmb = app.lookup("cmb1");
	
	var ds = e.newValue;
	if(e.property == "dataSet"){
		rdb.setItemSet(ds, {
			label : "label",
			value : "value"
		});
		
		cmb.setItemSet(ds, {
			label : "label",
			value : "value"
		});
		
	}
}
