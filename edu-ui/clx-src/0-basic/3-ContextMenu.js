/************************************************
 * ContextMenu.js
 * Created at 2018. 10. 8. 오전 10:25:57.
 *
 * @author ryu
 ************************************************/



/*
 * 그리드에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onGrd1Contextmenu(e){
	var grd1 = e.control;
	
	// 다음 기본 동작을 방지합니다.
	e.preventDefault();

	// 앱이 실제 그려진 사이즈를 반환합니다. 화면에 그려지지 않은 상태인 경우는 모든 값이 0인 객체가 반환됩니다.
	var appRect = app.getActualRect();

	// 메뉴 컨트롤 동적 생성
	var menu = new cpr.controls.Menu("ctxmenu");
	
	menu.addItem(new cpr.controls.MenuItem("추가", "value1", "root"));
	menu.addItem(new cpr.controls.MenuItem("수정", "value2", "root"));
	menu.addItem(new cpr.controls.MenuItem("삭제", "value3", "root"));
	
	// blur이벤트 핸들러 입니다.
	menu.addEventListener("blur", function() {
		// 컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();
	});

	menu.addEventListener("selection-change", function(/* cpr.events.CSelectionEvent */e) {
		// 컨트롤에 포함되어 있는 객체들을 제거합니다.
		menu.dispose();
		
		// 새롭게 선택된 아이템
		var newSelect = e.newSelection[0];
		var grd = app.lookup("grd1");
		var grdSelectionRow = grd.getSelectedRowIndices()[0];
		
		// "추가" 아이템 선택 시
		if (newSelect.label == "추가") {
			// 그리드에 신규 Row를 추가합니다.
			grd.insertRow(grdSelectionRow, true);
		}
		// "수정" 아이템 선택 시
		else if (newSelect.label == "수정") {
			// 전달된 행을 편집모드로 전환합니다.
			grd.setEditRowIndex(grdSelectionRow, true);
		}
		// "삭제" 아이템 선택 시
		else if (newSelect.label == "삭제") {
			// 그리드의 선택된 Row를 삭제합니다.
			grd.deleteRow(grdSelectionRow);
		}
	});

	menu.style.css({
		position : "absolute",
		top : "" + (e.clientY - appRect.top) + "px",
		left : "" + (e.clientX - appRect.left) + "px",
		width : "150px"
	});
	// 앱 내부 특정 위치에 컨트롤을 위치시킵니다.
	app.floatControl(menu);
	
	// gridctxmenu에 포커스 설정합니다
	menu.focus();
}
