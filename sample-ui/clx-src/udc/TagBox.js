/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad( /* cpr.events.CUIEvent */ e) {
	/**
	 * @type HTMLElement
	 */
	var divEle = e.content;
	var htmlText = app.getAppProperty("innerHTML");
	/**
	 * @type cpr.data.DataMap
	 */
	var datamap = app.getAppProperty("datamap");
	var regex;
	htmlText = htmlText.replace(/\{\$value\}/gi, app.getAppProperty("value"));
	var i;
	if (datamap != null) {
		var names = datamap.getColumnNames();
		for (i = 0; i < names.length; i++) {
			var name = names[i];
			regex = new RegExp("{dm:" + name + "}", "gi")
			htmlText = htmlText.replace(regex, datamap.getValue(name));

		}
	}

	/**
	 * @type cpr.data.DataSet
	 */
	var dataset = app.getAppProperty("dataset");

	if (dataset != null) {
		var si = htmlText.indexOf("{$ds-start}");
		var se = htmlText.indexOf("{$ds-end}");
		if (si > -1 && se > -1) {
			var startText = htmlText.substring(0, si);
			var copyText = htmlText.substring(si, se).replace(/\{\$ds\-start\}/gi,"");
			var endText = htmlText.substring(se, htmlText.length).replace(/\{\$ds\-end\}/gi,"");

			var temp = "";
			var count = dataset.getRowCount();
			var headers = dataset.getHeaders(cpr.data.header.HeaderType.ALL);
			var datasetText = "";
			for (i = 0; i < count; i++) {
				var row = dataset.getRow(i);
				temp = copyText;
				for (var l = 0; l<headers.length; l++) {
					var headerName = headers[l].getName();
					var rowValue = row.getValue(headerName);
					regex = new RegExp("{ds:" + headerName + "}", "gi");
					temp = temp.replace(regex, rowValue);
				}
				datasetText += temp;
			}
			htmlText = startText + datasetText + endText;
		}
	}
	if (htmlText) {
		divEle.innerHTML = htmlText;
	}
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	app.lookup("shell").redraw();
}