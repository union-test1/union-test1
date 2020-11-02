var _popupMenu = null; //네비게이션바의 팝업 메뉴
var _popupTree = null; //버튼의 팝업 트리
var _treeNodes = []; //데이터셋을 트리구조로 변경한 데이터
//아이템의 속성 이름
var TREEITEM = {
	LABEL: "label",
	VALUE: "value",
	PARENT: "parentValue"
}

//TODO: items 데이터셋의 컬럼명을 동일하게 설정해 주세요.
var DATASET_BIND_COLUMN = {
	LABEL: "label",
	VALUE: "value",
	PARENT: "parentValue"
};

/**
 * 데이터 삭제
 */
function dispose() {
	disposeControl();
	_treeNodes = [];
}

/**
 * 팝업 컨트롤 리셋
 */
function disposeControl() {
	if (_popupMenu) {
		_popupMenu.dispose();
		_popupMenu = null;
	}
	if (_popupTree) {
		_popupTree.dispose();
		_popupTree = null;
	}
	var naviCtrl = app.lookup("navi");
	if(naviCtrl) {
		naviCtrl.value = "";
	}
}

/**
 * 팝업이 열려있는지 여부
 */
function isOpen() {
	if (_popupMenu || _popupTree) {
		return true;
	}
	return false;
}

/**
 * 팝업에 사용되는 트리 컨트롤 생성
 */
function createPopupTree() {
	var tree = new cpr.controls.Tree("tree");
	_popupTree = tree;
	tree.indent = 10;

	//포커스가 없어졌을때 사라지도록 함.
	tree.addEventListener("blur", function(event) {
		disposeControl();
	});
	//선택했을때 사라지도록 함
	tree.addEventListener("selection-change", function(event) {
		selectionEvent(event.newSelection[0]);
		disposeControl();
	});

	tree.setItemSet(app.lookup("items"), {
		label: "label",
		value: "value",
		icon: "",
		parentValue: "parentValue"
	});

	return tree;
}

/**
 * 팝업에 사용되는 메뉴 컨트롤 생성
 * @param selectedNode
 * @param calbackDispose
 */
function createPopupMenu(selectedNode, calbackDispose) {
	var menu = new cpr.controls.Menu("menu");
	_popupMenu = menu;

	menu.addEventListener("blur", function(event) {
		disposeControl();
		calbackDispose();
	});
	menu.addEventListener("selection-change", function(event) {
		selectionEvent(event.newSelection[0]);
		disposeControl();
		calbackDispose();
	});
	var children = selectedNode.children;
	setMenuItems(menu, children);
	return menu;
}

/**
 * 메뉴 컨트롤의 아이템 세팅
 * @param menu
 * @param nodes
 */
function setMenuItems(menu, nodes) {
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var item = node.owner;
		menu.addItem(new cpr.controls.MenuItem(item.label, item.value, item.parentValue));
		if (node.children != null) {
			setMenuItems(menu, node.children);
		}
	}
}

/**
 * 팝업이 나타날 위치 계산
 * @param element
 */
function getCoords(element) {
	var box = element.getBoundingClientRect();

	var body = document.body;
	var docEl = document.documentElement;

	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	var clientTop = docEl.clientTop || body.clientTop || 0;
	var clientLeft = docEl.clientLeft || body.clientLeft || 0;

	var top = box.top + scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return {
		top: Math.round(top),
		left: Math.round(left)
	};
}

/**
 * 엘리먼트 찾기 
 * @param selector
 * @param root
 * @param element
 */
function closetElement(selector, root, element) {
	var matchesSelector = _getMatchesSelector(element);

	if (matchesSelector) {
		for (element; element != null; element = element.parentElement) {

			if (matchesSelector.call(element, selector)) {

				return element;
			}

			if (root != null && element === root) {
				return null;
			}
		}
	}
	return null;
}

/**
 * 엘리먼트의 matchesSelector 가져오기
 * @param element
 */
function _getMatchesSelector(element) {
	var matchesSelector = element.matches // standard
		||
		element.msMatchesSelector // IE 9 or higher
		||
		element.webkitMatchesSelector // Chrome 34 or higher , Opera 15.0 or higher
		||
		element["mozMatchesSelector"] // Firefox 3.6 or higher
		||
		element["oMatchesSelector"]; // Opera 11.5 or higher

	return matchesSelector;
}

/**
 * 리사이즈 이벤트 발생시 표시되고 있는 팝업 닫기
 */
function resizeEvent() {
	disposeControl();
}

/**
 * 샘플 데이터 생성하는 메소드.
 * 삭제해도 됩니다.
 * @param ds
 * @param count
 */
function createNaviItems( /*cpr.data.DataSet*/ ds, count) {
	var row = {};
	for (var i = 0; i < count[0]; i++) {
		var val = "0" + i;
		row = {};
		row[DATASET_BIND_COLUMN.LABEL] = getName();
		row[DATASET_BIND_COLUMN.VALUE] = val;
		row[DATASET_BIND_COLUMN.PARENT] = "";
		ds.insertRowData(ds.getRowCount(), false, row);
		for (var j = 0; j < count[1]; j++) {
			var pval = val + "0" + j;
			row = {};
			row[DATASET_BIND_COLUMN.LABEL] = getName();
			row[DATASET_BIND_COLUMN.VALUE] = pval;
			row[DATASET_BIND_COLUMN.PARENT] = val;
			ds.insertRowData(ds.getRowCount(), false, row);
			//			navi.addItem(new cpr.controls.MenuItem(getName(), pval, val));
			for (var l = 0; l < count[2]; l++) {
				var ppval = pval + "0" + l;
				row = {};
				row[DATASET_BIND_COLUMN.LABEL] = getName();
				row[DATASET_BIND_COLUMN.VALUE] = ppval;
				row[DATASET_BIND_COLUMN.PARENT] = pval;
				ds.insertRowData(ds.getRowCount(), false, row);
				//				navi.addItem(new cpr.controls.MenuItem(getName(), ppval, pval));
				for (var g = 0; g < count[3]; g++) {
					var pppval = ppval + "0" + g;
					row = {};
					row[DATASET_BIND_COLUMN.LABEL] = getName();
					row[DATASET_BIND_COLUMN.VALUE] = pppval;
					row[DATASET_BIND_COLUMN.PARENT] = ppval;
					ds.insertRowData(ds.getRowCount(), false, row);
					//					navi.addItem(new cpr.controls.MenuItem(getName(), pppval, ppval));
				}
			}
		}
	}
}

/**
 * 샘플 데이터 생성하는 메소드.
 * 삭제해도 됩니다.
 */
function getName() {
	var chars = ["가", "문", "헤", "호", "박", "제", "채", "이"];
	var result = "";
	for (var i = 0; i < 3; i++) {
		var pos = Math.floor(Math.random() * chars.length);
		result += chars[pos];
	}
	return result;
}

/**
 * 데이터셋의 데이터를 트리구조로 생성
 * @param object
 */
function createTreeNodes(object) {
	var ds = app.lookup("items");
	var rowCount = ds.getRowCount();
	var headers = ds.getHeaders();

	//데이터셋 컬럼 이름에 대한 아이템 속성명 설정
	var names = {};
	names[DATASET_BIND_COLUMN.VALUE] = "value";
	names[DATASET_BIND_COLUMN.LABEL] = "label";
	names[DATASET_BIND_COLUMN.PARENT] = "parentValue";

	var result;
	if (!object) {
		result = {};

		for (var i = 0; i < rowCount; i++) {
			var row = ds.getRow(i);
			var item = {};
			headers.forEach(function( /* cpr.data.header.Header */ each) {
				item[names[each.getName()]] = row.getValue(each.getName());
			});
			result[item.value] = {
				parent: null,
				owner: item,
				children: null
			};
		}
		return createTreeNodes(result);
	}
	result = [];
	for (var each in object) {
		var parentValue = object[each].owner.parentValue;

		if (object[parentValue] && parentValue != object[each].owner.value) {
			if (object[parentValue]["children"] == null) {
				object[parentValue]["children"] = [];
			}
			object[each].parent = object[parentValue];
			object[parentValue]["children"].push(object[each]);
		} else {
			result.push(object[each]);
		}
	}
	object = null;
	return result;

}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	//샘플 데이터 생성
	var ds = app.lookup("items");
	createNaviItems(ds, [5, 20, 5]);

	//데이터셋에서 트리 노드 생성
	_treeNodes = createTreeNodes();
	var navi = app.lookup("navi");
	for (var i = 0; i < _treeNodes.length; i++) {
		var node = _treeNodes[i];
		var item = node.owner;
		navi.addItem(new cpr.controls.MenuItem(item.label, item.value, item.parentValue));

	}
	//TODO: 서브미션으로 데이터를 가져오는 경우 notificationCenter을 제외한 코드를 제거(위의 코드 모두 제거)
//	app.lookup("sms1").send();

	//리사이즈에 대한 이벤트 한번만 설정
	cpr.core.NotificationCenter.INSTANCE.subscribe("resize", this, resizeEvent);

}

/*
 * 네비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNaviItemClick( /* cpr.events.CItemEvent */ e) {
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var navi = e.control;
	
	var clickedItem = e.item;
	var selectedNode = null;

	for (var i = 0; i < _treeNodes.length; i++) {
		var node = _treeNodes[i];
		if (node.owner.value == clickedItem.value) {
			selectedNode = node;
			break;
		}
	}
	var hasChild = selectedNode && selectedNode.children != null;
	if (hasChild) {
		if (isOpen()) {
			disposeControl();
		}

		var menu = createPopupMenu(selectedNode, function() {
			navi.value = ""
		});

		var appRect = app.getActualRect();
		var element = closetElement("[role=menuitem]", e.nativeEvent.currentTarget, e.nativeEvent.target)
		var coords = getCoords(element);

		menu.style.css({
			width: "150px",
			position: "absolute",
			top: "" + (appRect.top + appRect.height) + "px",
			left: "" + coords.left + "px",
		});

		app.getRootAppInstance().floatControl(menu);
		menu.focus();
	}

}

/*
 * "Menu" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	var tree = createPopupTree();
	var actualRect = app.getActualRect();
	tree.style.css({
		position: "absolute",
		height: "300px",
		width: actualRect.width,
		top: actualRect.top + actualRect.height + "px",
		left: actualRect.left + "px"
	});

	app.getRootAppInstance().floatControl(tree);
	tree.focus();
}

function selectionEvent(item) {
	var event = new cpr.events.CUIEvent("selection-change", {
		content: {
			item: item
		}
	});
	app.dispatchEvent(event);
}


/////////////////////// 컨트롤 이벤트 ////////////////
/*
 * Body에서 dispose 이벤트 발생 시 호출.
 * 컨트롤이 dispose될 때 호출되는 이벤트.
 */
function onBodyDispose( /* cpr.events.CEvent */ e) {
	dispose();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){

	//데이터셋에서 트리 노드 생성
	_treeNodes = createTreeNodes();
	var navi = app.lookup("navi");
	for (var i = 0; i < _treeNodes.length; i++) {
		var node = _treeNodes[i];
		var item = node.owner;
		navi.addItem(new cpr.controls.MenuItem(item.label, item.value, item.parentValue));
	}
	
}
