var leftTick = 10;

function onButtonCick( /* cpr.events.CMouseEvent */ e) {
	if (leftTick <= 0) {
		return;
	}

	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var progress = app.lookup("progress");
	progress.value = String(--leftTick);

	if (leftTick == 0) {
		var bombEvent = new cpr.events.CUIEvent("bomb");
		if(app.dispatchEvent(bombEvent)){
			var explosion = new cpr.controls.Output();
			explosion.style.setClasses("explosion");
			
			app.getRootAppInstance().floatControl(explosion);
			
			setTimeout(function(){
				explosion.dispose();
			}, 1000);
		}
	}
}

/**
 * Resets the state of the progress bar.
 */
exports.reset = function() {
	leftTick = 10;
	var progress = app.lookup("progress");
	progress.value = String(leftTick);
};

function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	app.getContainer().redraw();
}