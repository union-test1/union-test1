function startFetch(/* cpr.events.CMouseEvent */e) {
	/** @type cpr.controls.Button */
	var btn = e.targetControl;
	
	app.lookup("header").enabled = false;
	
	(function(){
		var prg = app.lookup("prg");
		prg.visible = true;
		prg.value = 0;
		var smsId = btn.userAttr("submission");
		var noti = app.lookup("noti");
		noti.info("Start fetching :" + smsId);
		
		var sms = app.lookup(smsId);
		var start = new Date();
		 
		sms.addEventListenerOnce("submit-done", function(){
			var noti = app.lookup("noti");
			var elapse = (new Date()) - start;
			noti.info("Fetching " + smsId + " is Done: " + elapse.toLocaleString() + "ms elapsed.");
		});
		sms.send();		  
	})();
}

function reset(/* cpr.events.CMouseEvent */e) {
	app.lookup("ds").clear();

	app.lookup("grd1").redraw();
	updateTotalCount();
}

function updateTotalCount() {
	var ds = app.lookup("ds");
	app.lookup("totalLabel").value = ds.getRowCount().toLocaleString() + " rows";
}

function onSms1SubmitProgress(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	updateTotalCount();
	var pg = app.lookup("prg");
	
	var total = e.nativeEvent.total;
	var loaded = e.nativeEvent.loaded;
	pg.max = total;
	pg.value = String(loaded);
	
	app.lookup("grd1").redraw();
}

function onSms1SubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms1 = e.control;
	updateTotalCount();
	app.lookup("grd1").redraw();
	app.lookup("prg").visible = false;
	app.lookup("header").enabled = true;
}
