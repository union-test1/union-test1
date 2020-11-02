// Importing the color module
var colors = cpr.core.Module.require("4-Modules/Colors");

function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	app.lookup("lbx1").style.css({
		"background-color": colors.randomColor()
	})
}

function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	app.lookup("grd1").style.css("background-color", globalRandomColor());
}