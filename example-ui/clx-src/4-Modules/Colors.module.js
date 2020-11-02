function randomColor() {
	var r = Math.floor(Math.random() * 255) * 256 * 256;
	var g = Math.floor(Math.random() * 255) * 256;
	var b = Math.floor(Math.random() * 255);

	var result = (r + g + b).toString(16);
	if (result.length == 5) {
		result = "0" + result;
	}
	return "#" + result;
}

/**
 * Generates random HTML color code.
 * 
 * @returns {String}
 */
exports.randomColor = function() {
	return randomColor();
};

/**
 * Generates random HTML color code.
 * 
 * @returns {String}
 */
globals.globalRandomColor = function() {
	return randomColor();
};