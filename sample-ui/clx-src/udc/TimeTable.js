
/**
 * @param {cpr.data.DataCollection} ds
 */
function refresh(ds){
	var rowIdx, eachData, eachOutput;
	var table = app.lookup("table");
	
	table.removeAllChildren(true);
	
	for (rowIdx = 0; rowIdx < ds.getRowCount(); rowIdx++) {
		eachData = ds.getRow(rowIdx).getRowData();
		eachOutput = new cpr.controls.Output();
		table.addChild(eachOutput, {
			left: (eachData.weekday / 7 * 100) + "%",
			top : (eachData.start * 10) + "%",
			width: (100 / 7) + "%",
			height: (eachData.end - eachData.start) * 10 + "%"
		});
		eachOutput.style.css({
			"background-color": eachData.color,
			'text-align' : "center",
			"border-radius" : "5px",
			"box-shadow": "0px 2px 5px gray"
		});
		eachOutput.value = eachData.text;
	}
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if(e.property == "dataSet"){
		/** @type cpr.data.DataCollection */
		var newDataSet = e.newValue;
		if(newDataSet){
			refresh(newDataSet);
		}
	}
}

