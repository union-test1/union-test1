/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	switch (e.property) {
		case "dataSet":
			{
				/** @type cpr.data.DataSet */
				var ds = e.newValue;
				app.lookup("cmb1").setItemSet(ds, {
					label: "label",
					value: "value"
				});

				app.lookup("rdb1").setItemSet(ds, {
					label: "label",
					value: "value"
				});
				break;
			}
	}
}

/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange( /* cpr.events.CScreenChangeEvent */ e) {
	var isBigScreen = e.screen.name == "default";
	app.lookup("rdb1").visible = isBigScreen;
	app.lookup("cmb1").visible = !isBigScreen;
}