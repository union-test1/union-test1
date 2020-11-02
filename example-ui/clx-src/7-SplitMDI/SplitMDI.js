/** @type cpr.controls.MDIFolder */
var rightMDI = null;

/**
 * 왼쪽 MDI의 선택된 아이템을 우측 MDI로 보냅니다.
 */
function moveToRight() {
	var leftMDI = app.lookup("leftMDI");

	if (leftMDI.getSelectedTabItem()) {
		var rightMDI = ensureRightMDI();
		moveItem(leftMDI, rightMDI, leftMDI.getSelectedTabItem());
	}
}

/**
 * 우측 MDI의 선택된 아이템을 좌측 MDI로 보냅니다.
 */
function moveToLeft() {
	if(!rightMDI){
		return;
	}
	
	var leftMDI = app.lookup("leftMDI");

	if (rightMDI.getSelectedTabItem()) {
		moveItem(rightMDI, leftMDI, rightMDI.getSelectedTabItem());
	}
}

/**
 * 왼쪽 또는 오른쪽 MDI가 비어있는 경우, 모든 아이템을 왼쪽으로 옮기고 우측 MDI를 제거합니다.
 */
function collapseIfNeeded() {
	// 우측 MDI가 만들어진 적이 없음.
	if (!rightMDI) {
		return;
	}
	
	var leftMDI = app.lookup("leftMDI");
	// 양쪽 모두 아이템이 존재한다면, 컬렙스 하지 않음.
	if (rightMDI.getTabItems().length > 0 && leftMDI.getTabItems().length > 0) {
		return;
	}

	// 우측의 모든 아이템을 좌측으로 옮김.
	rightMDI.getTabItems().forEach(function( /* cpr.controls.TabItem */ each) {
		rightMDI.removeTabItem(each);
		leftMDI.addTabItem(each);
	});

	// 폼 레이아웃에서 우측 컬럼을 제거.
	var grp = app.lookup("mdiGroup");

	/** @type cpr.controls.layouts.FormLayout */
	var layout = grp.getLayout();
	layout.setColumns(["1fr"]);
	
	// 버튼 그룹의 콜스팬을 2 -> 1로 변경.
	var buttonGroup = app.lookup("buttonGroup");
	grp.updateConstraint(buttonGroup, {
		colSpan: 1
	});
	
	// 우측 MDI 제거.
	grp.removeChild(rightMDI, true);
	rightMDI = null;
	
	updateButtonEnabilities();
}

/**
 * 우측 MDI폴더를 얻습니다. 이미 존재하는 경우, 존재하는 MDI폴더가 리턴되고,
 * 존재하지 않는 경우, 새로 만든 뒤에 리턴합니다.
 * @return {cpr.controls.MDIFolder}
 */
function ensureRightMDI() {
	if (rightMDI == null) {
		var grp = app.lookup("mdiGroup");

		// 동적으로 폼 레이아웃 컬럼 추가.
		/** @type cpr.controls.layouts.FormLayout */
		var layout = grp.getLayout();
		layout.setColumns(["1fr", "1fr"]);

		// 버튼 그룹의 콜스팬 변경.
		var buttonGroup = app.lookup("buttonGroup");
		grp.updateConstraint(buttonGroup, {
			colSpan: 2
		});

		// 우측에 MDI 폴더 추가.
		rightMDI = new cpr.controls.MDIFolder("rightMDI");
		rightMDI.addEventListener("selection-change", function(e){
			updateButtonEnabilities();
		});
		grp.addChild(rightMDI, {
			rowIndex: 1,
			colIndex: 1
		});
	}
	return rightMDI;
}

/**
 * 특정 탭 아이템을 다른 탭폴더로 이동합니다.
 * 
 * @param {cpr.controls.MDIFolder} folderFrom 
 * 		이동할 탭 아이템을 소유한 탭 폴더.
 * 
 * @param {cpr.controls.MDIFolder} folderTo 
 * 		아이템을 보낼 탭 폴더.
 * 
 * @param {cpr.controls.TabItem} itemToMove 
 * 		보낼 아이템.
 */
function moveItem(folderFrom, folderTo, itemToMove) {
	if (!itemToMove) {
		return;
	}
	var selectedIndex = folderFrom.getTabItems().indexOf(itemToMove);
	folderFrom.removeTabItem(itemToMove);

	var newIndex = Math.min(folderFrom.getTabItems().length - 1, selectedIndex);
	if (newIndex >= 0) {
		folderFrom.setSelectedTabItem(folderFrom.getTabItems()[newIndex]);
	}

	folderTo.addTabItem(itemToMove);
	
	collapseIfNeeded();
	
	updateButtonEnabilities();
	
	app.getContainer().redraw();
}

/**
 * 좌우측으로 보내기 버튼의 가용성을 업데이트합니다.
 */
function updateButtonEnabilities(){
	app.lookup("toRightBtn").enabled = app.lookup("leftMDI").getSelectedTabItem() != null;

	if(!rightMDI){
		app.lookup("toLeftBtn").enabled = false;
	}else{
		app.lookup("toLeftBtn").enabled = rightMDI.getSelectedTabItem() != null;
	}
}