var lastKnownPosition = null;

/** @type HTMLCanvasElement */
var canvas;

/** @type CanvasRenderingContext2D */
var gc;

function updateLastKnownPosition( /* Event */ e) {
	lastKnownPosition = {
		x: e.offsetX,
		y: e.offsetY
	};
}

function onMouseDown(e) {
	updateLastKnownPosition(e);
}

function onMouseMove(e) {
	if (!lastKnownPosition) {
		return;
	}
	gc.beginPath();
	gc.moveTo(lastKnownPosition.x, lastKnownPosition.y);
	gc.lineTo(e.offsetX, e.offsetY);
	gc.lineCap = "round";
	gc.lineWidth = app.getAppProperty("strokeWidth");
	gc.stroke();

	updateLastKnownPosition(e);
}

function onMouseUp(e) {
	if (!lastKnownPosition) {
		return;
	}
	var gc = canvas.getContext("2d")
	gc.moveTo(lastKnownPosition.offsetX, lastKnownPosition.offsetY);
	gc.lineTo(e.offsetX, e.offsetY);
	gc.lineWidth = app.getAppProperty("strokeWidth");
	gc.lineCap = "round";
	gc.stroke();
	lastKnownPosition = null;
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onUIControlShellInit( /* cpr.events.CUIEvent */ e) {
	if (canvas) {
		canvas.removeEventListener("mousedown", onMouseDown);
		canvas.removeEventListener("mousemove", onMouseMove);
		canvas.removeEventListener("mouseup", onMouseUp);
		canvas = null;
		gc = null;
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;

	whenStyleComputed(e.content, function() {
		var computedStyle = getComputedStyle(e.content);
		var width = parseInt(computedStyle.width);
		var height = parseInt(computedStyle.height);

		canvas = document.createElement("canvas");
		canvas.style.position = "absolute";
		canvas.style.left = "0px";
		canvas.style.top = "0px";
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		canvas.width = width;
		canvas.height = height;
		e.content.appendChild(canvas);

		canvas.addEventListener("mousedown", onMouseDown);
		canvas.addEventListener("mousemove", onMouseMove);
		canvas.addEventListener("mouseup", onMouseUp);

		gc = canvas.getContext("2d");
	});
}

exports.getData = function() {
	if (canvas) {
		return canvas.toDataURL();
	} else {
		return null;
	}
};

exports.clear = function() {
	if (!canvas) {
		return;
	}

	gc.clearRect(0, 0, canvas.width, canvas.height);
};