cpr.events.EventBus.INSTANCE.addFilter("init", function(e) {
	if (e.control instanceof cpr.core.AppInstance) {
		/** @type cpr.core.AppInstance */
		var theApp = e.control;
		theApp.getContainer().getAllRecusiveChildren(false).filter(function( /* cpr.controls.UIControl */ each) {
			return each instanceof cpr.controls.Grid;
		}).filter(function( /* cpr.controls.Grid */ each) {
			return each.userAttr("autoHighlight") == "true";
		}).forEach(function( /* cpr.controls.Grid */ each) {
			each.style.row.bind("background-color").toExpression('autoHighlight == "true" ? "red" : "auto"');
		});
	}
});

/**
 * 주어진 엘리먼트의 크기가 확정된 후, 주어진 작업을 실행합니다.
 * CSS등이 덜 로드되었을 때, 돔에 접근하는 것을 막기 위한 유틸리티 입니다.
 * 
 * @param {HTMLElement} element 크기가 확정되기를 기다리는 HTMLElement
 * @param {Function} task 실행할 작업.
 */
globals.whenStyleComputed = function(element, task) {
	function run() {
		if (window.getComputedStyle(element).width != "auto") {
			task()
		} else {
			setTimeout(run);
		}
	}

	run();
};