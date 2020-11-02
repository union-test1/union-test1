var itemCount = 0;
var cardWidth = 120;
var cardHeight = 160;
/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	var layout = new cpr.controls.layouts.FormLayout();
	layout.setRows(["25px"]);
	layout.setColumns(["1fr", cardWidth + "px", cardWidth + "px", cardWidth + "px", cardWidth + "px", "1fr"]);

	var pane = app.lookup("contentPane");
	pane.setLayout(layout);

	var header = app.lookup("header");
	pane.updateConstraint(header, {
		colIndex: 0,
		rowIndex: 0,
		colSpan: 6
	});

	app.getContainer().updateConstraint(pane, {
		"position": "fixed"
	});

	var top = app.lookup("top");
	app.getContainer().updateConstraint(top, {
		position: "fixed"
	});

	var left = app.lookup("left");
	app.getContainer().updateConstraint(left, {
		position: "fixed"
	});
}

/*
 * "콘텐트 추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	itemCount++;

	var newBtn = new udc.PersonCard();
	newBtn.title = "사람" + itemCount;

	var rowIdx = Math.floor((itemCount - 1) / 4) + 1;
	var colIdx = (itemCount - 1) % 4;

	var rowCount = Math.floor(itemCount / 4) + 1;
	if (itemCount % 4 !== 0) {
		rowCount++;
	}

	var pane = app.lookup("contentPane");

	/** @type cpr.controls.layouts.FormLayout */
	var layout = pane.getLayout();
	var rows = [];
	for (var idx = 0; idx < rowCount; idx++) {
		if (idx === 0) {
			rows.push("25px");
		} else {
			rows.push(cardHeight + "px");
		}
	}
	layout.setRows(rows);

	app.lookup("contentPane").addChild(newBtn, {
		colIndex: colIdx + 1,
		rowIndex: rowIdx
	});

}