function getProgressColor(/* Number */progress, /* Number */brightness) {
	progress = Math.min(Math.max(progress, 0), 100);
	return 'hsl(' + (232 - progress * 232).toFixed(0) + ", 100%, " + brightness + "%)";
}

/*
 * Body에서 init 이벤트 발생 시 호출. 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */e) {
	// 함수를 등록합니다.
	cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getProgressColor", getProgressColor);
	
	var progress = app.lookup("progress");
	progress.style.css({
		"background-repeat" : "no-repeat"
	});
	
	// 함수를 등록합니다.
	cpr.expression.ExpressionEngine.INSTANCE.registerFunction("getProgressColor", getProgressColor);
	
	progress.style.bind("background-image")
		.toExpression('"linear-gradient(" + getProgressColor(progressRate, 50) + ", " + getProgressColor(progressRate, 30) + ")"');

}
