
// scheduler의 이벤트 핸들러
var onEventAddedHandler = null;

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onUIControlShellInit(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	
	var divObj = e.content;
	if(divObj) {
		divObj.innerHTML = "";
	}
	
	if(onEventAddedHandler) {
		scheduler.detachEvent(onEventAddedHandler);
		onEventAddedHandler = null;
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	var divObj = e.content;
	
	var shape = "<div id=\"scheduler_here\" class=\"dhx_cal_container\" style=\"width:100%; height:100%;\">"
		+ "<div class=\"dhx_cal_navline\">"
		+ "<div class=\"dhx_cal_prev_button\">&nbsp;</div>"
		+ "<div class=\"dhx_cal_next_button\">&nbsp;</div>"
		+ "<div class=\"dhx_cal_today_button\"></div>"
		+ "<div class=\"dhx_cal_date\"></div>"
		+ "<div class=\"dhx_cal_tab\" name=\"day_tab\" style=\"right:204px;\"></div>"
		+ "<div class=\"dhx_cal_tab\" name=\"week_tab\" style=\"right:140px;\"></div>"
		+ "<div class=\"dhx_cal_tab\" name=\"month_tab\" style=\"right:76px;\"></div>"
		+ "</div><div class=\"dhx_cal_header\"></div><div class=\"dhx_cal_data\"></div></div>";
	
	divObj.innerHTML = shape;
	
	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	scheduler.init('scheduler_here', new Date(2018,0,1), "week");
	
//	console.log("attachEvent");
	onEventAddedHandler = scheduler.attachEvent("onEventAdded", onEventAdded);
}

function onEventAdded(id, ev) {
	console.log(ev);
	
	return true;
}

/*
 * "Load" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var ds = app.lookup("ds_schedule");
	var rowCnt = ds.getRowCount();
	
	var events = [];
	for(var i = 0; i < rowCnt; i++) {
		events[events.length] = {
				id : ds.getValue(i, "id"),
				start_date : ds.getValue(i, "start"),
				end_date : ds.getValue(i, "end"),
				text : ds.getValue(i, "text")
		};
	}
	scheduler.parse(events, "json");
}



