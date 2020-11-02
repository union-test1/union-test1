/**
 * @param {cpr.data.DataCollection}
 *            ds
 */
function refresh(ds) {
	var rowIdx, eachData, eachOutput;
	var table = app.lookup("table");

	table.removeAllChildren(true);

	for (rowIdx = 0; rowIdx < ds.getRowCount(); rowIdx++) {
		eachData = ds.getRow(rowIdx).getRowData();
		eachOutput = new cpr.controls.Output();
		table.addChild(eachOutput, {
			left: (eachData.weekday / 7 * 100) + "%",
			top: (eachData.start * 10) + "%",
			width: (100 / 7) + "%",
			height: (eachData.end - eachData.start) * 10 + "%"
		});
		eachOutput.style.css({
			"background-color": eachData.color,
			'text-align': "center",
			"border-radius": "5px",
			"box-shadow": "0px 2px 5px gray"
		});
		eachOutput.value = eachData.text;
	}
}

function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	if (e.property == "dataSet") {
		/** @type cpr.data.DataCollection */
		var newDataSet = e.newValue;
		if (newDataSet) {
			refresh(newDataSet);
		}
	} else {
		app.getContainer().redraw();
	}
}

function onBodyInit( /* cpr.events.CEvent */ e) {
	var ds1 = app.lookup("ds1");
	refresh(ds1);
}